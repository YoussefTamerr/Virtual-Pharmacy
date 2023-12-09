import React, { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";
import OldChats from "./OldChats";
import axios from "axios";
import "./chat.css";
import { Button } from "antd";

const ChatPage = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [oldChats, setOldChats] = useState([]);

  const createNewChat = (contact) => {
    axios
      .post("http://localhost:10000/chat/new-chat", {
        senderId: user._id,
        receiverId: contact._id,
        senderName: user.name,
        receiverName: contact.name,
      })
      .then((response) => {
        const newChat = {
          ...response.data,
          senderId: user._id,
          senderName: user.name,
          receiverId: contact._id,
          receiverName: contact.name,
        };
        setSelectedChat(newChat);
        setOldChats([...oldChats, newChat]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!user) return;
    axios
      .get("http://localhost:10000/chat/get-chats/" + user?._id)
      .then((response) => {
        response.data?.map((chat) => {
          chat.senderId = user._id;
          chat.senderName = user.name;
          let receiverId = chat.members[0];
          if (receiverId === user._id) {
            receiverId = chat.members[1];
          }
          let receiverName = chat.membersInfo[0];
          if (receiverName === user.name) {
            receiverName = chat.membersInfo[1];
          }
          chat.receiverId = receiverId;
          chat.receiverName = receiverName;
          return chat;
        });
        setOldChats([...response.data]);
        console.log(response.data);
      });
  }, [user]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:10000/currUser", {
        withCredentials: true,
      });
      if (response.data) {
        setRole(response.data.role);
        setUser(response.data.currUser);
      }
    };
    try {
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <h3>Chat</h3>
      <div className="chat-header"></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
          width: "70%",
          borderRadius: "0.5rem",
          overflow: "hidden",
          boxShadow: "0 0 0.5rem rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "40%",
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "10px 0px",
            gap: "1rem",
          }}
        >
          <Button
            style={{
              marginTop: "2rem",
            }}
            type="primary"
            onClick={() => setContactsOpen(true)}
          >
            New chat
          </Button>
          <OldChats
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            chats={oldChats}
          />
        </div>

        <ChatBox selectedChat={selectedChat} user={user} />
      </div>
      <Contacts
        open={contactsOpen}
        onCancel={() => setContactsOpen(false)}
        createNewChat={createNewChat}
        currUser={user}
        role={role}
      />
    </>
  );
};

export default ChatPage;
