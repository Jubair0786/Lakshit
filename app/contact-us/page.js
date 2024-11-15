"use client"; // Enables client-side features

import Navbar from '../components/Navbar'; // Adjust if Navbar is in a different folder
import Footer from '../components/Footer'; // Adjust if Footer is in a different folder

export default function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen  relative">
      {/* Background Image */}
      <img
        src="https://img.freepik.com/free-photo/nature-beauty-full-display-vibrant-flower-generated-by-ai_188544-15544.jpg" // Test with a known image URL
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40 -z-10" // Ensure it takes full width & height with opacity
      />

      <Navbar />
      <div className="flex-grow p-5 md:p-10 lg:p-20 flex flex-col items-center relative z-10">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold-500 mb-4 text-center">Contact Us</h1>
          <p className="text-md md:text-lg text-gray-300 mb-8 text-center">We would love to hear from you!</p>
          
          <form className="bg-gradient-to-b from-red-400 via-yellow-500 to-green-800 bg-opacity-60 p-6 md:p-8 rounded-lg border border-gold-500 shadow-lg shadow-gold-700 w-full">
            <div className="mb-4">
              <label className="block text-gold-400 font-semibold text-lg" htmlFor="name">Name:</label>
              <input type="text" id="name" className="border-b-2 border-gold-400 bg-transparent text-white p-2 w-full focus:outline-none focus:border-gold-600" />
            </div>
            <div className="mb-4">
              <label className="block text-gold-400 font-semibold text-lg" htmlFor="email">Email:</label>
              <input type="email" id="email" className="border-b-2 border-gold-400 bg-transparent text-white p-2 w-full focus:outline-none focus:border-gold-600" />
            </div>
            <div className="mb-4">
              <label className="block text-gold-400 font-semibold text-lg" htmlFor="message">Message:</label>
              <textarea id="message" className="border-b-2 border-gold-400 bg-transparent text-white p-2 w-full focus:outline-none focus:border-gold-600" rows="4"></textarea>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-gold-500 to-yellow-500 shadow-lg shadow-yellow-700 w-full text-white p-3 rounded-lg hover:bg-yellow-600 hover:scale-105 transition-all duration-300 font-bold text-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer className="w-full mt-auto relative z-10" />
    </div>
  );
}
