// import { io } from "socket.io-client";

// const socket = io("localhost:3001");

// export { socket };

// Websocket
// let socket = new WebSocket("wss://testsocket.danceoftaihou.live");
// let socket = new WebSocket("ws://localhost:8989")

export function startWebSocket() {
  // let socket = new WebSocket("wss://testsocket.danceoftaihou.live");
  // let socket = new WebSocket("ws://localhost:8889")
  let socket = new WebSocket("ws://192.168.4.33:8889/")
  return socket;
}

export function closeWebsocket(socket) {
  socket.close();
}

// export { socket };
