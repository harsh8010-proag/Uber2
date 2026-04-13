import React, { useContext } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { UserDataContext } from '../contaxt/UserContext'
import profile from '../assets/download.png'
import UserRidehistory from '../components/UserRidehistory'

const UserProfile = () => {
    const { user } = useContext(UserDataContext)
    const navigate = useNavigate();

    const profileImage = user.profileImage?`${import.meta.env.VITE_BASE_URL}${user.profileImage}`: profile;

    return (
        <div>
            <div className='flex items-center justify-between p-2 bg-gray-100'>
                <Link to='/home' className='h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md'>
                    <i className="ri-arrow-left-line text-xl"></i>
                </Link>
                <h1 className='text-lg font-semibold'>Profile</h1>
                <div className='w-10'></div>
            </div>
            <div className='p-4 max-w-lg mx-auto'>
            <div className="bg-yellow-300 rounded-xl shadow p-4 mb-2 ">
                <div className='flex gap-5 items-center mb-2'>
                    <img
                        src={profileImage}
                        alt="profile"
                        className="h-15 w-15 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>

                        <h2 className='mt-2 text-2xl font-bold capitalize'>{user?.fullname?.firstname} {user?.fullname?.lastname}</h2>
                        <p className='text-blue-700 mb-2'>{user?.email}</p>
                    </div>
                </div>

                <div className='flex justify-between items-center '>
                    <button
                        onClick={() => navigate('/user/logout')}
                        className='font-medium px-4 py-1 rounded-lg  bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer active:scale-95'><i className="ri-logout-box-r-line text-2xl"></i>Sign out</button>
                    <button
                        onClick={() => navigate('/user-profile/edit')}
                        className='font-medium pointer px-4 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer active:scale-95'><i className="ri-edit-line text-2xl "></i>edit profile</button>
                </div>


            </div>
            <div>
                <UserRidehistory/>
            </div>
            </div>
        </div>
    )
}

export default UserProfile
