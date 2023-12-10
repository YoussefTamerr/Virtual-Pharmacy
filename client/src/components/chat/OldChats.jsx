import { Menu } from "antd";

const OldChats = ({ selectedChat, setSelectedChat, chats }) => {
  return (
    <Menu
      mode="vertical"
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#fafafa",
      }}
    >
      {chats.map((chat, index) => (
        <Menu.Item
          key={index}
          className={`old-chat ${
            selectedChat?._id === chat._id ? "selected" : ""
          }`}
          onClick={() => setSelectedChat(chat)}
        >
          {chat.receiverName}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default OldChats;
