import { io } from "socket.io-client";

const URL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? undefined
    : "https://blab-board-api.onrender.com";

export const socket = io(URL, {
  autoConnect: false,
});
