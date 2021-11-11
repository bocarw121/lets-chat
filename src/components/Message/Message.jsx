import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Form from "../Form/Form";
import MessageDisplay from "../MessageDisplay/MessageDisplay";
import "./Message.css";
const socket = io("https://obscure-forest-29020.herokuapp.com/");

const Message = () => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("client connected");
      setIsOnline(true);
    });

    socket.on("usertyping", ({ typing }) => {
      setUserTyping(typing);
    });

    socket.on("msg:get", (message) => {
      setData(message.msg);
    });

    socket.on("disconnect", () => {
      setIsOnline(false);
    });

    return () => socket.disconnect();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user || !message) {
      return;
    }
    socket.emit("msg:post", {
      user,
      message,
    });

    // reset values
    setUser("");
    setMessage("");

    //
    socket.emit("usertyping", false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "user") {
      setUser(value);
    }

    if (name === "message") {
      setMessage(value);

      socket.emit("usertyping", true);
    }
  };

  return (
    <>
      <div className="indicator">{isOnline ? "🟢" : "🔴"}</div>
      <div className="container">
        <Form
          user={user}
          message={message}
          data={data}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <MessageDisplay message={data} />

        <footer className="user-typing">
          {userTyping ? <p>User Typing</p> : null}
        </footer>
      </div>
    </>
  );
};

export default Message;
