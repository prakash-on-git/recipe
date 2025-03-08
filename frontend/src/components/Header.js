import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CakeSlice, CircleUser, LogOut } from 'lucide-react';

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
    <div className='flex justify-between text-xl font-semibold py-2 px-10 m-2'>
        <div className='flex gap-2 '>
            <a href='/home'><CakeSlice size={35}/></a>
            <div className='text-2xl'>Logo</div>
        </div>
        <div className='flex gap-8 text-neutral-700'>
          <div className='flex gap-3 items-center '>
            <CircleUser/>
            <a href='/profile'>{loggedInUser}</a>
          </div>
          <button onClick={handleLogout}><LogOut size={20}/> </button>
        </div>
    </div>
  )
}

export default Header
