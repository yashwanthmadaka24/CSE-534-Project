const { createServer } = require("https");
const { readFileSync, createReadStream } = require("fs");
const { pipeline } = require("stream");
const { url } = require("inspector");
const fastcsv = require("fast-csv");
const fs = require("fs");

var uid = null;
var jsonData = [];

const options = {
  key: readFileSync("./localhost-key.pem"),
  cert: readFileSync("./localhost.pem")
};

const errCallback = err => {
  if (err) console.log(err);
};

const getFilesizeInBytes = (filename) => {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

createServer(options, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log("REQ URL >>>>>>>>>> ", req.url);
  const url = req.url.split('?')[0];
  let url2 = "";
  if (req.url.indexOf('?') >= 0)url2 = req.url.split('?')[1];
  const id = req.url.split('?').length > 1 && req.url.split('?')[1].split('=')[1];
  console.log('id: ' + " " + id + "url: " + " " + url);
  if (url === "/") {
    console.log('html req received');
    res.setHeader('Access-Control-Allow-Origin', '*')
    pipeline(createReadStream(`../client/index.html`), res, errCallback);
  } else if (url === '/myvideo.mpd') {
    console.log('mpd request received');
    res.setHeader('Access-Control-Allow-Origin', '*')
    pipeline(createReadStream(`./files/${url}`), res, errCallback);
  } else if (url.indexOf('m4s') >= 0) {
    const quality = url.split('_')[1];
    console.log(url);
    const index = parseInt(url.split('_')[2].split('.')[0]);
    if(uid == null) {
      console.log("url2",url2);
      const id = url2.split('=')[1];
      console.log("uuid",id);
      uid = id;
    }
    var temp = {
      ID: index,
      URL: url,
      TIME: Date.now(),
      SIZE: getFilesizeInBytes(`./files${url}`),
    };
    jsonData.push(temp);
    console.log('stream request')
    res.setHeader('Access-Control-Allow-Origin', '*')
    if(index == 59) {
      var filename = fs.createWriteStream(uid+".csv");
      fastcsv
      .write(jsonData, { headers: true })
      .on("finish",function(){
        uid = null;
        jsonData=[];
        console.log("csv file downloaded");
      })
      .pipe(filename);
    }
    pipeline(createReadStream(`./files/${url}`), res, errCallback);
  } else if (url.indexOf('mp4') >= 0) {
    console.log('stream-1 request')
    res.setHeader('Access-Control-Allow-Origin', '*')
    const index = parseInt(url.split('_')[2].split('.')[0]);
    var temp = {
      ID: index,
      URL: url,
      TIME: Date.now(),
      SIZE: getFilesizeInBytes(`./files${url}`),
    };
    jsonData.push(temp);
    pipeline(createReadStream(`./files/${url}`), res, errCallback);
  } else if (url.indexOf('.js') >= 0) {
    pipeline(createReadStream(`./dash.js`), res, errCallback);
    // regular expression for filename requested
    // const re = /\/(\w+)*/;
    // const filename = req.url.replace(re, "$1");
    // pipeline(createReadStream(`../client/${filename}`), res, errCallback);
  }
}).listen(3000);