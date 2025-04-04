import React, { useContext } from 'react'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import PhoneLogin from './pages/PhoneLogin'
import { Routes, Route } from 'react-router-dom'
import { UserDataContext } from './context/userContext'

const App = () => {

  const ans = useContext(UserDataContext)

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/phone-login' element={<PhoneLogin />} />
      </Routes>
    </div>
  )
}

export default App
