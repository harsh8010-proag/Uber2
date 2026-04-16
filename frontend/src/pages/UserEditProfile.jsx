import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../contaxt/UserContext';
import axios from 'axios';
import profileimg from '../assets/download.png'

const UserEditProfile = () => {
    const { user, setUser } = useContext(UserDataContext)
    const [firstname, setFirstname] = useState(user?.fullname?.firstname || '')
    const [lastname, setLastname] = useState(user?.fullname?.lastname || '')
    const [email, setEmail] = useState(user?.email || '')
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(user?.profileImage?`${import.meta.env.VITE_BASE_URL}${user.profileImage}`:profileimg);

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('firstname',firstname);
        formData.append('lastname',lastname);
        
        if(image){
            formData.append('profileImage', image);
        }
       
         
        //  for(let pair of formData.entries()){
        //     console.log(pair[0],pair[1])
        //  }

        try {               
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/users/profile-edit`,formData, { 
                withCredentials: true
            })

            if (response.status === 200) {
                setUser(response.data.user)
                
                navigate('/user-profile')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            // Handle error (e.g., show toast)
        }
    }

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if(file){
            setImage(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div className='p-4 h-screen flex flex-col justify-between'>
            <div>
                <div className='flex items-center justify-between mb-6'>
                    <Link to='/user-profile' className='h-10 w-10 flex items-center justify-center rounded-full bg-gray-100'>
                        <i className="ri-arrow-left-line text-xl"></i>
                    </Link>
                    <h1 className='text-lg font-semibold'>Edit Profile</h1>
                    <div className='w-10'></div>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-lg mx-auto mt-5'>
                    <div className='flex justify-center mb-4'>
                        <div className='relative'>
                            <img
                                src={preview}
                                onError={(e) => (e.target.src = profileimg)}
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
                            className='bg-zinc-300 w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="email"
                            value={email}
                            disabled

                        />
                        <p className='px-2 text-sm'>you can't edit email</p>
                    </div>
                    <button 

                    className='bg-black text-white w-full rounded-lg px-4 py-2 text-lg font-medium mt-4 cursor-pointer'>Update Profile</button>
                </form>
            </div>
        </div>
    )
}

export default UserEditProfile;
