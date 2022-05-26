const express = require("express");
const app = express();
const http = require("http");
const { Server, Socket } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
