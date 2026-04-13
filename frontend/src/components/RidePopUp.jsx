import React from 'react'
import profileimg from '../assets/download.png'
import upi from '../assets/upi.webp';

const RidePopUp = (props) => {

const profileImg = props.ride?.user.profileImage?`${import.meta.env.VITE_BASE_URL}${props.ride.user.profileImage}`:profileimg;
 
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => { props.setRidePopupPanel(false); }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-3'>New Ride Available</h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img
                        className='h-10 w-10 rounded-full '
                        src={profileImg} alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.0 KM</h5>
            </div>
            <div className='flex gap-2 flex-col justify-between items-center'>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-500'>

                        <i className="ri-map-pin-user-fill text-lg"></i>
                        <div >
                   
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2  border-gray-500'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div >
                        
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination} </p>
                        </div>

                    </div>

                    <div className='flex items-center gap-5 p-3  '>
                          {props.ride?.paymentMethod ==='cash'?<i className="text-lg  text-green-700 ri-cash-line "></i>:<img src={upi} alt='upi' className='h-[40px]'/>}

                        <div >
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                             {props.ride?.paymentMethod==='cash'?<p className='text-sm -mt-1 text-gray-600'>Cash Cash </p>:''}
                        </div>

                    </div>

                    <div className='flex items-center justify-between'>

                         <button
                        onClick={() => {
                            props.setRidePopupPanel(false)
                        }}
                        className='mt-4 bg-gray-300 font-semibold p-3 px-10 rounded-lg text-gray-700 cursor-pointer'>Ignore</button>


                    <button

                        onClick={() => {
                         
                            props.confirmRide();
                        }}
                        className='mt-5 bg-green-600 font-semibold p-3 px-10 rounded-lg text-white cursor-pointer'>Accept</button>

                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp;