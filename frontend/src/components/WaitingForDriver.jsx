import React from 'react'
import upiimg from '../assets/upi.webp'
import profile from '../assets/download.png'

const WaitingForDriver = (props) => {

  let  captain = props.ride?.captain
   
 const currentAvatar = captain?.profileImage
  ? `${import.meta.env.VITE_BASE_URL}${captain.profileImage}`
  : profile;
                                                                                
   
    return (

            <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-md mx-auto ">

  {/* Top Section (Driver Info) */}
  <div className="flex items-center justify-between">

    {/* Profile Image */}
    <img
      className="h-14 w-14 rounded-full object-cover border"
      src= {currentAvatar}
      alt="driver"
    />

    {/* Driver Details */}
    <div className="flex-1 ml-4">
      <h2 className="text-lg font-semibold">
        {props.ride?.captain?.fullname?.firstname}
      </h2>
      <p className="text-lg text-gray-500">
        <i className="ri-phone-fill"></i> {props.ride?.captain?.mobileno || "Not Available"}
      </p>
    </div>

    {/* Vehicle + OTP */}
    <div className="text-right">
      <h4 className="text-lg font-bold">
        {props.ride?.captain?.vehicle?.plate}
      </h4>
      <span className="bg-black text-white px-2 py-1 rounded text-sm">
        OTP: {props.ride?.otp}
      </span>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t my-4"></div>

  {/* Ride Details */}
  <div className="space-y-4">

    {/* Pickup */}
    <div className="flex items-start gap-4">
      <i className="ri-map-pin-user-fill text-xl  "></i>
      <p className="text-sm text-gray-700 bl">
        {props.ride?.pickup}
      </p>
    </div>

    {/* Destination */}
    <div className="flex items-start gap-4">
      <i className="ri-map-pin-fill text-xl  "></i>
      <p className="text-sm text-gray-700">
        {props.ride?.destination}
      </p>
    </div>

    {/* Payment */}
    <div className="flex items-center gap-4">
      {props.paymentMethod === 'cash' ? (
        <i className="ri-cash-line text-2xl text-green-700"></i>
      ) : (
        <img src={upiimg} alt="upi" className="h-8" />
      )}

      <div>
        <h3 className="text-lg font-semibold">
          ₹{props.ride?.fare}
        </h3>
        <p className="text-sm text-gray-500 capitalize">
          {props.paymentMethod}
        </p>
      </div>
    </div>

  </div>
</div>
    )
}

export default WaitingForDriver;