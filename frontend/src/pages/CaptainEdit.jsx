import React, { useContext, useState } from "react";
import { CaptainDataContext } from "../contaxt/CaptanContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import profileimg from '../assets/download.png'

const CaptainEdit = () => {

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState(captain?.fullname?.firstname);
  const [lastname, setLastname] = useState(captain?.fullname?.lastname);
  const [color, setColor] = useState(captain?.vehicle?.color);
  const [plate, setPlate] = useState(captain?.vehicle?.plate);
  const [capacity, setCapacity] = useState(captain?.vehicle?.capacity);
  const [vehicleType, setVehicleType] = useState(captain?.vehicle?.vehicleType);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(captain?.profileImage?`${import.meta.env.VITE_BASE_URL}${captain.profileImage}`:null)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('color', color);
    formData.append('plate', plate);
    formData.append('capacity', capacity);
    formData.append('vehicleType', vehicleType);
   

    if (image) {
      formData.append('profileImage', image)
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/captains/update-profile`, formData, { withCredentials: true });
      if (response.status === 200) {
        setCaptain(response.data.captain);
        navigate('/captain-profile')
      }
    } catch (err) {
      console.log(err);
    }
  }
      const handeleImageChange = (e) =>{
      const file = e.target.files[0];
      console.log(file)
      if(file){
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
         
    }

  return (
    <div>
      <div className="flex items-center justify-between p-2 bg-white shadow mb-2">
        <button
          type="button"
          onClick={() => navigate('/captain-profile')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <i className="ri-arrow-left-line text-xl font-bold" />
        </button>
        <h1 className="text-lg font-semibold">Update Profile</h1>
        <div className="w-10" />
      </div>
    
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-5">
<div className=" flex justify-center mb-5 relative">
      <img
        src={preview}
        alt="Profile"
        onError={(e) => (e.target.src = profileimg)}
        className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
      />

<label
  htmlFor="fileUpload"
  className="flex items-center justify-center left-[50%] absolute h-10 w-10 bottom-0    
  bg-black text-white rounded-full cursor-pointer hover:bg-gray-800 transition
  "
>
  <i className="ri-camera-line text-lg"></i>
</label>

<input
type='file'
id='fileUpload'
accept='image/*'
onChange={handeleImageChange}
className="hidden"
/>
</div>

      {/* Name */}
      <div className="flex gap-3">
        <input
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First Name"
          className="w-1/2 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Last Name"
          className="w-1/2 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Vehicle Type */}
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        className="w-full bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option value="">Select Vehicle Type</option>
        <option value="car">Car</option>
        <option value="moto">Moto</option>
        <option value="auto">Auto</option>
      </select>

      {/* Vehicle Details */}
      <div className="flex gap-3">
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Vehicle Color"
          className="w-1/2 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          placeholder="Plate Number"
          className="w-1/2 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <input
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        placeholder="Capacity"
        type="number"
        min='1'
        max='4'
        className="w-full bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />


      <button
        type="submit"
        className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition active:scale-95"
      >
        Save Changes
      </button>

    </form>
    </div>
  );
}

export default CaptainEdit;

