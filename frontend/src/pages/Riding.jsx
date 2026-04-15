import React, { useContext, useEffect, useState } from 'react'
import { FaGripfire } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { SocketContext } from '../contaxt/SocketContext';
import LiveTracking from '../components/LiveTracking';
import upi from '../assets/upi.webp';
import { ToastContainer, toast } from "react-toastify";
 
import axios from 'axios';


const StarRating = ({ rating, setRating }) => {
    return (
        <div className='flex gap-2 text-2xl'>
            {[1, 2, 3, 4, 5].map((star) => (
                <i
                    key={star}
                    className={`ri-star-${rating >= star ? 'fill' : 'line'} text-yellow-500 cursor-pointer`}
                    onClick={() => setRating(star)}>

                </i>
            ))}
        </div>
    )
}


const Riding = () => {


    const location = useLocation();
    const { ride } = location.state;
    const { socket } = useContext(SocketContext);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [showReview, setShowReview] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const navigate = useNavigate();
     

    

 const [rideData, setRideData] = useState('');
 
   
 const rideId = ride._id;
 
 useEffect(() => {
  const fetchRide = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/getride`,{rideId},
        { withCredentials: true }
      );

      if (res.status === 200 ) {
        setRideData(res.data.ride);
 
      }

    } catch (err) {
      console.log(err);
    }
  };

  fetchRide();
}, []);

    
    const handlePayment = async () => {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/pay`,{
            rideId: ride._id
        }, {
            withCredentials: true
        });
        toast.success('Payment Successful');
        setIsPaid(true);
        setShowReview(true);

    }
useEffect(() => {
  if (rideData?.paymentStatus === 'paid') {
    setIsPaid(true);
    
  }

  if (rideData?.paymentMethod === 'cash') {
    setShowReview(true);
  }
}, [rideData]);

    const submitReview = async () => {
    
        if (rating === 0) {
            return toast.error('Please select rating');
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/review`,{
                captainId: ride.captain._id,
                rating,
                comment
            },{withCredentials:true});

            if (res.status === 200) {
                toast.success('Review submitted');

                setShowReview(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='h-screen'>
            {showReview && (
                <div className="fixed inset-0 bg-zinc-700/50 flex items-center justify-center z-50">

                    <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-lg relative">  
                        <button
                            onClick={() => setShowReview(false)}
                            className="absolute top-2 right-3 text-lg font-semibold  text-blue-800 cursor-pointer "
                        >
                            x
                        </button>
                        <p className='text-2xl text-green-700  mb-5'>Ride Complated <i className="ri-checkbox-circle-fill text-lg"></i></p>
                        <h3 className="text-lg font-semibold mb-3 text-center">
                            Rate your ride
                        </h3>

                        <div className="flex justify-center">
                            <StarRating rating={rating} setRating={setRating} />
                        </div>

                        <textarea
                            placeholder="Write your feedback..."
                            className="w-full mt-4 p-2 border rounded-lg"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                            onClick={submitReview}
                            className="bg-black text-white px-4 py-2 mt-4 rounded-lg w-full cursor-pointer"
                        >
                            Submit Review
                        </button>

                    </div>
                </div>
            )}
            <div className='h-1/2 '>
                <div className='flex w-full items-center justify-end fixed z-50 top-[50px]'>

                    <Link to={'/home'} className='m-2 text-white  h-10 w-10 bg-gray-700/70 flex items-center justify-center rounded-full '>
                        <i className="text-lg font-medium ri-home-5-line"></i>
                    </Link>
                </div>
                <div className="h-5/5">
                    <LiveTracking />
                </div>

            </div>
            <div className=' h-1/2 px-4 flex flex-col justify-center '>

                <p className='text-2xl text-green-700'>Ride complated <i className="ri-checkbox-circle-fill text-lg"></i></p>
                <div className='flex items-center justify-between mt-2'>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{rideData?.captain?.fullname?.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{rideData?.captain?.vehicle.plate}</h4>
                        <h4 className='text-xl font-semibold mt-1 mb-1 text-zinc-600'><i className="ri-phone-fill text-black"></i>   {rideData?.captain?.mobileno}</h4>

                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>

                                <p className='text-sm -mt-1 text-gray-600'>{rideData?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            {rideData?.paymentMethod === 'cash' ? <i className="text-lg  text-green-700 ri-cash-line "></i> : <img src={upi} alt='upi' className='h-[40px]' />}
                            <div>
                                <h3 className='text-lg font-medium'>₹{rideData?.fare}</h3>
                                {rideData?.paymentMethod === 'cash' ? <p className='text-sm -mt-1 text-gray-600'>Cash Cash </p> : ''}
                            </div>
                        </div>

                        <div>
                            <div>
                                {rideData?.paymentMethod === 'upi' && !isPaid ? (
                                    <button
                                        onClick={handlePayment}
                                        className='bg-green-500 text-lg text-white font-semibold rounded-lg w-full m-2 p-2 cursor-pointer'>
                                        Make Payment
                                    </button>
                                ) : rideData?.paymentMethod === 'upi' && isPaid ? (
                                    <p className='text-green-700 font-medium text-center'> Payment Done  </p>
                                ) : (
                                    <p className='text-green-700 font-medium'>Pay Cash</p>
                                )}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div >

            </div>
        </div>
    )
}

export default Riding;