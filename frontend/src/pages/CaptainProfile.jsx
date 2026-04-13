import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../contaxt/CaptanContext';
import axios from 'axios';
import profile from '../assets/download.png';
import 'remixicon/fonts/remixicon.css';
import CaptainRidehistory from '../components/CaptainRidehistory'

const CaptainProfile = () => {
  const navigate = useNavigate();
  const { captain } = useContext(CaptainDataContext);


  let vehicleimage = '';
  if (captain.vehicle.vehicleType === 'car') {

    vehicleimage = 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n'
  } else if (captain.vehicle.vehicleType === 'moto') {

    vehicleimage = 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n'
  } else {
    vehicleimage = 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n'
  }

  const currentAvatar = captain?.profileImage
    ? `${import.meta.env.VITE_BASE_URL}${captain.profileImage}`
    : profile;

  const rating = captain?.rating || 0;

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <div className="flex items-center justify-between p-2 bg-white shadow">
        <button
          type="button"
          onClick={() => navigate('/captain-home')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <i className="ri-arrow-left-line text-xl font-bold" />
        </button>
        <h1 className="text-lg font-semibold"> Profile</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 max-w-lg mx-auto">

        <div className="bg-yellow-300 rounded-xl shadow p-4  ">
          <div className='flex gap-5 items-center mb-2'>
            <img
              src={currentAvatar}
              alt="Profile"
              className="h-15 w-15 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>

              <h2 className='mt-2 text-2xl font-bold capitalize'>{captain?.fullname?.firstname} {captain?.fullname?.lastname}</h2>
              <p className='text-blue-700 '>{captain?.email}</p>
              <p className='text-blue-700 mb-2'>{captain?.mobileno}</p>
            </div>

          </div>
         

          <div className='flex justify-between items-center '>
            <button
              onClick={() => navigate('/captain/logout')}
              className='font-medium px-4 py-1 rounded-lg  bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer active:scale-95'><i className="ri-logout-box-r-line text-2xl"></i>Sign out</button>
            <button
              onClick={() => navigate('/captain/edit')}
              className='font-medium pointer px-4 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer active:scale-95'><i className="ri-edit-line text-2xl "></i>edit profile</button>
          </div>


        </div>

<div className="bg-white rounded-2xl shadow-md p-4 my-3">

  {/* TOP */}
  <div className="flex items-center justify-between">
    
    <div>
      <h3 className="text-gray-500 text-sm">Rating</h3>
      <h2 className="text-3xl font-bold text-gray-800">
        {captain?.rating ? captain.rating.toFixed(1) : 0}
      </h2>
      <p className="text-xs text-gray-500">
        {captain?.numReviews || 0} reviews
      </p>
    </div>

    {/* STARS */}
    <div className="flex items-center text-yellow-500 text-xl">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= Math.floor(rating)) {
          return <i key={i} className="ri-star-fill"></i>;
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
          return <i key={i} className="ri-star-half-fill"></i>;
        } else {
          return <i key={i} className="ri-star-line text-gray-300"></i>;
        }
      })}
    </div>

  </div>

</div>
        <div className="bg-white rounded-2xl shadow-md p-5 mb-4 flex items-center justify-between">


          <div className="space-y-2">

            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Vehicle Details
            </h3>

            <p className="text-lg font-bold text-gray-800 capitalize">
              {captain?.vehicle?.vehicleType}
            </p>

            <div className="text-sm text-gray-600 space-y-1">
              <p> Color: <span className="font-medium">{captain?.vehicle?.color}</span></p>
              <p> Plate: <span className="font-medium">{captain?.vehicle?.plate}</span></p>
              <p> Capacity: <span className="font-medium">{captain?.vehicle?.capacity}</span></p>
            </div>

          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="flex items-center justify-center">
            <img
              src={vehicleimage}
              alt="vehicle"
              className="h-24 w-32 object-contain"
            />
          </div>

        </div>

        <div className="bg-black text-white p-4 rounded-xl mb-4">
          <h2 className="text-lg">Total Earnings</h2>
          <p className="text-2xl font-bold">₹{captain?.totalEarnings}</p>
        </div>

        <CaptainRidehistory />


      </div>
    </div>
  );
};

export default CaptainProfile;
