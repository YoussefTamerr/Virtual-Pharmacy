import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";
import OldChats from "./OldChats";
import axios from "axios";
import { Button, Flex } from "antd";

const ChatPage = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [oldChats, setOldChats] = useState([]);

  const createNewChat = (contact) => {
    axios
      .post("http://localhost:10000/chat/", {
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
    axios.get("http://localhost:10000/chat/" + user?._id).then((response) => {
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
      const response = await axios.get("http://localhost:10000/auth/me", {
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
      <h1>Chat</h1>
      <Flex
        style={{
          width: "80%",
          minHeight: "60vh",
          backgroundColor: "#fafafa",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #dfdfdf",
        }}
        gap={30}
      >
        <Flex vertical>
          <OldChats
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            chats={oldChats}
          />
          <Button type="primary" onClick={() => setContactsOpen(true)}>
            New chat
          </Button>
        </Flex>

        <ChatBox selectedChat={selectedChat} user={user} />
      </Flex>
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
