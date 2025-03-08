import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import './register.css';

const Register = () => {

  // const [formData, setFormData] = useState({ username: "", email: "", password: "", avatar: null});
  const [formData, setFormData] = useState({ username: "", email: "", password: ""});
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });    
  };

  // Handle file upload (profile picture)
  // const handleFileChange = (e) => { setFormData({ ...formData, avatar: e.target.files[0] });};

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // const formDataToSend = new FormData();
      // formDataToSend.append("username", formData.username);
      // formDataToSend.append("email", formData.email);
      // formDataToSend.append("password", formData.password);
      // if (formData.avatar) {
      //   formDataToSend.append("avatar", formData.avatar);
      // }
      // console.log(formDataToSend);
      
      const res = await axios.post("http://localhost:8080/auth/register", formData,
        { headers: { "Content-Type": "application/json", },
      });

      setMessage(res.data.message);
      setFormData({ username: "", email: "", password: "" });

      if (res.data.success) {
        navigate("/login"); // Redirect user to the home page
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Navigation Tabs */}
        <div className="auth-nav">
            <Link to="/register" className="active"> <h2>Register</h2> </Link>
            <Link to="/login"><h2>Login</h2></Link>
        </div>

        {/* Error Message */}
        {message && <p className="auth-error">{message}</p>}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="auth-input" required autoFocus/>

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="auth-input" required/>

            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="auth-input" required/>

            <button type="submit" disabled={loading} className="auth-button">
                {loading ? "Registering..." : "Register"}
            </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Register
