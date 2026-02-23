import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import AppNavbar from './components/AppNavbar'
import IndividualEmployee from './components/IndividualEmployee'
import Footer from './components/Footer'
import UpdateProfile from './components/UpdateProfile'

const App = () => {
  return (
    <div>
        <AppNavbar/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update" element={<UpdateProfile />} />
       </Routes>
       <Footer/>
    </div>
  )
}

export default App
