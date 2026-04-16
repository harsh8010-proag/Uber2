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
import LiveTracking from '../components/LiveTracking';
import profile from '../assets/download.png';



const CaptainHome = () => {
 
  const [RidePopUpPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel,setConfirmRidePopupPanel]=useState(false);
  const [ ride, setRide ] =useState(null);
 
  const RidePopUpPanelRef = useRef(null);
  const ConfirmRidePopupPanelRef = useRef(null);
  const rideRef = useRef(null);

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

  socket.on('new-ride',(data)=>{
   const currentRide = rideRef.current;

  if(currentRide && currentRide.status !== 'pending'){
          return;
  }
   
    setRide(data);
    setRidePopupPanel(true);

  });

socket.on('ride-auto-cancelled',()=>{
      setRidePopupPanel(false);
      
    });
  checkCurrentRide();
 
 return () => {
    socket.off('new-ride');
     console.log("Ignoring new ride, captain busy");
  };
}, []);



useEffect(() => {

 rideRef.current = ride;
  socket.on('ride-taken', (data) => {

      if (ride?._id === data.rideId) {
          setRidePopupPanel(false);           
      }

  });



}, [ride]);
 
  async function checkCurrentRide(){  
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/captain-current-ride`,{
       
   withCredentials: true

      });
      const rideData = response.data;
     
      setRide(rideData);
     
      if(rideData.status === 'pending'){  
        setRidePopupPanel(true);
      }
      if(rideData.status === 'accepted'){
        setConfirmRidePopupPanel(true);
      }
    }catch(err){
      console.log('No active ride',err)
    }
  }
 
async function confirmRide(){
     
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
    rideId: ride._id,
    captain: captain._id,
  },{
    
   withCredentials: true

  })
   
  if(response.status === 200){
    
    setRide(response.data);
 
    setConfirmRidePopupPanel(true)
    setRidePopupPanel(false)

  }
   
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
      <div className='flex w-full items-center justify-between  fixed z-50'>
        <div className="logo flex text-2xl items-center  bg-gray-300/60  m-2 px-2 rounded-[5px] ">
          <FaGripfire className=' text-red-500 ' />
          <h1 className='inter-harsh2  text-orange-500 '>
            A<span className='text-black'>ber</span>
          </h1>
        </div>
        
      </div>
      <div className="h-3/5">
      <LiveTracking/>
      </div>

      <div className='min-h-2/5 p-6 bg-zinc-100 '>
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
      className='fixed w-full z-10 min-h-screen bottom-0 bg-white px-3 py-10 pt-12  '> 
       <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome;