import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../contaxt/CaptanContext';
import profile from '../assets/download.png';
import { SocketContext } from '../contaxt/SocketContext';
import { toast } from 'react-toastify';


const CaptainDetails = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext)



  useEffect(() => {

    const handlePayment = (data) => {
      setTotalEarnings(data.totalEarnings);
      toast.success("Payment received");
    };

    socket.on("payment-received", handlePayment);

    return () => {
      socket.off("payment-received", handlePayment);
    };

  }, [socket]);



  useEffect(() => {
    if (captain) {
      setTotalEarnings(captain.totalEarnings);
    }
  }, [captain]);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || '';
  const profileSrc = captain?.profileImage
    ? `${baseUrl}${captain.profileImage}`
    : profile;
  const displayName = captain?.fullname
    ? `${captain.fullname.firstname || ''} ${captain.fullname.lastname || ''}`.trim() || 'Captain'
    : 'Captain';


    const rating = captain?.rating || 0;

  return (
    <div className="p-4">

      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* PROFILE CARD */}
        <div className="  bg-white shadow-md rounded-2xl p-4 w-full md:w-2/3">

          <Link to="/captain-profile" className="flex items-center gap-3">
            <img
              className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border"
              src={profileSrc}
              alt="Profile"
            />
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-800">
                {displayName}
              </h4>
              <p className="text-sm text-gray-500">View Profile</p>
            </div>
          </Link>

          <div className="flex items-center gap-1 mt-1">
<span className="text-yellow-500 text-lg flex items-center">
  {[1,2,3,4,5].map((i) => {
    if (i <= Math.floor(rating)) {
      return <i key={i} className="ri-star-fill"></i>;
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      return <i key={i} className="ri-star-half-fill"></i>;
    } else {
      return <i key={i} className="ri-star-line  "></i>;
    }
  })}
</span>
 
            <span className="text-xs text-gray-600">
              ({captain?.rating || 0}) • {captain?.numReviews || 0} reviews
            </span>
          </div>


        </div>

        {/* STATUS CARD i will improve this */}
        {/* <div className="bg-black text-white rounded-2xl p-4 w-full md:w-1/3 flex items-center justify-between shadow-md">
        <div>
          <p className="text-sm text-gray-300">Status</p>
          <h3 className="text-lg font-semibold">Online</h3>
        </div>
        <span className="h-3 w-3 bg-green-500 rounded-full"></span>
      </div> */}



      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

        {/* RIDE HISTORY */}
        <button
          onClick={() => navigate('/captain/history')}
          className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
        >
          <i className="ri-history-line text-3xl md:text-4xl text-gray-700 mb-2"></i>
          <p className="text-sm md:text-base font-semibold text-gray-800">
            Ride History
          </p>
        </button>

        {/* EARNINGS */}
        <div className="bg-black text-white shadow-md rounded-2xl p-5 flex flex-col items-center">
          <i className="ri-wallet-line text-3xl md:text-4xl mb-2"></i>
          <p className="text-sm md:text-base">Total Earnings</p>
          <h3 className="text-lg md:text-xl font-bold">₹{totalEarnings}</h3>
        </div>



      </div>

    </div>
  );
}

export default CaptainDetails;