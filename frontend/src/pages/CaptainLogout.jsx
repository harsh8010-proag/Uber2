import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

export const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()
    
     useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        withCredentials: true
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('captain-token');
              toast.success("Logout!", {
                                          position: "top-center",
                                          autoClose: 2000,
                                          theme: "colored",
                                        });
            navigate('/')
        }
    })
     }, []);
    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout;