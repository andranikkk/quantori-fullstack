import React, { useState } from "react";
import axios from "axios";

import "./styles.css";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      // const { token, refreshToken } = response.data;
      // localStorage.setItem("token", token);
      // localStorage.setItem("refreshToken", refreshToken);

      localStorage.setItem("token", response.data.accessToken);

      console.log("Login successful:", response.data);
      onClose();
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response
          ? error.response.data.message
          : "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
