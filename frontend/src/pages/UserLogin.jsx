import React, { useState } from 'react';
import { FaGripfire } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../contaxt/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [userData, setUserData] = useState({});

  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      const data = response.data


      if (response.status === 200) {

        const user = data.user;
        setUser({
          email: user.email,
          fullname: {
            firstname: user.fullname.firstName,
            lastname: user.fullname.lastName
          }
        });

        localStorage.setItem('token', data.token);
        
        toast.success("Login successful!", {
                  position: "top-center",
                  autoClose: 2000,
                  theme: "colored",
                });
      
                navigate('/home');
      }

      setEmail('');
      setPasword('');
    } catch (error) {

      if (error.response && error.response.data) {
        // Exprss validator errors, display first message
        if (error.response.data.errors) {
          setServerError(error.response.data.errors[0].msg);
        } else if (error.response.data.message) {
          //other custome backend Error
          setServerError(error.response.data.message);
        } else {
          setServerError('unkown error occured.')
        }
      } else {
        setServerError('Network error');
      }
    }

  }
  return (
    <div className='p-7 flex flex-col h-screen justify-between'>
      <div>
        <div className="logo flex items-center mb-10">
          <FaGripfire className='text-[35px] text-red-500 ' />
          <h1 className='inter-harsh2 text-[35px] text-orange-500' >
            A< span className='text-black' >ber</span >
          </h1>
        </div>
        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-5 placeholder:text-base'
            type="email"
            placeholder='Enter your email'
          />

          <h3 className='font-medium text-lg mb-2'>Enter Password</h3>
          <input required
            value={password}
            onChange={(e) => {
              setPasword(e.target.value);
            }}
            className='bg-[#eeeeee] rounded px-4 py-2  w-full text-lg mb-7 placeholder:text-base'
            type="password"
            placeholder='password' />
          {serverError && (
            <p className="text-sm text-red-500 mb-3">{serverError}</p>
          )}
          <button
            className='bg-[#111] text-white font-semibold  px-4 py-2 w-full '
          >Login</button>
          <p className='text-center mb-10'>New here <Link to='/signup' className='text-blue-600 '>Create new Account</Link> </p>
        </form>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-orange-500 flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin;