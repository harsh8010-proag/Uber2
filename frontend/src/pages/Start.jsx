import React from 'react'
import { FaGripfire } from "react-icons/fa";
import bgImage from '../assets/signal.jpg';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import heroimg from '../assets/ledywithstuf.webp'
import driverimg from '../assets/driverwitpacenger.svg'
import Footer from '../components/Footer';
const Start = () => {
  return (
    <div className="min-h-screen w-full bg-cover bg-center relative">
      <div className='fixed top-0 w-full'>
        <Navbar />
      </div>
      <div className=" my-35 flex flex-col md:flex-row justify-center items-center gap-10 px-6">

        {/* Left Side */}
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Request a ride for now or later
          </h1>
          <div>
            <h3 className='text-xl font-medium text-gray-700 mb-5'>Go anywhere with Aber</h3>
            <h3 className='text-2xl font-medium text-gray-700 my-7'>Continue as User</h3>
            <Link to="/login" className=' text-lg font-medium text-center bg-black text-white p-3 rounded'>Get Started</Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src={heroimg}
            alt="Ride"
            className="w-72 sm:w-96 md:w-[400px] object-contain"
          />
        </div>

      </div>
      <div className=" mb-35 flex flex-col md:flex-row justify-center items-center gap-10 px-6">

               {/* Right Side */}
        <div className="flex justify-center">
          <img
            src={driverimg}
            alt="Ride"
            className="w-72 sm:w-96 md:w-[400px] object-contain"
          />
        </div>

         {/* Left Side */}
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-semibold leading-tight">
            Drive when you want, make what you need
          </h1>
          <div>
            <h3 className='text-xl font-medium text-gray-700  '>Make money on your schedule with rides</h3>
            <h3 className='text-3xl font-medium text-gray-700 my-7'>Continue as Driver</h3>
            <Link to="/captain-login" className=' text-lg font-medium text-center bg-black text-white p-3 rounded'>Get Started</Link>
          </div>
        </div>

      </div>
       
        <Footer/>
       
    </div>
  )
}

export default Start;
