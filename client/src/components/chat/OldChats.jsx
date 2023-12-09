import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'antd'
import './chat.css'
const OldChats = ({ selectedChat,setSelectedChat,chats }) => {
return (<div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: '#f5f5f5',
        padding: '10px 0px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
    
}}>
        {chats.map((chat, index) => (
            <Button
                className={`old-chat ${selectedChat?._id === chat._id ? 'selected' : ''}`}
                key={index}
                onClick={() => setSelectedChat(chat)}
                style={{
                    width: '90%',
                    height: '50px',
                    borderRadius: '5px',
                    margin: '5px 0px',
                    padding: '0px 10px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    border: 'none',
                    outline: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#555',
                    cursor: 'pointer',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                    boxSizing: 'border-box'
                
                }}
                >
                    {chat.receiverName}
            </Button>
        ))}
    </div>
);

}

export default OldChats