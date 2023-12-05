import React, { useState, useEffect, useContext, useRef } from "react";
import { io } from "socket.io-client";
import ChatContext from "../contexts/ChatContext";

const Conversation = ({conversation , currentUser}) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const otherUser = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + otherUser);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  const socket = io("http://localhost:10000");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:10000/pharmacist/loggedin/pharmacist`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setPharmacist(data);
        console.log(data.name);
      }
    };
    fetchData();

    const fetchData2 = async () => {
      const response2 = await fetch(`http://localhost:10000/patient/${room}`, {
        credentials: "include",
      });
      const data2 = await response2.json();
      if (response2.ok) {
        setPatientInChat(data2.info.name);
      }
    };
    fetchData2();
  }, []);

  useEffect(() => {
    socket.emit("joinChat", "65691849f25be20afe76d6fa");
    console.log("room:65691849f25be20afe76d6fa");

    socket.on("receiveMessage", (receivedRoom, receivedMessage) => {
      if (receivedRoom === room && receivedMessage.message === message) {
        return;
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { room: receivedRoom, message: receivedMessage },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room, setMessages]);

  const sendMessage = () => {
    if (message !== "") {
      console.log("message sent:" + message + " room:" + room);
      // Emit the message to the server
      socket.emit("sendMessage", room, message);

      setPharmacistMessages((prevMessages) => [...prevMessages, message]);

      console.log(room);

      setMessage("");

      setNotification("Message sent!");
    } else {
      setNotification("Please enter a message before sending.");
      console.log("Please enter a message before sending.");
    }
  };

  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        ref={messagesContainerRef}
        style={{
          flex: 1,
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "30px",
        }}
      >
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{`${
              pharmacistMessages.includes(msg.message)
                ? pharmacist.name
                : patientInChat
            }: ${msg.message}`}</li>
          ))}
        </ul>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#fff",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "500px",
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "2px solid #ddd",
            marginRight: "10px",
            outline: "none",
            fontSize: "18px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            padding: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ➔
        </button>
        {notification && (
          <div style={{ marginLeft: "10px" }}>{notification}</div>
        )}
      </div>
    </div>
  );
};

export default Conversation;

// import React, { useState, useEffect ,useContext } from "react";
// import { io } from "socket.io-client";
// import ChatContext from "../contexts/ChatContext";

// const PharmacistChat = () => {
//   const [room, setRoom] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [notification, setNotification] = useState("");
//   const [pharmacist, setPharmacist] = useState(null);
//   const { fifoEmpty, setFifoEmpty } = useContext(ChatContext);
//   //const [fifoEmpty, setFifoEmpty] = useState(false);

//   const socket = io("http://localhost:10000");

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to Socket.io");
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected");
//       // Update the fifo state when a patient disconnects
//       setFifoInChatView((prevFifo) =>
//         prevFifo.filter((patient) => patient.id !== patient._id)
//       );
//     });

//     socket.on("receiveMessage", (room, receivedMessage) => {
//       setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//     });

//     const fetchData = async () => {
//       const response = await fetch(
//         `http://localhost:10000/pharmacist/loggedin/pharmacist`,
//         {
//           credentials: "include",
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setPharmacist(data);
//       }
//     };
//     fetchData();

//     return () => {
//       socket.disconnect();
//       setFifoInChatView((prevFifo) =>
//         prevFifo.filter((patient) => patient.id !== patient._id)
//       );
//     };
//   }, []);

//   const handleJoinChat = () => {
//     setRoom(""); // Clear the room first

//     // Check if fifo is empty
//     if (fifoEmpty) {
//       setNotification("No chat available to join");
//     } else if (room.trim() !== "") {
//       const newPatient = { id: pharmacist._id, name: pharmacist.name };
//       setRoom(pharmacist._id);
//       socket.emit("joinChat", room);
//       setFifoInChatView((prevFifo) => [...prevFifo, newPatient]); // Add the pharmacist to the FIFO
//     } else {
//       // If room is empty, join the first room
//       setFifoInChatView((prevFifo) => {
//         if (prevFifo.length === 0) {
//           setNotification("No chat available to join");
//           return prevFifo;
//         }

//         const defaultRoom = prevFifo[0];
//         setRoom(defaultRoom.id);
//         socket.emit("joinChat", defaultRoom.id);
//         return prevFifo;
//       });
//     }
//     setRoom("");
//   };

//   const handleSendMessage = () => {
//     if (message.trim() !== "") {
//       const sentMessage = `${pharmacist.name}: ${message}`;
//       socket.emit("sendMessage", pharmacist._id, sentMessage);
//       setMessage("");
//       setMessages((prevMessages) => [...prevMessages, sentMessage]); // Update messages with the sent message
//     } else {
//       setNotification("Please enter a message before sending.");
//     }
//   };

//   return (
//     <div>
//       <div>
//         <label>Room:</label>
//         <input
//           type="text"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//         />
//         <button onClick={handleJoinChat}>Join Chat</button>
//       </div>
//       <div>
//         <div>
//           {messages.map((msg, index) => (
//             <div key={index}>{msg}</div>
//           ))}
//         </div>
//         <div>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button onClick={handleSendMessage}>Send Message</button>
//         </div>
//         {notification && <div>{notification}</div>}
//       </div>
//     </div>
//   );
// };

// export default PharmacistChat;
