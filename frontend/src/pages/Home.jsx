import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='w-full h-screen flex flex-col'>
      <div className="relative w-full h-[82%]">
        <video
          className='absolute top-0 left-0 w-full h-full object-cover'
          src="/videos/Uberbg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Logo Overlay */}
        <div className='absolute top-8 left-8 z-10'>
          <img
            className='w-20'
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          />
        </div>
      </div>

      <div className='w-full h-[18%] bg-white py-4 px-4 flex flex-col justify-center'>
        <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
        <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>
          Continue
        </Link>
      </div>
    </div>
  )
}

export default Home;
