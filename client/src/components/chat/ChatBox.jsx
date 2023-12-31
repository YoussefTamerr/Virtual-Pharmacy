import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import { format } from "timeago.js";

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
      .get("http://localhost:10000/chat/messages/" + selectedChat?._id)
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
      .post("http://localhost:10000/chat/messages", {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: "1",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          margin: "0 0.5rem 0 0.5rem",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 0px 0px rgba(204,204,204,0.25)",
        }}
      >
        <h3>{selectedChat ? selectedChat?.receiverName : "Select a Chat"}</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          flexGrow: "1",
          height: "300px",
          padding: "1rem",
          borderRadius: "0.5rem",
          overflow: "auto",
          margin: "0.5rem",
          scrollBehavior: "smooth",
          scrollSnapType: "y mandatory",
          scrollPadding: "0.5rem",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 0px 0px rgba(204,204,204,0.25)",
        }}
      >
        {messages?.map((message, index) => (
          <>
            <div
              key={index}
              style={{
                alignSelf:
                  message?.sender == user?._id ? "flex-end" : "flex-start",
                padding: "0.8rem",
                borderRadius: "0.5rem",
                backgroundColor:
                  message?.sender == user?._id ? "#1890ff" : "#ebebeb",
                color: message?.sender == user?._id ? "#fff" : "#000",
                width: "fit-content",
                maxWidth: "70%",
                height: "fit-content",
              }}
            >
              <div>{message.text}</div>
            </div>
            <span
              style={{
                fontSize: "0.65rem",
                color: "#000",
                alignSelf:
                  message?.sender == user?._id ? "flex-end" : "flex-start",
              }}
            >
              {format(message.createdAt)}
            </span>
          </>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0 0.5rem",
        }}
      >
        <TextArea
          placeholder={"Type a message..."}
          autoSize={{ minRows: 1, maxRows: 4 }}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          style={{
            border: "none",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 0px 0px rgba(204,204,204,0.25)",
          }}
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
