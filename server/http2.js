const { createSecureServer } = require("http2");
const { readFileSync } = require("fs");
const utils = require("./utils");
const http2 = require("http2");
const { HTTP2_HEADER_PATH } = http2.constants;
const path = require('path');
const fastcsv = require("fast-csv");
const fs = require("fs");

var uid = null;
var jsonData = [];

const options = {
  key: readFileSync("./localhost-key.pem"),
  cert: readFileSync("./localhost.pem")
};

const getFilesizeInBytes = (filename) => {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}


const server = createSecureServer(options).listen(3000);

const pushAsset = (stream, file) => {
  const filePath = path.join(__dirname, file.filePath);
  stream.pushStream({ [HTTP2_HEADER_PATH]: file.path }, (err, pushStream) => {
    console.log(">> Pushing:", file.path);
    pushStream.respondWithFile(filePath, file.headers);
  });
}

// const push = (stream, file) => {
//   const filePath = path.join('/', file.filePath);

//   stream.pushStream({ [HTTP2_HEADER_PATH]: file.path }, (err, pushStream) => {
//       console.log(">> Pushing:", file.path, filePath);
//       // pushStream.on('error', function(err){
//       //   // catch error from pushStream here
//       //   stream.respond({ ':status': 200 });
//       //   stream.end('some data');
//       // })
//       pushStream.respondWithFile(filePath, file.headers, {
//           // onError: (err) => {
//           //     console.log(err);
//           //     // respondToStreamError(err, stream);
//           //     stream.respond({ ':status': 200 });
//           //     stream.end('some data');
//           // }
//       });
//   });
// }

server.on("stream", (stream, headers) => {
  const url = headers[":path"].split('?')[0];
  let url2 = "";
  if (headers[":path"].indexOf('?') >= 0)url2 = headers[":path"].split('?')[1];
  const id = headers[":path"].split('?').length > 1 && headers[":path"].split('?')[1].split('=')[1];
  if (url === "/") {
    stream.respondWithFile("../client/index.html");
  } else if (url === "/myvideo.mpd") {
    stream.respondWithFile("./files/myvideo.mpd");
  }  else if (url.indexOf('m4s') >= 0) {
    const quality = url.split('_')[1];
    console.log(url);
    const index = parseInt(url.split('_')[2].split('.')[0]);
    if(uid == null) {
      console.log(url);
      const id = url2.split('=')[1];
      console.log("uuid",id);
      uid = id;
    }
    
    var temp = {
      ID: index,
      URL: url,
      TIME: Date.now(),
      SIZE: getFilesizeInBytes(`./files${url}`)
    };
    
    jsonData.push(temp);
    console.log('stream request')
    stream.respondWithFile(`./files${url}`);
    if(index == 59) {
      var filename = fs.createWriteStream(uid+".csv");
      fastcsv
      .write(jsonData, { headers: true })
      .on("finish",function(){
        console.log("csv file downloaded");
        uid = null;
        jsonData = [];
      })
      .pipe(filename);
    }
    // console.log(index)
    // if (index < 58) {
    //   const file = {
    //     path: __dirname + `/files/segment_1080p_51.m4s`,
    //     filePath: __dirname + `/files/segment_1080p_51.m4s`,
    //     headers: {
    //         'content-type': 'media',
    //     }
    //   };
    //   push(stream, file);
    // }
  } else if (url.indexOf('mp4') >= 0) {
    console.log('stream request')
    const index = parseInt(url.split('_')[2].split('.')[0]);
    var temp = {
      ID: index,
      URL: url,
      TIME: Date.now(),
      SIZE: getFilesizeInBytes(`./files${url}`),
    };
    jsonData.push(temp);
    stream.respondWithFile(`./files${url}`);
  }  else if (url.indexOf('.js') > 0) {
    // regular expression for filename requested
    // const re = /\/(\w+)*/;
    // const filename = headers[":path"].replace(re, "$1");
    // stream.respondWithFile(`../client/${filename}`);
    stream.respondWithFile(`./dash.js`);
  }
});