import React, { useState } from 'react';
import { FaGripfire } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { CaptainDataContext } from '../contaxt/CaptanContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Captainlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData, {
        withCredentials: true
      });


      if (response.status === 200) {
        const data = response.data;
        // setCaptain(data.captain);


        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        navigate('/captain-home');
      }

      setEmail('');
      setPasword('');
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
    <div className='h-screen  sm:bg-gray-200  '>
      <div className="flex items-center justify-between p-2 mb-5 bg-white shadow">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <i className="ri-arrow-left-line text-xl font-bold" />
        </button>
        <h1 className="text-lg font-semibold">Driver Sign in</h1>
        <div className="w-10" />
      </div>



      <div className='py-7 px-5 flex flex-col h-auto justify-between max-w-lg mx-auto bg-white shadow rounded-lg'>
        <div>
          <div className="logo flex items-center mb-10">
            <FaGripfire className='text-[35px] text-red-500 ' />
            <h1 className='inter-harsh2 text-[35px] text-orange-500'>
              A< span className='text-black' >ber</span >
            </h1>
            <FaArrowRight className='relative top-10 right-25 text-[20px]' />
          </div>

          <div className='flex flex-row  gap-5 mb-3 rounded-lg bg-zinc-100/60  p-2 '>
            <img
              className='h-20'
              src="https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2024/09/184759carbon700x350-17265572905967.png " alt="Driver" />
            <div>
              <h3 className='text-2xl font-semibold text-gray-700'>Sign in as Driver</h3>
              <p className='text-xl'>Start earning with your vehicle</p>
            </div>
          </div>
          <form onSubmit={(e) => {
            submitHandler(e);
          }}>
            <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
            <input required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-5 placeholder:text-base'
              type="email"
              placeholder='Enter your email'
            />

            <h3 className='font-medium text-lg mb-2'>Enter Password</h3>
            <input required
              value={password}
              onChange={(e) => {
                setPasword(e.target.value);
              }}
              className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-7 placeholder:text-base'
              type="password"
              placeholder='password' />

            {serverError && (
              <p className="text-sm text-red-500 mb-3">{serverError}</p>
            )}
            <div className='flex justify-end items-center gap-5'>

              <Link to='/captain-signup' className='text-blue-600 text-md font-semibold'>Create Account</Link>
              <button
                className='bg-[#111] text-white font-semibold  px-4 py-2  cursor-pointer rounded-lg'
              >Log in</button>
            </div>
          </form>
        </div>



      </div>
    </div>
  )
}

export default Captainlogin;