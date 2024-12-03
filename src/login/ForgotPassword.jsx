import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("The password reset link has been sent to your e-mail address.");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-page">
        <h1>Forgot my password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>
          To return to<Link to="/login">Return to the Home Page</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;


