import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import  { useEffect } from 'react';
 
const UserLogout = () => {

    
    const navigate = useNavigate();

     useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
   withCredentials: true
    }).then((response)=>{
        if(response.status === 200){
             
                toast.success("Logout!", {
                              position: "top-center",
                              autoClose: 2000,
                              theme: "colored",
                            });
            navigate('/');
        }
    })
     }, []);
    
  return (
    <div>Logging out...</div>
  )
}


export default UserLogout;