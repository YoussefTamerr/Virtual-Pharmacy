import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatView = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState('');
  const [patient, setPatient] =useState(null);


  const socket = io("http://localhost:10000");

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.io');
    });

    socket.on('receiveMessage', (room, receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    const fetchData = async () => {
      const response = await fetch(`http://localhost:10000/patient/loggedin/patient`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setPatient(data);
      }
    };
    fetchData();

    return () => {
      socket.disconnect();
      console.log('Disconnected from Socket.io');
    };

  }, []);

  const handleJoinChat = () => {
    if (room.trim() !== '') {
      socket.emit('joinChat', patient._id);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const sentMessage = `${patient.name}: ${message}`;
      socket.emit('sendMessage', patient._id, sentMessage);
      setMessage('');
      setMessages((prevMessages) => [...prevMessages, sentMessage]); // Update messages with the sent message
    } else {
      setNotification('Please enter a message before sending.');
    }
  };

  return (
    <div>
      <div>
        <label>Room:</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={handleJoinChat}>Join Chat</button>
      </div>
      <div>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
        {notification && <div>{notification}</div>}
      </div>
    </div>
  );
};

export default ChatView;
