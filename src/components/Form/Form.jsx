import React from "react";
import "./Form.css";
const Form = ({ user, message, handleSubmit, handleChange }) => {
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <label htmlFor="user">User:</label>
      <input name="user" value={user} onChange={handleChange} />
      <label htmlFor="message">Message</label>
      <input name="message" value={message} onChange={handleChange} />
      <button>Send</button>
    </form>
  );
};

export default Form;
