import React from 'react'
import upiimg from '../assets/upi.webp'
const WaitingForDriver = (props) => {
    return (
        <div>
            
              <div className='flex items-center justify-between'>
                <img 
                className='h-10'
                src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="" />
                <div>
                    <h2 className='text-lg font-medium'>{props.ride?.captain?.fullname?.firstname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain?.vehicle?.plate}</h4>
                    
                    <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
                </div>
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
                             
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>

                    </div>

                    <div className='flex items-center gap-5 p-3  '>
                          {props.paymentMethod==='cash'?<i className="text-lg  text-green-700 ri-cash-line"></i>:<img src={upiimg} alt='upi' className='h-[50px]'/>}

                        <div >
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            {props.paymentMethod==='cash'?<p className='text-sm -mt-1 text-gray-600'>Cash Cash </p>:''}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver;