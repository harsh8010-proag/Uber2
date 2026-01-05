import React, { useRef, useState } from 'react';
import { FaGripfire } from 'react-icons/fa';
import 'remixicon/fonts/remixicon.css';
import gsap from "gsap";
import {useGSAP} from '@gsap/react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination ] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel , setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);

  const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef= useRef(null);
  const panelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  

  
  const handleDestinationChange = async (e) =>{
                  setDestination(e.target.value);
   }

     const handlePickupChange = async (e) =>{
                  setPickup(e.target.value);
   }
      const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function(){
      if(panelOpen){
        gsap.to(panelRef.current,{
          height:'70%',
          padding: 24
          // opacity
        })
        gsap.to(panelCloseRef.current,{
          opacity:1
        })
      }else{
        gsap.to(panelRef.current,{
          height: '0%',
          padding: 0
        })
        gsap.to(panelCloseRef.current,{
          opacity: 0
        })
      }
    },[panelOpen])

    
    useGSAP(function(){
      if(vehiclePanel){
          gsap.to(vehiclePanelRef.current,{
            transform:'translateY(0)'
          })
        }else{
         gsap.to(vehiclePanelRef.current,{
            transform:'translateY(100%)'}
         ) 
        }
       

    },[vehiclePanel])

     
    
    useGSAP(function(){
      if(confirmRidePanel){
          gsap.to(confirmRidePanelRef.current,{
            transform:'translateY(0)'
          })
        }else{
         gsap.to(confirmRidePanelRef.current,{
            transform:'translateY(100%)'}
         ) 
        }
    },[confirmRidePanel]);

    
    
    useGSAP(function(){
      if(vehicleFound){
          gsap.to(vehicleFoundRef.current,{
            transform:'translateY(0)'
          })
        }else{
         gsap.to(vehicleFoundRef.current,{
            transform:'translateY(100%)'}
         ) 
        }
       

    },[ vehicleFound]);

useGSAP(function(){
      if(waitingForDriver){
          gsap.to(WaitingForDriverRef.current,{
            transform:'translateY(0)'
          })
        }else{
         gsap.to(WaitingForDriverRef.current,{
            transform:'translateY(100%)'}
         ) 
        }
       

    },[ vehicleFound]);

 
 
  
  return (
    <div className='h-screen relative overflow-hidden'>      
     
      <div className="logo flex text-2xl items-center absolute bg-gray-300/60  m-5 px-2 rounded-[5px]">
              <FaGripfire className=' text-red-500 '/>
              <h1 className='inter-harsh2  text-orange-500 '>
                A<span className='text-black'>ber</span>
              </h1>
            </div>
      <div className="h-screen w-full">
        
        
        <img className='h-full w-full object-cover' 
              src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif">
                
              </img>
  
       </div>
       <div className='  flex flex-col justify-end h-screen absolute top-0 w-full'>
       
       <div className='h-[30%] p-6 bg-white relative'>
        <h5 ref={panelCloseRef} onClick={()=>{
          setPanelOpen(false);
        }} 
        className='absolute opacity-0 right-6 top-6 text-2xl'
         >
         <i className="ri-arrow-down-wide-line"></i>
         </h5>

         <h4 className='text-3xl font-semibold'>Find a trip</h4>
        <form className='relative py-3 ' onSubmit={(e) =>{
               submitHandler(e);
        }}>
               <div className="line absolute h-16 w-1 top-[60%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
          <input className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
          onClick={()=>{
            setPanelOpen(true)}}
            onChange={handlePickupChange}
            value={pickup}
           type='text' placeholder='Add a pick-up location'/>
          
          <input 
          onClick={()=>{
          setPanelOpen(true)}}
          onChange={handlePickupChange}
          value={pickup}
          className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
          type='text' placeholder='Enter your destination'/>

        </form>
       </div>

       <div 
       ref={panelRef}
       className='bg-white h-0'>
         <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel}/>
       </div>
       
       </div>
            
          <div 
          ref={vehiclePanelRef}
          className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
            <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel}/>
          </div>
                <div 
          ref={confirmRidePanelRef}
          className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
            <ConfirmRidePopUp setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
          </div>

                <div  
                ref={vehicleFoundRef}     
          className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
            <LookingForDriver setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver}/>
          </div>

             <div  
             ref={WaitingForDriverRef}       
          className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 '>
            <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
          </div>

    </div>
  )
}

export default home;