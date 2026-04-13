import React, { useState } from 'react';
import { FaGripfire } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { UserDataContext } from '../contaxt/UserContext'; 
import { toast } from 'react-toastify';
import axios from 'axios';
 

const UserSignup = () => {  

  const [ email,setEmail] = useState('');
  const [ password, setPassword ]= useState('');
  const [ firstName, setFitstName ] = useState('');
  const [ lastName, setLastName] = useState('');
  const [ mobileno , setMobileno] = useState('');
 
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserDataContext);
   
  const submitHandler = async(e) =>{
      e.preventDefault();

      const newUser = {
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email:email,
        password:password,
        mobileno:mobileno
      }
      
      try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser,{
        withCredentials:true
      })
    
      if(response.status === 201 ){
        const data = response.data;
        const user = data.user;
           setUser({
    email: user.email,
    fullname: {
      firstname: user.fullname.firstname,
      lastname: user.fullname.lastname
    },
    mobileno:user.mobileno
  });
     
        
     
         toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });

      
        navigate('/home');
      }


      setEmail('');
      setFitstName('');
      setLastName('');
      setPassword('');
    }catch (error){
      //servre validation error
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
      <div className='h-screen py-15 sm:bg-gray-200  '>
    <div className='p-7 flex flex-col justify-between max-w-lg mx-auto bg-white shadow'>
      <div>            
         <div className="logo flex items-center mb-10">
                       <FaGripfire className='text-[35px] text-red-500 '/>
                       <h1 className='inter-harsh2 text-[35px] text-orange-500'>
                         A< span className='text-black' >ber</span >
                       </h1>
                      
                       </div>
                      
                       
                 
              <form onSubmit={(e)=>{
                 submitHandler(e);
               }}>
                 <h3 className='font-medium mb-2'>What's your name</h3>
                 <div className="flex gap-4 mb-5">
                 <input required 
                        type="text"
                        placeholder='First name'
                        value={firstName}
                        onChange={(e)=>{
                          setFitstName(e.target.value);
                        }}
                   className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-same'                  
                   />

                   <input required 
                        type="text"
                        placeholder='Last name'
                        value={lastName}
                        onChange={(e)=>{
                          setLastName(e.target.value)
                        }}
                   className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-same'
                  
                   />
                  </div>

                   <h3 className=' font-medium mb-2'>What's your email</h3>
                   <input required 
                         type="email"
                         placeholder='Enter your email'
                         value={email}
                         onChange={(e)=>{
                          setEmail(e.target.value);
                         }}
                   className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-5 placeholder:text-same'
                  
                   />
       
                   <h3 className='text-base font-medium mb-2'>Enter Password</h3>
                   <input required
                   
                   type="password"
                   placeholder='password'
                   value={password}
                   onChange={(e)=>{
                    setPassword(e.target.value);
                   }}
                   className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-5 placeholder:text-same'
                   />

                   <h3 className='text-base font-medium mb-2'>Enter your Mobile No.</h3>
                   <input required
                   inputMode="numeric"
                   value={mobileno}
                  

                     type='tel'
                     className='bg-[#eeeeee] rounded px-4 py-2 w-full text-lg mb-5 placeholder:text-same'
                     onChange={(e)=>{
                       const value = e.target.value.replace(/\D/g, "");
                           if (value.length <= 10) {
                       setMobileno(value);
                      } }}
                     />
                     {serverError && (
    <p className="text-sm text-red-500 mb-3">{serverError}</p>
  )}
                   <button
                   className='bg-[#111] text-white font-semibold  px-4 py-2 mb-2 w-full cursor-pointer'
                   
                   >Create account</button>
               <p className='text-center mb-4'>Already have a account? <Link to='/login' className='text-blue-600 text-lg font-semibold'>Login here</Link></p> 
               </form>
               </div>
       
               <div>
 
               </div>
           </div>
           </div>
  )
}

export default UserSignup;                              


