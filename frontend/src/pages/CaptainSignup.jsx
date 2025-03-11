import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullName:{
        firstName,
        lastName
      },
      email,
      password
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };
  return (

    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
          <div className='flex space-x-3 mb-7'>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              placeholder='First Name'
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              placeholder='Last Name'
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            placeholder='Password'
          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>Sign Up</button>
        </form>

        <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></p>
      </div>
      <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls,whatsapp and SMS messages, including by automated means, from Uber and its affiliates to the number provided</p>
    </div>
  );
};



export default CaptainSignup
