import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log(res.data.message);
        console.log(res.data.newToken);
        navigate('/');
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="login">
      <div className="login__card">
        <div className="login__header">
          <h1 className="login__logo">Elegance</h1>
          <span className="login__badge">Admin</span>
        </div>

        <h2 className="login__title">Sign in to your account</h2>

        <form onSubmit={onSubmitHandler} className="login__form">
          <div className="login__form-group">
            <label className="login__label" htmlFor="email">
              Email
            </label>
            <input
              className="login__input"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login__form-group">
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <div className="login__password-wrapper">
              <input
                className="login__input"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="text"
                name="password"
                placeholder="Enter your password"
                required
              />
              <button type="button" className="login__password-toggle"></button>
            </div>
          </div>

          <div className="login__actions">
            <input
              type="submit"
              className={`login__button`}
              value="Submit"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
