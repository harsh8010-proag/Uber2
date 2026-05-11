import React, { useContext, useState } from 'react'
// import { FaGripfire } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { SocketContext } from '../contaxt/SocketContext';
import LiveTracking from '../components/LiveTracking';
import upi from '../assets/upi.webp';
// import { ToastContainer, toast } from "react-toastify";
// import MakePayment from '../components/makePayment';
import axios from 'axios';
import { useEffect } from 'react';
 
 

const Ongoing = () => {

    const location   = useLocation();
    const { ride }   = location.state;
    const { socket } =useContext(SocketContext);
  
    const navigate = useNavigate();
 

    useEffect(() =>{

 const checkRidesStatus = async ()=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/active`,
        {withCredentials:true});
        
        if(!response.data.active){
            navigate('/riding',{ state: { ride } });
        }
    } catch (err) {
        console.log(err);
    }
 }
 
 const interval = setInterval(checkRidesStatus,5000);

         socket.on('ride-ended',()=>{
        navigate('/riding',{ state: { ride } });
       
    })

    return ()=>{
        socket.off('ride-ended');
        clearInterval(interval);
    }
    },[])


    

  return (
   <div className='h-screen relative  bg-zinc-200  '>
  
            <div className='h-1/2  '>
               {/* <div className='flex w-full items-center justify-end fixed z-50 top-[50px]'>
                      
                        <Link to={'/home'} className='m-2 text-white  h-10 w-10 bg-gray-700/70 flex items-center justify-center rounded-full '>
                          <i className="text-lg font-medium ri-home-5-line"></i>
                        </Link>
                      </div> */}
                      <div className="h-5/5  ">
                       <LiveTracking/>
                      </div>

            </div>
            <div className=' h-1/2 px-6 flex flex-col justify-center bg-white shodow '>
            
               <p className='text-2xl text-green-700'>Ride Started <i className="ri-record-circle-line text-lg"></i></p>   
                <div className='flex items-center justify-between  '>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold mt-1 mb-1'>{ride?.captain.vehicle.plate}</h4>
                        <h4 className='text-xl font-semibold mt-1 mb-1 text-zinc-600'><i className="ri-phone-fill text-black"></i>   {ride?.captain.mobileno}</h4>

                    </div>
                </div>

                <div className='flex  justify-between flex-col items-center'>
                    <div className='w-full mt-2'>

                        <div className='flex items-center gap-5 p-2 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                               
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-2 border-b-2'>
                            {ride?.paymentMethod==='cash'?<i className="text-lg  text-green-700 ri-cash-line "></i>:<img src={upi} alt='upi' className='h-[40px]'/>}
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                                {ride?.paymentMethod==='cash'?<p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>:''}
                            </div>
                        </div>
                          
                            <div>
                                <p className='text-green-700 text-lg'>Ride in Progrese...</p>
                            </div>
                          
                    </div>
                </div>
               
            </div>
            <div >
                 
            </div>
        </div>
  )
}

export default Ongoing;