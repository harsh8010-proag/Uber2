import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../contaxt/CaptanContext';
import axios from 'axios';
import profile from '../assets/download.png';
import 'remixicon/fonts/remixicon.css';

const CaptainProfile = () => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const baseUrl = import.meta.env.VITE_BASE_URL || '';

  const [fullname, setFullname] = useState({
    firstname: captain?.fullname?.firstname || '',
    lastname: captain?.fullname?.lastname || '',
  });
  const [vehicle, setVehicle] = useState({
    color: captain?.vehicle?.color || '',
    plate: captain?.vehicle?.plate || '',
    capacity: captain?.vehicle?.capacity ?? 1,
    vehicleType: captain?.vehicle?.vehicleType || 'car',
  });
  const [profileImagePreview, setProfileImagePreview] = useState(
    captain?.profileImage
      ? (captain.profileImage.startsWith('http') ? captain.profileImage : `${baseUrl}${captain.profileImage}`)
      : null
  );
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        fullname: { firstname: fullname.firstname.trim(), lastname: fullname.lastname.trim() },
        vehicle: {
          color: vehicle.color.trim(),
          plate: vehicle.plate.trim(),
          capacity: Number(vehicle.capacity),
          vehicleType: vehicle.vehicleType,
        },
      };
      if (profileImageBase64) payload.profileImage = profileImageBase64;

      const { data } = await axios.patch(
        `${baseUrl}/captains/profile`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setCaptain(data.captain);
      navigate('/captain-home');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const currentAvatar = profileImagePreview || profile;

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <div className="flex items-center justify-between p-4 bg-white shadow">
        <button
          type="button"
          onClick={() => navigate('/captain-home')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <i className="ri-arrow-left-line text-xl" />
        </button>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
        <div className="w-10" />
      </div>

      <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
        {/* Profile image */}
        <div className="flex flex-col items-center mb-6">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative group"
          >
            <img
              src={currentAvatar}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="ri-camera-line text-2xl text-white" />
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <span className="text-sm text-gray-500 mt-2">Tap to change photo</span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        {/* Name */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Name</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              value={fullname.firstname}
              onChange={(e) => setFullname((p) => ({ ...p, firstname: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2"
              minLength={3}
            />
            <input
              type="text"
              placeholder="Last name"
              value={fullname.lastname}
              onChange={(e) => setFullname((p) => ({ ...p, lastname: e.target.value }))}
              className="border border-gray-300 rounded-lg px-3 py-2"
              minLength={3}
            />
          </div>
        </div>

        {/* Vehicle */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Vehicle</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Color"
              value={vehicle.color}
              onChange={(e) => setVehicle((p) => ({ ...p, color: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              minLength={3}
            />
            <input
              type="text"
              placeholder="Plate number"
              value={vehicle.plate}
              onChange={(e) => setVehicle((p) => ({ ...p, plate: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              minLength={3}
            />
            <input
              type="number"
              placeholder="Capacity"
              value={vehicle.capacity}
              onChange={(e) => setVehicle((p) => ({ ...p, capacity: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              min={1}
            />
            <select
              value={vehicle.vehicleType}
              onChange={(e) => setVehicle((p) => ({ ...p, vehicleType: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="car">Car</option>
              <option value="moto">Moto</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-orange-500 text-white font-medium py-3 rounded-xl hover:bg-orange-600 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  );
};

export default CaptainProfile;
