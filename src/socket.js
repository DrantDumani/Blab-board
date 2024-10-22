import { io } from "socket.io-client";

const URL = "https://blab-board-api.onrender.com";

export const socket = io(URL, {
  autoConnect: false,
});
