import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CakeSlice, CircleUser, LogOut } from 'lucide-react';
import './header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      localStorage.getItem('loggedInUser') && setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      setLoggedInUser('');
      setTimeout(() => {
            navigate('/login');
            toast.success('Logged out successfully');
      }, 1000);
    }

  return (
    <div className="navbar">
    <div className="navbar-left">
        <a href="/home"><CakeSlice size={35} /></a>
        <div className="navbar-logo">Logo</div>
    </div>
    <div className="navbar-links">
        <div className="navbar-user">
            <CircleUser />
            <a href="/profile">{loggedInUser}</a>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
        </button>
      </div>
    </div>
  )
}

export default Header
