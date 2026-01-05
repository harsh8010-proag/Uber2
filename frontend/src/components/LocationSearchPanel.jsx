import React from 'react'

const LocationSearchPanel = (props) => {
    // sample array for location
     
    const locations =[
        "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
        "24B, Near patil's snacj, Shivchatrpati college, chatrpatiSambhajinagar",
        "24B, Near Kapoor's cafe, Sheryians Coding School, konkan"
    ]

  return(
    <div>
        {/* this is just sampledata */}
{ locations.map((location,index)=>
 <div 
 onClick={()=>{
    props.setVehiclePanel(true)
 }}
 key={index} className='flex gap-4 border-2  border-gray-100 active:border-black p-3 rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-8  w-12 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{location}</h4>
        </div>
)}
       
          
        
    </div>
  )
}

export default LocationSearchPanel;