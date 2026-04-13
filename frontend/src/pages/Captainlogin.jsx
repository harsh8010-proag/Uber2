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
              src="data:image/jpeg;base64,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 " alt="Driver" />
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