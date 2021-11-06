const { createServer } = require("https");
const { readFileSync, createReadStream } = require("fs");
const { pipeline } = require("stream");

const options = {
  key: readFileSync("./localhost-key.pem"),
  cert: readFileSync("./localhost.pem")
};

const errCallback = err => {
  if (err) console.log(err);
};

createServer(options, (req, res) => {
  console.log("REQ URL >>>>>>>>>> ", req.url);
  if (req.url === "/") {
    console.log('req received');
    pipeline(createReadStream(`../client/index.html`), res, errCallback);
  } else if (req.url === '/myvideo.mpd') {
    console.log('request received');
    pipeline(createReadStream(`../files/${req.url}`), res, errCallback);
  } else {
    // regular expression for filename requested
    // const re = /\/(\w+)*/;
    // const filename = req.url.replace(re, "$1");
    // pipeline(createReadStream(`../client/${filename}`), res, errCallback);
  }
}).listen(3000);
