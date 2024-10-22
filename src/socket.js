import { io } from "socket.io-client";

const URL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: false,
});
