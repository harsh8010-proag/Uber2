import React,{ useContext,useEffect, useState } from 'react'
import { CaptainDataContext } from '../contaxt/CaptanContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const CaptainProtectWrapper = ({
    children
}) => {
     const navigate = useNavigate();
     const {captain, setCaptain } = useContext(CaptainDataContext);
     const [ isLoading , setIsLoading ] = useState(true);

     useEffect(()=>{
  
    

       axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        withCredentials: true
     }).then(response => {
        if(response.status === 200){
            console.log('data is data',response.data);
            setCaptain(response.data.captain)
            setIsLoading(false);
        }
     }).catch(err => {
        console.log(err);
 
        navigate('/captain-login');
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

export default CaptainProtectWrapper;