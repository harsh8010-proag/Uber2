import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import profileimg from '../assets/download.png'
import upi from '../assets/upi.webp';

const ConfirmRidePopUp = (props) => {
    const [error, setError] = useState('')
    
    let [otp,setOtp] = useState('');
    const navigate = useNavigate();

    const profileImg = props.ride?.user.profileImage?`${import.meta.env.VITE_BASE_URL}${props.ride.user.profileImage}`:profileimg;
    
    const submitHandler = async (e)=>{
        e.preventDefault()
  
       if(!otp.trim()){
         setError('OTP required')
         return
        }
        try{

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
            params:{
                rideId: props.ride._id,
                otp: otp
            },
            withCredentials: true
         })  

         if(response.status === 200){
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
            navigate('/captain-riding',{state: {ride:props.ride}})
         }
        }catch(error){
           if (error.response && error.response.data) {
        // Exprss validator errors, display first message
        if (error.response.data.errors) {
          setError(error.response.data.errors[0].msg);
        } else if (error.response.data.message) {
          //other custome backend Error
          setError(error.response.data.message);
        } else {
          setError('unkown error occured.')
        }
      } else {
        setError('Network error');
      }
        }

    }

    const cancelRide= async()=>{
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/cancel-ride`,{
            params:{
                rideId: props.ride._id,
                
            },
           withCredentials: true
         })  

         console.log('response data',response.data);
    }

  return (
    <div > 
    <h5 className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => { props.setRidePopupPanel(false); }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
          <h3 className='text-2xl font-semibold mb-3 mt-5 text-center '>New Ride Available</h3>

            <div className='flex items-center justify-between mt-2 p-2 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img
                        className='h-10 w-10 rounded-full'
                        src={profileImg} alt="" />
                        <div>
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
                    <p className='text-sm'>{props.ride?.user.email}</p>
                    </div>  
                </div>
 
            </div>
            <div className='flex gap-2 flex-col justify-between items-center'>

                <div className='w-full mt-2'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-500'>

                        <i className="ri-map-pin-user-fill text-lg"></i>
                        <div >
                      
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup} </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2  border-gray-500'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div >
                        
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>

                    </div>
                                        <div className='flex items-center gap-5 p-3 border-b-2  border-gray-500'>
                        <i className="text-lg ri-phone-fill"></i>
                        <div >
                        
                            <p className='text-lg mt-1 text-gray-600'>{props.ride?.user?.mobileno}</p>
                        </div>

                    </div>

                    <div className='flex items-center gap-5 p-3  '>
                         {props.ride?.paymentMethod==='cash'?<i className="text-lg  text-green-700 ri-cash-line "></i>:<img src={upi} alt='upi' className='h-[40px]'/>}
     
                        <div >
                           
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            {props.ride?.paymentMethod==='cash'?<p className='text-sm -mt-1 text-gray-600'>Cash Cash </p>:''}
                        </div>

                    </div>

                    <div className='mt-6 w-full'>
                        <form onSubmit={(e)=>{
                            submitHandler(e)
                        }}>

                    <input  value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder='Enter OTP' className='text-lg bg-[#eee] px-6 py-4 text-base rounded-lg w-full mt-3 font-mono'  />
                    {error && <p className="ml-2 text-red-500 text-md">{error}</p>}
                    <button type='submit' className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg cursor-pointer'>Confirm</button>
                    <button
                        type="button"
                        onClick={() => { 
                         props.setConfirmRidePopupPanel(false);
                         props.setRidePopupPanel(false);
                         cancelRide();
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