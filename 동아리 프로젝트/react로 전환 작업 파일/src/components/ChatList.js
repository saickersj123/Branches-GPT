import React, { useState, useEffect } from 'react';
import '../css/ChatMessage.css';
import { fetchMessages } from '../api/axiosInstance'; // fetchMessages 함수를 가져옵니다.

const ChatMessage = ({ message, sentByUser, username, time }) => {
  const timeString = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className={`message-container ${sentByUser ? 'sent-by-user' : 'received'}`}>
      {username && (
        <div className="username">{username}</div>
      )}
      <div className="bubble-container">
        <div className="bubble">
          {message}
        </div>
        <div className="time">{timeString}</div>
      </div>
    </div>
  );
};

const ChatList = () => {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    try {
      const data = await fetchMessages(true); // non_server_test 변수를 true로 전달
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            sentByUser={message.sentByUser}
            username={message.username}
            time={message.time}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
