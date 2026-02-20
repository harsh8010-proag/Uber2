import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../contaxt/UserContext'
import axios from 'axios'

const UserEditProfile = () => {
    const { user, setUser } = useContext(UserDataContext)
    const [firstname, setFirstname] = useState(user?.fullname?.firstname || '')
    const [lastname, setLastname] = useState(user?.fullname?.lastname || '')
    const [email, setEmail] = useState(user?.email || '')
    const [profileImage, setProfileImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(user?.profileImage || null)

    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
                setProfileImage(reader.result) // sending base64
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                fullname: { firstname, lastname },
                email,
                profileImage
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                setUser(response.data.user)
                navigate('/user/profile')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            // Handle error (e.g., show toast)
        }
    }

    return (
        <div className='p-4 h-screen flex flex-col justify-between'>
            <div>
                <div className='flex items-center justify-between mb-6'>
                    <Link to='/user/profile' className='h-10 w-10 flex items-center justify-center rounded-full bg-gray-100'>
                        <i className="ri-arrow-left-line text-xl"></i>
                    </Link>
                    <h1 className='text-lg font-semibold'>Edit Profile</h1>
                    <div className='w-10'></div>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex justify-center mb-4'>
                        <div className='relative'>
                            <img
                                src={previewImage ? (previewImage.startsWith('data:') || previewImage.startsWith('http') ? previewImage : `${import.meta.env.VITE_BASE_URL || ''}${previewImage}`) : ''}
                                alt="Profile Preview"
                                className='h-24 w-24 rounded-full object-cover border-4 border-gray-200'
                            />
                            <label htmlFor="profileImage" className='absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer'>
                                <i className="ri-pencil-line"></i>
                            </label>
                            <input
                                type="file"
                                id="profileImage"
                                accept="image/*"
                                className='hidden'
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='w-1/2'>
                            <h3 className='text-lg font-medium mb-2'>First Name</h3>
                            <input
                                className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder='First Name'
                            />
                        </div>
                        <div className='w-1/2'>
                            <h3 className='text-lg font-medium mb-2'>Last Name</h3>
                            <input
                                className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder='Last Name'
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className='text-lg font-medium mb-2'>Email</h3>
                        <input
                            className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='email@example.com'
                        />
                    </div>
                    <button className='bg-black text-white w-full rounded-lg px-4 py-2 text-lg font-medium mt-4'>Update Profile</button>
                </form>
            </div>
        </div>
    )
}

export default UserEditProfile
