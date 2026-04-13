import React from 'react'
import { useNavigate } from 'react-router-dom';
import upi from '../assets/upi.webp';
import dprofile from '../assets/download.png'
import axios from 'axios';

const FinishRide = (props) => {

    const navigate = useNavigate();

    async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
        rideId: props.ride._id
    },{
        withCredentials: true
    })    
 
    if(response.status === 200){
        navigate('/captain-home')
    }
     
    }
const profileImg = props.ride?.user.profileImage?`${import.meta.env.VITE_BASE_URL}${props.ride.user.profileImage}`:dprofile;

  return (
    <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setFinishRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
            <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src={profileImg} alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
                </div>
              
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-phone-fill"></i>
                        <div>
                 
                            <p className='text-md   text-gray-600'>{props.ride?.user.mobileno}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                 
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                       
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                    {props.ride?.paymentMethod==='cash'?<i className="text-lg  text-green-700 ri-cash-line "></i>:<img src={upi} alt='upi' className='h-[40px]'/>}
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
                            {props.ride?.paymentMethod==='cash'?<p className='text-sm -mt-1 text-gray-600'>Cash Cash </p>:''}
                        </div>
                    </div>
                </div>

                <div className='mt-10 w-full'>

                    <button
                        onClick={endRide}
                        className='w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg cursor-pointer'>Finish Ride</button>


                </div>
            </div>
        </div>
  )
}

export default FinishRide