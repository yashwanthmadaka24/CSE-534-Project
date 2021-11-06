const { createSecureServer } = require("http2");
const { readFileSync } = require("fs");

const options = {
  key: readFileSync("./localhost-key.pem"),
  cert: readFileSync("./localhost.pem")
};

const server = createSecureServer(options).listen(3000);

server.on("stream", (stream, headers) => {
  if (headers[":path"] === "/") {
    stream.respondWithFile("../client/index.html");
  } else if (headers[":path"] === "/myvideo.mpd") {
    stream.respondWithFile("../files/myvideo.mpd");
  } else {
    // regular expression for filename requested
    // const re = /\/(\w+)*/;
    // const filename = headers[":path"].replace(re, "$1");
    // stream.respondWithFile(`../client/${filename}`);
  }
});
