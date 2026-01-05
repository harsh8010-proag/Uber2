import React, { useState } from 'react';
import { FaGripfire } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { CaptainDataContext } from '../contaxt/CaptanContext';
import axios from 'axios';

const Captainsignup = () => {

    const [ email,setEmail] = useState('');
    const [ password, setPassword ]= useState('');
    const [ firstName, setFitstName ] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ userData, setUserData] = useState('');

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const { captain, setCaptain } = React.useContext(CaptainDataContext);
  
    const navigate = useNavigate();

    const submitHandler = async(e) =>{
        e.preventDefault();
  
       const captainData ={
          fullname:{
            firstname:firstName,
            lastname:lastName
          },
          email:email,
          password:password,
          vehicle:{
            color:vehicleColor,
            plate:vehiclePlate,
            capacity:vehicleCapacity,
            vehicleType:vehicleType
          }
        }
   
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData);

    if(response.status === 201){
      const data = response.data
      setCaptain(data.captain);
      localStorage.setItem('token',data.token);
      navigate('/captain-home');
    }
    console.log(userData);
        setEmail('');
        setFitstName('');
        setLastName('');
        setPassword('');
        setVehicleColor('');
        setVehicleCapacity('');
        setVehiclePlate('');
        setVehicleType('');
       }

  return (

    <div className='p-7 flex flex-col justify-between'>
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
                     <h3 className='font-medium mb-2'>What's our Captain's name</h3>
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
    
                       <h3 className='font-medium mb-2'>What's our Captain's email</h3>
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
                    
                        <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
               <option value="moto">Moto</option>
              <option value="auto">Auto</option>
             
            </select>
          </div>


                       <button
                       className='bg-[#111] text-white font-semibold  px-4 py-2 w-full '
                       >Create Captain Account</button>
                   <p className='text-center mb-10'>Already have a account?<Link to='/captain-login' className='text-blue-600 '>Login here</Link></p> 
                   </form>
                   </div>
           
                   <div>
                     <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
                   </div>
               </div>
  );
}

export default Captainsignup;