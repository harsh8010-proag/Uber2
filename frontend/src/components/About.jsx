import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <div>
  <header>
    <Navbar />
  </header>

  <main className="bg-gray-100 min-h-screen">

    {/* HERO SECTION */}
    <section className="bg-black text-white py-16 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-semibold mb-4">
        About Our Ride Booking System
      </h1>
      <p className="max-w-2xl mx-auto text-gray-300">
        A modern platform designed to make travel simple, fast, and reliable.
        Built using MERN stack with real-time features.
      </p>
    </section>

    {/* INTRO */}
    <section className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
      <p className="text-gray-600 leading-relaxed">
        Our Ride Booking System is a full-stack web application that allows users
        to book rides and captains to accept and manage them efficiently. It is
        inspired by real-world ride-hailing platforms and focuses on providing a
        smooth and user-friendly experience.
      </p>
    </section>

    {/* FEATURES */}
    <section className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          "Real-time Ride Booking",
          "Live Location Tracking",
          "Ride History",
          "Secure Payments",
          "Captain Dashboard",
          
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-gray-700 font-medium">{feature}</p>
          </div>
        ))}
      </div>
    </section>
        
     
    {/* PURPOSE */}
    <section className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-4">Purpose of Project</h2>
      <p className="text-gray-600 leading-relaxed">
        This project helps in understanding real-world application development
        using the MERN stack. It includes backend APIs, authentication,
        real-time communication using sockets, and database management.
      </p>
    </section>

    {/* FUTURE */}
    <section className="bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Future Enhancements
      </h2>

      <ul className="max-w-3xl mx-auto text-gray-600 space-y-2">
        <li>• Online Payment Integration (Razorpay)</li>
     
        <li>• Advanced Maps (Google Maps)</li>
        <li>• Ride Scheduling</li>
        <li>• Notification System</li>
      </ul>
    </section>

  </main>

  <footer>
    <Footer />
  </footer>
</div>
  )
}

export default About;