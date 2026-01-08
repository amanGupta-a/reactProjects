import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logOut().then(()=>{
            dispatch(logout());
        })
    }
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 text-4xl  hover:bg-gray-900 rounded-xl'>Logout</button>
  )
}

export default LogoutBtn