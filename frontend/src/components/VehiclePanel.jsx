import React from 'react'

const VehiclePanel = (props) => {

 
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
             props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-3'>Choose a Vehicle</h3>
             <div 
             onClick={()=>{
                props.setConfirmRidePanel(true);
                props.selectVehicle('car')
             }}
             className='flex border-2  border-gray-300 active:border-black mb-2 rounded-xl items-center justify-between p-3 '>
                <img
                 className='h-12'
                 src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="car" />
                 <div className=' w-1/2'> 
                  <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
               <h2 className='text-lg font-semibold'>₹{props.fare['car']}</h2>
             </div>
             <div
               onClick={()=>{
                props.setConfirmRidePanel(true);
                props.selectVehicle('moto')
             }}
              className='flex border-2 border-gray-300 active:border-black mb-2 rounded-xl items-center justify-between p-3 '>
                <img
                 className='h-12'
                 src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="moto" />
                 <div className='ml-2 w-1/2'> 
                  <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>1</span></h4>
                  <h5 className='font-medium text-sm'>2  mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
                </div>
               <h2 className='text-lg font-semibold'>₹{props.fare['moto']}</h2>
             </div>
             <div 
             onClick={()=>{
                props.setConfirmRidePanel(true);
                props.selectVehicle('auto')
             }}
             className='flex border-2 border-gray-300 active:border-black mb-2 rounded-xl items-center justify-between p-3 '>
                <img
                 className='h-12'
                 src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="auto" />
                 <div className=' w-1/2'> 
                  <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>3</span></h4>
                  <h5 className='font-medium text-sm'>2 mins away</h5>
                  <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
                </div>
               <h2 className='text-lg font-semibold'>₹{props.fare['auto']}</h2>
             </div>
    </div>
  )
}

export default VehiclePanel