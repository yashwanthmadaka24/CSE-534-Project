const { createQuicSocket } = require("net");
const { readFileSync } = require("fs");
const port = process.env.NODE_PORT || 3005; // Definition HTTP Default port or from NODE_PORT Environment variable acquisition
const key = readFileSync("./localhost-key.pem");
const cert = readFileSync("./localhost.pem");
// const ca = readFileSync("./ssl_certs/server.csr");
const servername = "localhost";
const alpn = "hello";
// establish QUIC UDP IPv4 The socket is bound to the local IP port 3005
const server = createQuicSocket({ endpoint: { port } });
// Keys and certificates to protect new connections , Use virtual hello Application Protocol .
server.listen({ key, cert, alpn });
server.on("session", (session) => {
session.on("stream", (stream) => {
stream.pipe(stream);
});
});
server.on("listening", () => {
console.info(`listening on ${port}...`);
console.info("input content!");
});