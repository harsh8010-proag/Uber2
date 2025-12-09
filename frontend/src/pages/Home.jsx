import React from 'react'
import { FaGripfire } from "react-icons/fa";
import bgImage from '../assets/signal.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="pt-5 h-screen w-full flex justify-between flex-col bg-cover bg-center "
      style={{ backgroundImage: `url(${bgImage})`
     }}
    >
      <div className="logo flex items-center    ">
        <FaGripfire className='text-[35px] text-red-500 '/>
        <h1 className='inter-harsh2 text-[35px] text-orange-500 '>
          A<span className='text-black'>ber</span>
        </h1>
      </div>

      <div className='bg-white/30 backdrop-blur-md p-4 rounded-xl flex flex-col'>
        <h2 className='text-3xl font-bold'>Get Started with Aber</h2>
        <Link to="/login" className='flex items-center justify-center text-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>
      </div>
    </div>
  )
}

export default Home;
