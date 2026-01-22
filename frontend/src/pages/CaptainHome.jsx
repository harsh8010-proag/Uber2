import React, { useContext, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { FaGripfire } from 'react-icons/fa';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import gsap from "gsap";
import {useGSAP} from '@gsap/react';
import ConfirmRide from '../components/ConfirmRide';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { SocketContext } from '../contaxt/SocketContext';
import { CaptainDataContext } from '../contaxt/CaptanContext';
import axios from 'axios';

const CaptainHome = () => {
 
  const [RidePopUpPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel,setConfirmRidePopupPanel]=useState(false);
  const [ ride, setRide ] =useState(null);
 
  const RidePopUpPanelRef = useRef(null);
  const ConfirmRidePopupPanelRef = useRef(null);

  const {socket} = useContext(SocketContext);
  const {captain} = useContext(CaptainDataContext);
 

useEffect(() => {
 

  socket.emit('join', {
    userId: captain._id,
    userType: 'captain',
     
  });


  const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
            
        }
  const locationInterval = setInterval(updateLocation,10000);
  updateLocation();

  socket.on('new-ride', (data) => {
    
    setRide(data);
    setRidePopupPanel(true);
  });

}, []);


async function confirmRide(){
     
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
    rideId: ride._id,
    captain: captain._id,
  },{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
  
   
}


  useGSAP(function(){
        if(RidePopUpPanel){
            gsap.to(RidePopUpPanelRef.current,{
              transform:'translateY(0)'
            })
          }else{
           gsap.to(RidePopUpPanelRef.current,{
              transform:'translateY(100%)'}
           ) 
          }  
      },[RidePopUpPanel]);
  
       useGSAP(function(){
        if(confirmRidePopupPanel){
            gsap.to(ConfirmRidePopupPanelRef.current,{
              transform:'translateY(0)'
            })
          }else{
           gsap.to(ConfirmRidePopupPanelRef.current,{
              transform:'translateY(100%)'}
           ) 
          }  
      },[confirmRidePopupPanel]);
          
  return (
    <div className='h-screen'>
      <div className='flex w-full items-center justify-between  fixed'>
        <div className="logo flex text-2xl items-center  bg-gray-300/60  m-2 px-2 rounded-[5px]">
          <FaGripfire className=' text-red-500 ' />
          <h1 className='inter-harsh2  text-orange-500 '>
            A<span className='text-black'>ber</span>
          </h1>
        </div>
        <Link to={'/captain-home'} className='m-2 text-white  h-10 w-10 bg-gray-700/70 flex items-center justify-center rounded-full'>
          <i className="text-lg ri-home-4-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className='h-full w-full object-cover'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
      </div>

      <div className='h-2/5 p-6'>
      <CaptainDetails/>
      </div>
      
      <div
      ref={RidePopUpPanelRef}
      className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full '> 
       <RidePopUp 
       ride={ride}
       setRidePopupPanel={setRidePopupPanel}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        confirmRide={confirmRide}
        />
      </div>

       <div
      ref={ConfirmRidePopupPanelRef}
      className='fixed w-full z-10 h-screen bottom-0 bg-white px-3 py-10 pt-12  '> 
       <ConfirmRidePopUp
       ride={ride}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
         setRidePopupPanel={setRidePopupPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome;