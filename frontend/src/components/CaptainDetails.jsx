import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../contaxt/CaptanContext';
import profile from '../assets/download.png';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);
    const baseUrl = import.meta.env.VITE_BASE_URL || '';
    const profileSrc = captain?.profileImage
        ? (captain.profileImage.startsWith('http') ? captain.profileImage : `${baseUrl}${captain.profileImage}`)
        : profile;
    const displayName = captain?.fullname
        ? `${captain.fullname.firstname || ''} ${captain.fullname.lastname || ''}`.trim() || 'Captain'
        : 'Captain';

    return (
        <div>
            <div className='flex items-center justify-evenly '>
                <Link to="/captain-profile" className='flex gap-2 items-center hover:opacity-90'>
                    <img
                        className='h-10 w-10 rounded-full object-cover border-2 border-gray-200'
                        src={profileSrc}
                        alt="Profile"
                    />
                    <div>
                        <h4 className='text-lg font-medium'>{displayName}</h4>
                        <span className='text-xs text-gray-500'>Tap to edit profile</span>
                    </div>
                </Link>
                <div>
                    <h4 className='text-xl font-semibold'>₹295.20 </h4>
                    <p className='text-sm   text-gray-600'>Earnd</p>
                </div>
            </div>
            <div className='flex p-3 mt-6 justify-center gap-5 items-start bg-yellow-400 rounded-xl'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-time-line"></i>
                    <h5 className='text-lg font-medium' >10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
                    <h5 className='text-lg font-medium' >10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails