import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../contaxt/UserContext'
import profile from '../assets/download.png'

const UserProfile = () => {
    const { user } = useContext(UserDataContext)

    return (
        <div>
            <div className='flex items-center justify-between p-4 bg-gray-100'>
                <Link to='/home' className='h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md'>
                    <i className="ri-arrow-left-line text-xl"></i>
                </Link>
                <h1 className='text-lg font-semibold'>Profile</h1>
                <div className='w-10'></div>
            </div>
            <div className='flex flex-col items-center justify-center p-6'>
                <div className='relative'>
                    <img
                        src={user?.profileImage ? (user.profileImage.startsWith('http') ? user.profileImage : `${import.meta.env.VITE_BASE_URL || ''}${user.profileImage}`) : profile}
                        alt="Profile"
                        className='h-24 w-24 rounded-full object-cover border-4 border-gray-200'
                    />
                </div>
                <h2 className='mt-4 text-2xl font-bold capitalize'>{user?.fullname?.firstname} {user?.fullname?.lastname}</h2>
                <p className='text-gray-500'>{user?.email}</p>
                <Link to='/user/profile/edit' className='mt-6 px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition'>
                    Edit Profile
                </Link>
            </div>
        </div>
    )
}

export default UserProfile
