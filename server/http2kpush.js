const http2 = require('http2');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { isNull } = require('util');
const fastcsv = require("fast-csv");

const getFilesizeInBytes = (filename) => {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}
//
var uid = null
var push = false
var jsonData = [];

// required of kpush
const { HTTP2_HEADER_PATH } = http2.constants;

// certifications path
const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
};

// push helper
const pushAsset = (stream, file) => {
  const filePath = path.join(__dirname, file.filePath);
  stream.pushStream({ [HTTP2_HEADER_PATH]: file.path }, (err, pushStream) => {
    pushStream.on('error', function(err){
      // catch error from pushStream here;
      var filename = fs.createWriteStream(uid+".csv");
      fastcsv
      .write(jsonData, { headers: true })
      .on("finish",function(){
        uid =null;
        jsonData=[];
        console.log("csv file downloaded");
      })
      .pipe(filename);
    });
    pushStream.respondWithFile(filePath, file.headers);
  });
}

let state = {
  startTime: 0,
  endTime: 0,
  currentQuality: 0,
  count: 0,
}

var kpush = 1;

const setState = (start, currentQuality)  => {
  let newstate = state;
  if (start) {
    newstate.start = start;
  } else {
    if (newstate.currentQuality == currentQuality) {
      newstate.count++;
      if (newstate.count > 2) {
        newstate.count =1;
        if (currentQuality >= 300) {
          kpush = kpush < 3 ? kpush+1 : kpush;
        }
      }
    } else if (newstate.currentQuality > currentQuality) {
      newstate.count++;
    } else {
      newstate.count = 0;
      kpush = 1;
      newstate.currentQuality = currentQuality;
    }
  }
  state = newstate;
}

// Request Handler
const onRequestHandler = (req, res) => {
  const currentUrl = url.parse(req.url);
  console.log(currentUrl);
  const knownPaths = ['/'];
  console.log(">> Request:: method:", req.method, " path:", currentUrl.pathname);

  if (currentUrl.pathname === '/') {
    const cssFile = {
      path: '/style.css',
      filePath: './style.css',
      headers: {
        'content-type': 'text/css'
      }
    };
    pushAsset(res.stream, cssFile);
    res.stream.respondWithFile('../client/index.html');
  }

  if (currentUrl.pathname == "/myvideo.mpd") {
    res.stream.respondWithFile("./files/myvideo.mpd");
  }

  if (currentUrl.pathname.indexOf('m4s') >= 0) {
    const index = parseInt(currentUrl.pathname.split('_')[2], 10);
    if (uid) {
      // console.log(`./files/segment_1080p_${index+1}.m4s?customQuery=${uid}`);
      let quality = currentUrl.pathname.split('_')[1];
      quality = parseInt(quality.substr(0, quality.length -1), 10);
      setState(null, quality);
      console.log('index', index, uid, quality);
      for (let i=1; i<kpush; i++) {
        if (index + i == 59) {
          var filename = fs.createWriteStream(uid+".csv");
          fastcsv
          .write(jsonData, { headers: true })
          .on("finish",function(){
            uid =null;
            jsonData=[];
            console.log("csv file downloaded");
      })
      .pipe(filename);
        }
        const video = {
          path: `/segment_${quality}p_${index+i}.m4s?customQuery=${uid}`,
          filePath: `./files/segment_${quality}p_${index+ i}.m4s`,
        };
        pushAsset(res.stream, video);
      }      
    }
    const url2 = currentUrl.query;
    if(uid == null) {
      console.log(url);
      let id = "";
      if (url2 && url2.indexOf("=") >= 0)id = url2.split('=')[1];
      console.log("uuid",id);
      uid = id;
    }
    
    var temp = {
      ID: index,
      URL: currentUrl.pathname,
      TIME: Date.now(),
      SIZE: getFilesizeInBytes(`./files${currentUrl.pathname}`)
    };
    
    jsonData.push(temp);
    console.log('stream request')
    // stream.respondWithFile(`./files/${url}`);
    if(index >= 59) {
      var filename = fs.createWriteStream(uid+".csv");
      fastcsv
      .write(jsonData, { headers: true })
      .on("finish",function(){
        uid =null;
        jsonData=[];
        console.log("csv file downloaded");
      })
      .pipe(filename);
    }
    let Query = req.url;
    console.log(Query);
    let id = "";
    if (Query.indexOf('?') >= 0) {
      id = Query.split('?')[1].split('=')[1];
      uid = id;
    }
    
    res.stream.respondWithFile(`./files/${currentUrl.pathname}`);
  }

  if (currentUrl.pathname.indexOf('mp4') >= 0) {
    // pushAsset(res.stream, cssFile);
    res.stream.respondWithFile(`./files/${currentUrl.pathname}`);
  }

  if (currentUrl.pathname.indexOf('.js') >= 0) {
    // pushAsset(res.stream, cssFile);
    res.stream.respondWithFile(`./dash.js`);
  }

  
}

const server = http2
  .createSecureServer(options, onRequestHandler)
  .listen(3000);