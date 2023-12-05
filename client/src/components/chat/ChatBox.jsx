import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import { format } from 'timeago.js'

const { TextArea } = Input;

const ChatBox = ({ selectedChat, user }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      selectedChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, selectedChat]);

  useEffect(() => {
    if (!user) return;
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    if (!selectedChat) return;
    axios
      .get("http://localhost:10000/chat/get-messages/" + selectedChat?._id)
      .then((response) => {
        setMessages([...response.data]);
      });
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (messageText === "" || !selectedChat || !user) return;
    const receiverId = selectedChat?.members?.find(
      (member) => member !== user?._id
    );

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: messageText,
    });

    axios
      .post("http://localhost:10000/chat/send-message", {
        conversationId: selectedChat._id,
        sender: user._id,
        text: messageText,
      })
      .then((response) => {
        setMessages([...messages, response.data]);
        setMessageText("");
      });
  };
  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>{selectedChat?.receiverName}</h3>
      </div>
      <div className="chat-body">
        {messages?.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message?.sender == user?._id ? "right" : "left",
            }}
          >
            <p>{message.text}</p>
          <span style={{fontSize:"0.65rem",color:"#ccc"}} >{format(message.createdAt)}</span>
          </div>
        ))}
      </div>
      <div className="chat-area">
        <TextArea
          placeholder={"Type a message..."}
          autoSize={{ minRows: 1, maxRows: 4 }}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <Button
          className="send-button"
          onClick={handleSendMessage}
          type="primary"
        >
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
};
export default ChatBox;
