import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

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
    <div className="h-[100vh] flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 shadow-lg dark:shadow-gray-700 rounded-lg transform -translate-y-8">
        <div className="flex justify-evenly">
            <Link to="/register">
            <h2 className="text-2xl font-semibold mb-4 cursor-pointer"> Register </h2>
            </Link>

            <Link to="/login">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-600 cursor-pointer"> Login </h2>
            </Link>
        </div>

        {message && <p className="mb-4 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md dark:bg-gray-800" required autoFocus/>

            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md dark:bg-gray-800" required/>

            <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            {loading ? "Logging in..." : "Login"}
            </button>
        </form>
      </div>
    </div>
  )
}

export default Login
