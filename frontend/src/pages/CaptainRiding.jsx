import React, { useState } from 'react'
import { FaGripfire } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import FinishRide from './FinishRide';
import { useRef } from 'react';
import gsap from "gsap";
import {useGSAP} from '@gsap/react';

const CaptainRiding = () => { 

  const [finishRidePanel,setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(function(){
      if(finishRidePanel){
          gsap.to(finishRidePanelRef.current,{
            transform:'translateY(0)'
          })
        }else{
         gsap.to(finishRidePanelRef.current,{
            transform:'translateY(100%)'}
         ) 
        }
       

    },[ finishRidePanel]);

  return (
   <div className='h-screen'>
        <div className='flex w-full items-center justify-between  fixed'>
          <div className="logo flex text-2xl items-center  bg-gray-300/60  m-2 px-2 rounded-[5px]">
            <FaGripfire className=' text-red-500 ' />
            <h1 className='inter-harsh2  text-orange-500 '>
              A<span className='text-black'>ber</span>
            </h1>
          </div>
          <Link to={'/home'} className='m-2 text-white  h-10 w-10 bg-gray-700/70 flex items-center justify-center rounded-full'>
            <i className="text-lg ri-logout-box-r-line"></i>
          </Link>
        </div>
        <div className="h-4/5">
        
          <img
            className='h-full w-full object-cover'
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
        </div>
  
        <div 
        onClick={()=>{
          setFinishRidePanel(true);
        }}
        className='h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative'>

        <h5 className='p-1 text-center w-[95%] absolute top-0'
                onClick={() => {  }}><i className="text-3xl text-orange-500 ri-arrow-up-wide-line"></i></h5>

        <h4 className='text-xl font-semibold'>4 KM away</h4>        
        <button 
        className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
        </div>
        
          <div
      ref={finishRidePanelRef}
      className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full '> 
       <FinishRide setFinishRidePanel={setFinishRidePanel}  />
      </div>

  
        
      </div>
  )
}

export default CaptainRiding;