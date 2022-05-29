const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { Server, Socket } = require("socket.io");
const Actions = require("./src/Actions");

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("build"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

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

  socket.on(Actions.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(Actions.CODE_CHANGE, { code });
  });

  socket.on(Actions.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(Actions.CODE_CHANGE, { code });
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
