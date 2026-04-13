import CaptainRidehistory from "./CaptainRidehistory";
import { useNavigate } from "react-router-dom";

const ShowCaptainRidehistory=()=>{
     
  const navigate = useNavigate();
    return(
        <div>
            <div className="flex items-center justify-between p-2 bg-white shadow mb-2">
        <button
          type="button"
          onClick={() => navigate('/captain-home')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <i className="ri-arrow-left-line text-xl font-bold" />
        </button>
        <h1 className="text-lg font-semibold">Ride History </h1>
        <div className="w-10" />
      </div>
      <div className="max-w-lg mx-auto"
      >
        <CaptainRidehistory/>
      </div>
        </div>
    )

}

export default ShowCaptainRidehistory;