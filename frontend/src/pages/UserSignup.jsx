import React, { useState } from 'react';
import { FaGripfire } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const UserSignup = () => {  

  const [ email,setEmail] = useState('');
  const [ password, setPassword ]= useState('');
  const [ firstName, setFitstName ] = useState('');
  const [ lastName, setLastName] = useState('');
  const [ userData, setUserData] = useState('');
    const submitHandler = (e) =>{
      e.preventDefault();

      setUserData({
        username:{
          firstName:firstName,
          lastName:lastName
        },
        email:email,
        password:password
      })

console.log(userData);
      setEmail('');
      setFitstName('');
      setLastName('');
      setPassword('');
     }
  return (
    <div className='p-7 flex flex-col justify-between'>
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
                          setEmail(e.target.value)
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

                   <button
                   className='bg-[#111] text-white font-semibold  px-4 py-2 w-full '
                   >Login</button>
               <p className='text-center mb-10'>Already have a account?<Link to='/login' className='text-blue-600 '>Login here</Link></p> 
               </form>
               </div>
       
               <div>
                   <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages,
including by automated means, from Aber and its affiliates to number
provided</p>
               </div>
           </div>
  )
}

export default UserSignup;                              


