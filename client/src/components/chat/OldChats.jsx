import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'antd'
const OldChats = ({ selectedChat,setSelectedChat,chats }) => {
return (<div className='old-chats'>
        {chats.map((chat, index) => (
            <Button
                className={`old-chat ${selectedChat?._id === chat._id ? 'selected' : ''}`}
                key={index}
                onClick={() => setSelectedChat(chat)}>
                    {chat.receiverName}
            </Button>
        ))}
    </div>
);

}

export default OldChats