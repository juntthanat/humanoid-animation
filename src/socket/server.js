
// Socket.io
import { Server } from "socket.io";

import { readFile } from "fs/promises";

const json = JSON.parse(
  await readFile(new URL("../assets/testOutput.json", import.meta.url))
);

const ln = json.length;

const idxrand = () => Math.round(Math.random() * ln) - 1;

const io = new Server({
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log(`connect: ${socket.id}`);
});

io.listen(3001);

setInterval(() => {
  io.emit("data", json[idxrand()]);
}, 250);


// // Websocket

// import { readFile } from "fs/promises";

// const json = JSON.parse(
//   await readFile(new URL("../assets/testOutput.json", import.meta.url))
// );

// const ln = json.length;

// const idxrand = () => Math.round(Math.random() * ln) - 1;

// var WebSocketServer = require('websocket').server;
// var http = require('http');

// var server = http.createServer(function(request, response) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.writeHead(404);
//     response.end();
// });
// server.listen(3001, function() {
//     console.log((new Date()) + ' Server is listening on port 3001');
// });

// wsServer = new WebSocketServer({
//   httpServer: server,
//   autoAcceptConnections: false
// });

// function originIsAllowed(origin) {
// // put logic here to detect whether the specified origin is allowed.
// return true;
// }