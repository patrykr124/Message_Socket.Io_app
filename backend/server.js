const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const { connectDB } = require("./lib/db");
const { server, app, io } = require("./lib/socket.io/socket");

app.use(express.json({ limit: "500mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "500mb", extended: true }));

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://message-socket-io-app-server.onrender.com",
      "https://message-socket-io-appfrontend-nmnzmhkwx.vercel.app",
      "https://message-socket-io-appfrontend.vercel.app"
    ],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    credentials: true,
  })
);




app.get("/", (req, res) => {
  res.send("Witaj w mojej aplikacji!");
});
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
