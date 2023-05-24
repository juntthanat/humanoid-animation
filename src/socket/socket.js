// import { io } from "socket.io-client";

// const socket = io("localhost:3001");

// export { socket };

// Websocket
// let socket = new WebSocket("wss://testsocket.danceoftaihou.live");
// let socket = new WebSocket("ws://localhost:8989")

export function startRotationWebSocket() {
  let socket = new WebSocket("wss://testsocket.danceoftaihou.live");
  return socket;
}

export function startPositionWebSocket() {
  let socket = new WebSocket("wss://testsocket.danceoftaihou.live");
  return socket;
}

export function closeWebsocket(socket) {
  socket.close();
}

// export { socket };
