import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './contaxt/UserContext.jsx'
import CaptanContext from './contaxt/CaptanContext.jsx'
import gsap from "gsap";
import {useGSAP} from '@gsap/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptanContext>
    <UserContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserContext>
    </CaptanContext>
  </StrictMode>,
)
