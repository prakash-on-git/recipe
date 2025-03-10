import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';

const Login = () => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // To store JWT in HTTP-only cookies
      });

    //   setMessage(res.data.message);
      setFormData({ email: "", password: "" });

    // Redirect user after successful login
      if (res.data.success) {        
        localStorage.setItem('token', res.data.jwt_token);
        localStorage.setItem('loggedInUser', res.data.username);
        navigate("/home");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Navigation Tabs */}
        <div className="auth-nav">
            <Link to="/register"> <h2>Register</h2> </Link>
            <Link to="/login" className="active"> <h2>Login</h2> </Link>
        </div>

        {/* Error Message */}
        {message && <p className="auth-error">{message}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} >
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="auth-input" required autoFocus/>

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="auth-input" required/>

          <button type="submit" disabled={loading} className="auth-button"> {loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    </div>
  )
}

export default Login
