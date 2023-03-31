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
