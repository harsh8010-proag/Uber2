import React, { useState } from 'react';
import { FaGripfire } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { CaptainDataContext } from '../contaxt/CaptanContext';
import { toast } from 'react-toastify';
import axios from 'axios';

  const Captainlogin = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPasword  ] = useState('');
  const [captainData, setCaptainData] = useState({});

  const [serverError, setServerError] = useState('');
  const navigate=useNavigate();
  const {captain,setCaptain} = React.useContext(CaptainDataContext);
  
  const submitHandler = async(e) =>{
     e.preventDefault();

     const captainData={
           email:email,
           password 
     }

     try{
     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captainData);
        
     
     if(response.status === 200){
      const data=response.data;
      setCaptain(data.captain);
      localStorage.setItem('token',data.token);

      toast.success("Login successful!", {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "colored",
                      });
      navigate('/captain-home');
     }
       
    setEmail('');
    setPasword('');
     }catch (error){
      if(error.response && error.response.data){
      // Exprss validator errors, display first message
      if(error.response.data.errors){
    setServerError(error.response.data.errors[0].msg);
      }else if(error.response.data.message){
        //other custome backend Error
      setServerError(error.response.data.message);
    }else{
      setServerError('unkown error occured.')
    }
    } else {
      setServerError('Network error');
    }
     }
  }

  return (
   <div className='py-7 px-5 flex flex-col justify-between'>
           <div>            
           <div className="logo flex items-center mb-10">
                   <FaGripfire className='text-[35px] text-red-500 '/>
                   <h1 className='inter-harsh2 text-[35px] text-orange-500'>
                     A< span className='text-black' >ber</span >
                   </h1>
                    <FaArrowRight className='relative top-10 right-25 text-[20px]'/>
           </div>               
                   
             
           <form onSubmit={(e)=>{
             submitHandler(e);
           }}>
               <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
               <input required 
               value={email}
               onChange={(e)=>{
                 setEmail(e.target.value);
           }}
               className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-5 placeholder:text-base'
               type="email"
               placeholder='Enter your email'
          />
   
               <h3 className='font-medium text-lg mb-2'>Enter Password</h3>
               <input required
               value={password}
               onChange={(e)=>{
                 setPasword(e.target.value);
               }}
               className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-7 placeholder:text-base'
               type="password"
               placeholder='password' />

               {serverError && (
            <p className="text-sm text-red-500 mb-3">{serverError}</p>
          )}
               <button
               className='bg-[#111] text-white font-semibold  px-4 py-2 w-full '
               >Login</button>
           <p className='text-center mb-10'> Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p> 
           </form>
           </div>
   
           <div>
               <Link
               to='/login'
               className='bg-red-500 flex items-center justify-center text-white font-semibold mb-5 rounded-lg  px-4 py-2 w-full'
               >Sign in as User</Link>
           </div>
       </div>
  )
}

export default Captainlogin;