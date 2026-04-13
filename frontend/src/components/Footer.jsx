 import React from 'react'
import { Link } from 'react-router-dom';
 
 const Footer = () => {
   return (
    <div className='bg-black text-white   bottom-0 w-full'>
     <div className='flex justify-around  p-15'>
        <div className='flex flex-col gap-5'>
            <h2 className='text-lg font-semibold'>Company</h2>
            <Link className='text-md font-semibold'>About us</Link>
        </div>
        <div className='flex flex-col gap-5'>
            <h2 className='text-lg font-semibold'>Products</h2>
            <Link className='text-md font-semibold' to='/login'>Ride</Link>
            <Link className='text-md font-semibold'  to='/captain-login'>Drive</Link>

        </div>
     </div>
 <p className='text-center text-sm p-2'>© 2026 Arambh Group</p>
     </div>
   )
 }
 
 export default Footer;