import React,{ useContext,useEffect, useState } from 'react'
import { UserDataContext } from '../contaxt/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserProtectWrapper = ({
    children
}) => {

     
     const navigate = useNavigate();
     const { user, setUser } = useContext(UserDataContext);
     const [ isLoading, setIsLoading ] = useState(true);


     useEffect(()=>{
      
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
         
   withCredentials: true

    }).then(response =>{
      if (response.status === 200){
        
        setUser(response.data);
        setIsLoading(false);
      }
    }).catch(err =>{
      console.log(err);
      localStorage.removeItem('token');
      navigate('/login');
    })
    
    },[])

    if (isLoading) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        
        <p className="text-gray-600 text-lg font-medium">
          Loading...
        </p>

      </div>
    </div>
  );
}

  return (
    <div>
        {children}          
    </div>
  )
}

export default UserProtectWrapper;