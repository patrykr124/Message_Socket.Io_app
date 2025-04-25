const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://message-socket-io-app-server.onrender.com",
      "https://message-socket-io-appfrontend-nmnzmhkwx.vercel.app",
      "https://message-socket-io-appfrontend.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// online users
const userSocketMap = {}; // { userId: socketId }
console.log("userScoketMap", userSocketMap);
io.on("connection", (socket) => {
  //   console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  //   console.log("userId" , userId);
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    // console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { server, app, io, getReceiverSocketId };
