import React, { useState } from 'react';
import { FaGripfire } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { CaptainDataContext } from '../contaxt/CaptanContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Captainsignup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFitstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileno, setMobileno] = useState('');

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const [serverError, setServerError] = useState('');
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        ...(lastName && { lastname: lastName }) 
      },
      email: email,
      password: password,
      mobileno: mobileno,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = response.data

        setCaptain(data.captain);

        localStorage.setItem('token', data.token);
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });

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
    } catch (error) {
      if (error.response && error.response.data) {
        // Exprss validator errors, display first message
        if (error.response.data.errors) {
          setServerError(error.response.data.errors[0].msg);
        } else if (error.response.data.message) {
          //other custome backend Error
          setServerError(error.response.data.message);
        } else {
          setServerError('unkown error occured.')
        }
      } else {
        setServerError('Network error');
      }
    }
  }

  return (
    <div className='min-h-screen p-2 sm:bg-gray-200  '>
      <div className='p-7 flex flex-col justify-between max-w-lg mx-auto bg-white shadow'>
        <div>
         
          <form onSubmit={(e) => {
            submitHandler(e);
          }}>
            <h3 className='font-medium mb-2'>What's our Captain's name</h3>
            <div className="flex gap-4">
              <input required
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => {
                  setFitstName(e.target.value);
                }}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-same'
              />

              <input  
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-same'

              />


            </div>
            <p className='text-xs font-semibold mb-4 text-end mr-20 p-1 text-zinc-600'>(Optional)</p>

            <h3 className='font-medium mb-2'>What's our Captain's email</h3>
            <input required
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-5 placeholder:text-same'

            />

            <h3 className='text-base font-medium mb-2'>Enter Password</h3>
            <input required

              type="password"
              placeholder='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-5 placeholder:text-same'
            />

            <h3 className='text-base font-medium mb-2'>Enter your Mobile No.</h3>
            <input
              required
              type='tel'
              value={mobileno}
              inputMode='numeric'
              maxLength={10}
              className='bg-[#eeeeee] rounded px-4 py-2 w-full text-lg mb-5 placeholder:text-sm'
              placeholder='XXXXXXXXXX'
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setMobileno(value)
              }}
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
                min='1'
                max='4'
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
            {serverError && (
              <p className="text-sm text-red-500 mb-3">{serverError}</p>
            )}

            <button
              className='bg-[#111] text-white font-semibold  px-4 py-2 mb-2 w-full cursor-pointer'
            >Create Captain Account</button>
            <p className='text-center mb-4'>Already have a account? <Link to='/captain-login' className='text-blue-600 text-lg font-semibold'>Login here</Link></p>
          </form>
        </div>


      </div>
    </div>
  );
}

export default Captainsignup;















