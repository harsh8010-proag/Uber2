import React, { useState } from 'react'
import { FaGripfire } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <div>
    <div className='flex flex-wrap h-[60px] bg-black text-white flex items-center justify-between px-8 '>
      <div className='flex items-center gap-8'>
        <div className="logo flex text-2xl items-center cursor-pointer " onClick={()=>navigate('/')}>
          <FaGripfire className=' text-red-500 '/>
          <h1 className='inter-harsh2  text-orange-500 '>
            A<span className='text-white '>ber</span>
          </h1>
        </div>
        <div className='hidden md:block'>
      <Link to='/login' className='text-md font-semibold p-2 rounded-xl hover:bg-gray-200/20 active:bg-gray-200/40'>Ride</Link>
      <Link to='/captain-login' className='text-md font-semibold p-2 rounded-xl hover:bg-gray-200/20 active:bg-gray-200/40'>Drive</Link>
      <Link to='/about' className='text-md font-semibold p-2 rounded-xl hover:bg-gray-200/20 active:bg-gray-200/40'>About</Link>
      </div>
      </div>

      <div className='hidden md:flex items-center gap-8'>
      <Link to='/help' className='text-md font-semibold p-2 rounded-xl hover:bg-gray-200/20 active:bg-gray-200/40'>Help</Link>
 
      <Link to="/login"  className='text-md font-semibold p-2 px-3 rounded-xl bg-white text-black hover:bg-gray-100/90 active:bg-gray-100/80'>Log in</Link>
      
      </div>
      <div className='md:hidden  text-2xl p-1 px-2 rounded hover:bg-gray-200/20 active:bg-gray-200/40 cursor-pointer' onClick={()=> setOpen(!open)}>
        <div
    className={`transition-all duration-3000 ease-in-out transform ${
      open ? "rotate-180 scale-110 opacity-100" : "rotate-0 scale-100 opacity-100"
    }`}
  ></div>
        {open?<div className='font-semibold'>X</div>:<i className="ri-menu-line "></i>}
      </div>
     
    </div>
    <div>
      {open&&(
      <ul className='flex flex-col text-2xl font-semibold md:hidden bg-black text-white p-2'>
        <Link to='/login' className='text-md font-semibold p-2 rounded-xl hover:bg-gray-200/20 active:bg-gray-200/40'>Ride</Link>
      <Link to='/captain-login' className='text-md font-semibold p-2 rounded-xl hover:bg-gray-200/20 active:bg-gray-200/40'>Drive</Link>
      <Link to='/about' className='text-md font-semibold p-2 rounded-xl hover:bg-gray-200/20 active:bg-gray-200/40'>About</Link>
      <Link to='/help' className='text-md font-semibold p-2 rounded-xl hover:bg-gray-200/20 active:bg-gray-200/40'>Help</Link>
         
      </ul>)}
    </div>
    </div>
  )
}

export default Navbar;