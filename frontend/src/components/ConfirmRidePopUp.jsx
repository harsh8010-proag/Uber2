import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import profileimg from '../assets/download.png'

const ConfirmRidePopUp = (props) => {
    
    let [otp,setOtp] = useState('');
    const navigate = useNavigate()
    
    const submitHandler = async (e)=>{
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
            params:{
                rideId: props.ride._id,
                otp: otp
            },
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            } 
         })  

         if(response.status === 200){
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
            navigate('/captain-riding',{state: {ride:props.ride}})
         }

    }
  return (
    <div > 
    <h5 className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => { props.setRidePopupPanel(false); }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
          <h3 className='text-2xl font-semibold mb-3'>New Ride Available</h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img
                        className='h-10 w-10 rounded-full '
                        src={profileimg} alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 flex-col justify-between items-center'>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-500'>

                        <i className="ri-map-pin-user-fill text-lg"></i>
                        <div >
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup} </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2  border-gray-500'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div >
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>

                    </div>

                    <div className='flex items-center gap-5 p-3  '>
                        <i className="text-lg  text-green-700 ri-cash-line"></i>

                        <div >
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash </p>
                        </div>

                    </div>

                    <div className='mt-6 w-full'>
                        <form onSubmit={(e)=>{
                            submitHandler(e)
                        }}>

                    <input  value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder='Enter OTP' className='text-lg bg-[#eee] px-6 py-4 text-base rounded-lg w-full mt-3 font-mono'  />
                 
                    <button type='submit' className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                    <button
                        onClick={() => { 
                         props.setConfirmRidePopupPanel(false);
                         props.setRidePopupPanel(false);
                         }}
                        className='w-full trxt-lg mt-4 bg-red-300 font-semibold p-3 rounded-lg text-gray-700'>Cancel</button>
                        </form>
                        </div>
                        
                </div>
            </div>
        </div>
  )
}

export default ConfirmRidePopUp;