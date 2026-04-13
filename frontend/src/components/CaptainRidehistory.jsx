import { useContext ,useState ,  useEffect} from "react"
 
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from  "../contaxt/CaptanContext";
import axios from 'axios'
 

const CaptainRidehistory = () =>{
    const navigate = useNavigate();
     
      const [rides, setRides ] = useState([]);

      const [showAll, setShowAll] = useState(false);

        useEffect(()=>{
          axios.get(`${import.meta.env.VITE_BASE_URL}/history/captain-history`,{withCredentials:true})
          .then(res => setRides(res.data)).catch(err => console.log(err));
        },[]);


        const ridesToShow = showAll ? rides : rides.slice(0,1);

        
return(
            <div className="bg-white rounded-2xl shadow-md p-4 ">

<div className="flex justify-between">
  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
    Ride History <i class="ri-history-line text-lg ml-1"></i>
  </h3>

<button 
onClick={()=> setShowAll(!showAll)}
className="cursor-pointer   font-medium "
>
    
{showAll ? <p className="text-sm  ">Show Less<i className="ri-arrow-up-s-line text-2xl"></i></p> : <p className="text-sm ">View All  <i class="ri-arrow-down-s-line text-2xl "></i></p>}
</button>
</div>

  {rides.length === 0 ? (
    <p className="text-gray-400 text-sm">No rides yet</p>
  ) : (
    ridesToShow.map((ride) => {
      const isCompleted = ride.status === 'completed';

      return (
        <div
          key={ride._id}
          className="bg-gray-50 p-4 mb-4 rounded-xl border hover:shadow-md transition"
        >

           
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-800">
             <i class="ri-map-pin-user-fill"></i> {ride.pickup} → <br/>
             <i class="ri-map-pin-2-fill"></i>{ride.destination}
            </p>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium
              ${isCompleted
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-500'
              }`}
            >
              {ride.status}
            </span>
          </div>

           
          <div className="text-sm text-gray-600 space-y-1">
            <p> Fare: <span className="font-medium text-gray-800">₹{ride.fare}</span></p>
            <p> User: <span className="font-medium">{ride.user?.fullname?.firstname}</span></p>

            <p className="  text-gray-400">
              {new Date(ride.createdAt).toLocaleString()}
            </p>
          </div>
           
        </div>
      );
    })
  )}

</div>

)
}

export default CaptainRidehistory;