import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); //mail durumu
  const [password, setPassword] = useState(""); //sifre durumu
  const [error, setError] = useState(""); //hata durumu
  const navigate = useNavigate(); //yonlendirme icin

  const handleSubmit = (e) => {
    e.preventDefault(); //sayfa yenilenmesini engelliyor
    //mail sifre dogrulamasi
    if (email === "user@example.com" && password === "password") {
      navigate("/"); //anasayfaya gittik
    } else {
      setError("Invalid email or password."); //hata mesaji ayarlandi
    }
  };

  return (
    <div className="login-page">
      <h1>Log In</h1>
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
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Log In</button>
      </form>
      <p>
        Do you not have an account? <Link to="/register">Sing Up</Link>
      </p>
      <p>
        <Link to="/forgot-password">Forgot my password</Link>
      </p>
    </div>
  );
};

export default Login;
