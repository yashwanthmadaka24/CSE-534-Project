const http2 = require('http2');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { isNull } = require('util');

//
var uid = null
var push = false

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
    if (uid) {
      const index = parseInt(currentUrl.pathname.split('_')[2], 10);
      // console.log(`./files/segment_1080p_${index+1}.m4s?customQuery=${uid}`);
      let quality = currentUrl.pathname.split('_')[1];
      quality = parseInt(quality.substr(0, quality.length -1), 10);
      setState(null, quality);
      console.log('index', index, uid, quality);
      for (let i=1; i<kpush; i++) {
        const video = {
          path: `/segment_${quality}p_${index+i}.m4s?customQuery=${uid}`,
          filePath: `./files/segment_${quality}p_${index+ i}.m4s`,
        };
        pushAsset(res.stream, video);
      }
      
    }
    const Query = req.url;
    console.log(Query);
    const id = Query.split('?')[1].split('=')[1];
    uid = id;
    res.stream.respondWithFile(`./files/${currentUrl.pathname}`);
  }

  if (currentUrl.pathname.indexOf('mp4') >= 0) {
    // pushAsset(res.stream, cssFile);
    res.stream.respondWithFile(`./files/${currentUrl.pathname}`);
  }
}

const server = http2
  .createSecureServer(options, onRequestHandler)
  .listen(3000);