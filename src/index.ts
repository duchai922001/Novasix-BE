import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/connectDatabase";
import { initRoutes } from "./presentations/routes/index.route";
import { createServer } from "http";
import { Server } from "socket.io";
import "./utils/cron-jobs";

dotenv.config();
const app = express();
const httpServer = createServer(app); // Sử dụng httpServer thay vì app.listen()

// Config Middleware
app.use(express.json());
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Khởi tạo Socket.io
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) onlineUsers.delete(key);
    });
  });
});

// Kết nối Database
connectDatabase();

// Khởi tạo Routes
initRoutes(app);

// **FIX QUAN TRỌNG: Dùng httpServer.listen thay vì app.listen**
const port = process.env.PORT_SERVER || 8080;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { io, onlineUsers };
