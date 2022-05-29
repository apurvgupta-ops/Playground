const express = require("express");
const app = express();
const http = require("http");
const { Server, Socket } = require("socket.io");
const Actions = require("./src/Actions");

const server = http.createServer(app);

const io = new Server(server);

const useUserMap = {};

const getAllConnectedUser = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: useUserMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on(Actions.JOIN, ({ roomId, userName }) => {
    useUserMap[socket.id] = userName;
    socket.join(roomId);

    const clients = getAllConnectedUser(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(Actions.JOINED, {
        clients,
        userName,
        socketId: socket.id,
      });
    });
    console.log(clients);
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(Actions.DISCONNECTED, {
        socketId: socket.id,
        userName: useUserMap[socket.id],
      });
    });

    delete useUserMap[socket.id];
    socket.leave();
  });
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
