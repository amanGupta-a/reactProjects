import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({children, authenticated=true}) {
    const [loader, setLoader]=useState(true);
    const navigate=useNavigate();
    const authStatus=useSelector((state)=>state.auth.status);
    useEffect(()=>{
        if(authenticated && !authStatus){
            navigate("/login");
        }
        if(!authenticated && authStatus){
            navigate("/")
        }
        setLoader(false);
    },[authStatus, authenticated, navigate])
    if(loader)return null;
  return (
    <>
        {children}
    </>
  )
}
