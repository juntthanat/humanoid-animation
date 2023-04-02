import { io } from "socket.io-client";

const socket = io("localhost:3001");

export { socket };


// // Websocket
// let socket = new WebSocket("localhost:3001");

// export {socket};



// let socket = new WebSocket(address)
// socket.onopen = function() {
    
//     }

// socket.onmessage = function(d) {
//   let temp = d.data
// }
