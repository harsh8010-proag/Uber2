import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import  { useEffect } from 'react';
 
const UserLogout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

     useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            localStorage.removeItem('token');
                toast.success("Logout!", {
                              position: "top-center",
                              autoClose: 2000,
                              theme: "colored",
                            });
            navigate('/login');
        }
    })
     }, []);
    
  return (
    <div>Logging out...</div>
  )
}


export default UserLogout;