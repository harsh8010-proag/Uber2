import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import Captainlogin from './pages/Captainlogin';
import Captainsignup from './pages/Captainsignup';
import UserContext, { UserDataContext } from './contaxt/UserContext';
import Start from './pages/Start';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProfile from './pages/CaptainProfile';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';
import CaptainLogout from './pages/CaptainLogout';
import Ongoing from './pages/Ongoing';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from './pages/UserProfile';
import UserEditProfile from './pages/UserEditProfile';
import CaptainEdit from './pages/CaptainEdit';
import ShowCaptainRidehistory from './components/ShowCaptainRidehistory';
import About from './components/About';
import Help from './components/Help';


const App = () => {

  const ans = useContext(UserDataContext);
 
  return (

    <div>
      <ToastContainer position="top-center" autoClose={1500} style={{ zIndex: 9999 }} />
      <Routes>
   
        <Route path='/' element={<Start />} />
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/ongoing' element={<Ongoing />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<Captainsignup/>} />
        <Route path='/help' element={<Help />} />
        <Route path='/user-profile' element={
          <UserProtectWrapper>
          <UserProfile/>
          </UserProtectWrapper>}/>

          <Route path='/user-profile/edit' element={
          <UserProtectWrapper>
          <UserEditProfile/>
          </UserProtectWrapper>}/>

        <Route path='/user/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />

        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>} />

          

        <Route path='/captain-profile' element={
          <CaptainProtectWrapper>
            <CaptainProfile />
          </CaptainProtectWrapper>} />

          <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />

        <Route path='/captain/edit' element={
          <CaptainProtectWrapper>
            <CaptainEdit/>
          </CaptainProtectWrapper>
        } />

      <Route path='/captain/history' element={
        <CaptainProtectWrapper>
          <ShowCaptainRidehistory/>
        </CaptainProtectWrapper>
      }/>

      <Route path='/about' element={
        
        <About/>
       
      }/>
      </Routes>

    </div>
  );
}

export default App;