import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password
    })
    setEmail('')
    setPassword('')

  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-10'
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            placeholder='email@example.com'
          />
          <h3 className='text-lg font-medium  mb-2'>Enter Password</h3>

          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            placeholder='password' />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        </form>
        <p className='text-center'>New here? <Link to='/Signup' className='text-blue-600'>Create new Account</Link></p>

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-1/3"></div>
          <p className="mx-4 text-gray-500 font-medium">OR</p>
          <div className="border-t border-gray-300 w-1/3"></div>
        </div>

        <div className="flex justify-center">
          <Link
            to="/phone-login"
            className="text-white bg-blue-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Login with Phone
          </Link>
        </div>
      </div>
      <div>
        <Link to='/captain-login' className='bg-[#10b461] flex itmes-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
