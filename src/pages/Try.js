import React from 'react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chats = () => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const resultSocket = io('http://localhost:4000');
    setSocket(resultSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('messageBe', (data) => {
        setMessages((current) => [...current, data]);
      });
    }
  }, [socket]);

  const handleMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      <ul>
        {messages.map((item, index) => (
          <li key={index + 1}>
            {item.message} - {item.date}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        name="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={handleMessage}>tes</button>
    </div>
  );
};

export default Chats;
