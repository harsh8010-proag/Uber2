import React from 'react'
import upiimg from '../assets/upi.webp'
const LookingForDriver = (props) => {

      let vehicleimage='';
  if(props.vehicleType === 'car'){
    vehicleimage='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n'
  }else if(props.vehicleType === 'moto'){
    vehicleimage='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n'
   }else{
     vehicleimage='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n'
   }  

    return (
        <div>
            < h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false);
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-3'>Looking for a driver</h3>
            <div className='flex gap-2 flex-col justify-between items-center'>
                <img
                    className='h-20'
                    src={vehicleimage} alt={props.vehicleType} />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-500'>

                        <i className="ri-map-pin-user-fill text-lg"></i>
                        <div >
                            
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup} </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2  border-gray-500'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div >
                            
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>

                    </div>

                    <div className='flex items-center gap-5 p-3  '>
                        
                        {props.paymentMethod==='cash'?<i className="text-lg  text-green-700 ri-cash-line"></i>:<img src={upiimg} alt='upi' className='h-[50px]'/>}
                      
                        <div >
                            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                            {props.paymentMethod==='cash'?<p className='text-sm -mt-1 text-gray-600'>Cash Cash </p>:''}
                            
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default LookingForDriver