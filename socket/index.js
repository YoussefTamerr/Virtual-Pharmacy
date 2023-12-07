import Medicine from "../api/models/medicineModel.js";

import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from "mongoose";
import dotenv from "dotenv";
import { checkMedicineStock } from "../api/app.js";

dotenv.config();



const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", async (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (!user) return;
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when out of stock
  const checkMedicineStockInterval = setInterval(async () => {
    let x = await checkMedicineStock();

    io.emit("outOfStockNotification", {
      medicineNames: x,
    });
  }, 10000); // Run every 1 minute (adjust the interval as needed)

  checkMedicineStockInterval;

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const PORT = 8900;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

