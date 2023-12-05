import React, { useState, useEffect , useRef , useContext} from "react";
import io from "socket.io-client";
import {AuthContext} from "";

const socket = io("http://localhost:8900"); // Replace with your server URL

const Messenger = () => {
  const [conversation, setConversation] = useState([]); // [ { senderId: "REPLACE_WITH_SENDER_ID", text: "REPLACE_WITH_MESSAGE" }
  const [currentChat, setCurrentChat] = useState(null); // { senderId: "REPLACE_WITH_SENDER_ID", text: "REPLACE_WITH_MESSAGE" }
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:10000//get-chats:${user._id}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setConversation(data);
        console.log(data.name);
      }
    };
    fetchData();
  }, [user._id]);

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.senderId}: {message.text}</p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messenger;
