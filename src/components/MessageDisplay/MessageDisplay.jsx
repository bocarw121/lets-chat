import React from "react";
import "./MessageDisplay.css";

const MessageDisplay = ({ message }) => {
  return (
    <div className="message-display">
      {message.map((msg, index) => (
        <ul key={index} className="messageContainer">
          <li className="user">{msg.user}</li>
          <li className="message">{msg.message}</li>
        </ul>
      ))}
    </div>
  );
};

export default MessageDisplay;
