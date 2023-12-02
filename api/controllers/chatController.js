// import { io } from "socket.io";
// const socket = io("http://localhost:10000");

const handleConnection = (socket) => {
    console.log("a user connected");
  
    socket.on("joinChat", (room) => {
      socket.join(room);
      console.log("user joined room", room);
    });
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("sendMessage", (room, message) => {
        if (message === "" ) {
          return;
        }
        console.log("message: ", message);
        socket.to(room).emit("receiveMessage", room, message);
      });
  };

//   const sendMessage = (room, message) => {
//     if (message === "" ) {
//       return;
//     }
//     socket.emit("sendMessage", room, message);
//   };

//   const receiveMessage = (callback) => {
//     socket.on("receiveMessage", (room, message) => {
//       callback(room, message);
//     });
//   };


  export { handleConnection };