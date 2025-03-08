import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

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
    <div className='h-[100vh] flex justify-center items-center'>
      <div className="max-w-md mx-auto h-[40vh] p-6 shadow-lg dark:shadow-gray-700 rounded-lg ">
        <div className="flex justify-evenly">
          <Link to="/register">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-600 cursor-pointer"> Register </h2>
          </Link>

          <Link to="/login">
            <h2 className="text-2xl font-semibold mb-4 cursor-pointer"> Login </h2>
          </Link>
        </div>  

        {message && <p className="mb-4 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border rounded-md dark:bg-gray-800" autoFocus/>

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"/>

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"/>

          {/* <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-md dark:bg-gray-800" /> */}

          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Register
