import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaGripfire } from 'react-icons/fa';
import 'remixicon/fonts/remixicon.css';
import gsap from "gsap";
import {useGSAP} from '@gsap/react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import ConfirmRide from '../components/ConfirmRide';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../contaxt/SocketContext';
import UserContext, { UserDataContext } from '../contaxt/UserContext';
import LiveTracking from '../components/LiveTracking';
import { toast } from 'react-toastify';
import upi from '../assets/upi.webp'

  const home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination ] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel , setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([]);
  const [ activeField , setActiveField ] =useState(null);
  const [ vehicleType, setVehicleType] =useState('');
  const [fare,setFare] =useState({});
  const [ride,setRide] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [pendingRide,setPendingRide] = useState('')

  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef= useRef(null);
  const panelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  
  const navigate = useNavigate();
  const {socket} =useContext(SocketContext);
  const { user } =useContext(UserDataContext);
 

  useEffect(()=>{
    socket.emit("join",{userType:"user",userId:user._id});
  },[ user ]);

   

  useEffect(()=>{
   checkPendingPayment()
  },[]);


  useEffect(() => {

  socket.on('ride-confirmed', (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on('ride-started', (ride) => {
    setWaitingForDriver(false);
    navigate('/ongoing', { state: { ride } });
  });

  socket.on('ride-canceled', (ride) => {
    toast.error(
      "Driver canceled the ride. Searching for another driver..."
    );

    setWaitingForDriver(false);
    setVehicleFound(true);
  });

socket.on('ride-ended',()=>{
     
       checkPendingPayment()
    })
   
  return () => {
    socket.off('ride-confirmed');
    socket.off('ride-started');
    socket.off('ride-canceled');
    socket.off('ride-pending')
  };

}, [socket, navigate]);

  const checkPendingPayment = async()=>{
    const res =await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/pending-payment`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    //  console.log('pending method',res.data.pending);
    if(res.data.pending){
      
      setPendingRide(res.data.ride);
    }
  }

    

                 
       
  
const handlePickupChange = async (e) => {
        setPickup(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
      setDestination(e.target.value);
      try {
           const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
              params: { input: e.target.value },
              headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
           
        } catch(err) {
          console.log(err);
        }
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
       

    },[vehiclePanel]);

     
    
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
       

    },[ waitingForDriver]);

    
 async function findTrip(){

if (!pickup.trim() || !destination.trim()) {
  toast.error("Both locations are required.");
  return;
}

   const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
    {params:{pickup, destination},
     headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
     }})
     
     setFare(response.data);

     setVehiclePanel(true);
   setPanelOpen(false)
 } 

 async function createRide(){
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
    pickup,
    destination,
    vehicleType,
    paymentMethod
  },{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('token')}`                 
    }
  })
 }

 const handlePayment=async()=>{
 await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/pay`,{
       rideId:pendingRide._id      
        },{
    headers:{
      Authorization : `Bearer ${localStorage.getItem('token')}`                 
    }
  });
        toast.success('Payment Successful');
        setPendingRide('');
 }
  
  return (
    <div className='h-screen relative overflow-hidden'>      
      {pendingRide && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    {/* Popup Box */}
    <div className="bg-white rounded-lg p-5 w-[90%] max-w-sm shadow-xl">
      
      <p className="text-center font-semibold text-lg  text-zinc-600">
        Pending Payment
      </p>

      <div className="flex items-center gap-5 p-3 border-b-2">
        <img src={upi} alt="upi" className="h-[40px]" />
        <div>
          <h3 className="text-lg font-medium">₹{pendingRide?.fare}</h3>
        </div>
      </div>

   <div className='flex items-center gap-5 p-3 border-b-2'>
    <i className="text-lg ri-map-pin-2-fill"></i>
       <div>
        <p className='text-sm -mt-1 text-gray-600'>{pendingRide?.destination}</p>
        </div>
    </div>
<p className='text-sm text-zinc-500'>Your ride is completed. Please make the payment.</p>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-lg text-white font-semibold rounded-lg w-full mt-4 py-2"
      >
        Pay
      </button>

    </div>
  </div>
)}
      <div className="logo flex text-2xl items-center absolute bg-gray-300/60  m-5 px-2 rounded-[5px] z-1">
              <FaGripfire className=' text-red-500 '/>
              <h1 className='inter-harsh2  text-orange-500 '>
                A<span className='text-black'>ber</span>
              </h1>
            </div>
      <div className="h-screen w-full">
        
        
       <LiveTracking/>
  
       </div>
       <div className='flex flex-col justify-end h-full absolute top-0 w-full z-1 '>
       
       <div className='h-[30%] p-6 bg-white relative  '>
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
               <div className="line absolute h-16 w-1 top-[60%] -translate-y-1/2 left-5 bg-gray-700 rounded-full">
               </div>
          <input className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
          onClick={()=>{
             setPanelOpen(true);
             setActiveField('pickup');
          }}
            onChange={handlePickupChange}
            value={pickup}
           type='text' placeholder='Add a pick-up location'/>
          
          <input 
          onClick={()=>{
          setPanelOpen(true)
          setActiveField('destination')
          }}
        
          onChange={handleDestinationChange}
          value={destination}
          className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
          type='text' 
          placeholder='Enter your destination'
          />

        </form>
        <button 
        onClick={findTrip}
        className='bg-black text-white px-4 py-2 rounded-lg mt-3  w-full'>
          Find Trip
          </button> 

       </div>

       <div 
       ref={panelRef}
       className='bg-white h-0 '>
         <LocationSearchPanel 
          suggestions = {activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
          vehiclePanel={vehiclePanel} 
          setPanelOpen={setPanelOpen}
          setVehiclePanel={setVehiclePanel}
          setDestination={setDestination}
          setPickup={setPickup}
          activeField={activeField}
           />
       </div>
       
       </div>
            
          <div 
          ref={vehiclePanelRef}
            className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full'>
            <VehiclePanel 
            setVehiclePanel={setVehiclePanel}
            selectVehicle={setVehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            fare={fare}
             />
          </div>
                <div 
          ref={confirmRidePanelRef}
           className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
            <ConfirmRide 
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare = {fare}
            vehicleType ={vehicleType}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            setConfirmRidePanel={setConfirmRidePanel} 
            setVehicleFound={setVehicleFound}
             />

          </div>

                <div  
                ref={vehicleFoundRef}     
             className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-full'>
             <LookingForDriver 
             pickup={pickup}
             destination={destination}
             fare = {fare}
             vehicleType ={vehicleType}
             paymentMethod={paymentMethod}
             setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver}/>
          </div>

             <div  
             ref={WaitingForDriverRef}       
             className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 '>
            <WaitingForDriver 
            ride={ride}
            paymentMethod={paymentMethod}
            setWaitingForDriver={setWaitingForDriver}/>
          </div>

    </div>
  )
}

export default home;