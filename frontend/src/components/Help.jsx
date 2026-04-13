import React, { useState } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const Help = () => {
     
    const [name , setName ] = useState('');
    const [email , setEmail ] = useState('');
    const [description, setDescription ] = useState('');
     
    const submitHandler = async (e)=>{

    e.preventDefault()
    const formdata = { name , email , description } 
    if(!name.trim() || !email.trim() || !description.trim()){
      toast.error("All fields are required.");
      return;
    }
    
    try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/help/contact`,formdata);
        
       if(response.status === 201){
       
         toast.success('Your request has been submitted successfully. Our support team will contact you soon.',{autoClose:3000})
       }
       setName('');
       setEmail('');
       setDescription('');  
    }catch(err){
       console.log(err.response.data.message)
    }
  }


  return (
    <div>
  <header>
    <Navbar />
  </header>

  <main className="bg-gray-100 min-h-screen">

    {/* HERO */}
    <section className="bg-black text-white py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
      <p className="text-gray-300 max-w-xl mx-auto">
        Need help with your ride? We’re here to assist you anytime.
      </p>
    </section>

    {/* FAQ SECTION */}
    <section className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

      <div className="space-y-4">

        {/* FAQ ITEM */}
        {[
          {
            q: "How to book a ride?",
            a: "Sign in as User or Create new account, enter pickup & destination, then confirm your ride."
          },
        
          {
            q: "What payment methods are available?",
            a: "You can pay using Cash or UPI."
          },
          {
            q: "How to contact the captain?",
            a: "Once ride is accepted, you can see captain details and contact them."
          },
          {
            q: "Why is my ride not accepted?",
            a: "It depends on captain availability near your location."
          },
                     
        ].map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold text-gray-800">{item.q}</h3>
            <p className="text-gray-600 mt-2 text-sm">{item.a}</p>
          </div>
        ))}

      </div>
    </section>

    {/* CONTACT SUPPORT */}
    <form className="bg-white py-10 px-6" onSubmit={submitHandler}>
      <h2 className="text-2xl font-bold text-center mb-6">Contact Support</h2>

      <div className="max-w-md mx-auto space-y-4">

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black-400"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black-400"
        />

        <textarea
          placeholder="Describe your issue..."
          rows="4"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black-400"
        ></textarea>

        <button className="w-full bg-zinc-800 hover:bg-zinc-900 text-white font-semibold py-3 rounded-lg transition cursor-pointer">
          Submit Request
        </button>

      </div>
    </form>
 
     
  </main>

  <footer>
    <Footer />
  </footer>
</div>
  )
}

export default Help