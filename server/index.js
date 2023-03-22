const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// CAPTER LES CONNEXIONS ENTRANTES
io.on("connection", (socket) => {
  console.log(`User Connected  : ${socket.id}`);

  // CREATION DES ROOM
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  // CAPTER LES MESAGES
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  // CAPTER LES DECONNECTION
  socket.on("disconnect", (socket) => {
    console.log("User deconnection ");
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING AT 3001");
});
