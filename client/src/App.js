import React from 'react'
import SgnIn from './pages/SignIn'
import LogIn from './pages/LogIn'
import Error from './pages/Error'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Logout from './pages/Logout'
import {Route, Routes} from "react-router-dom"
import './index.css'

const App = () => {
  return (
    <>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Signin" element={<SgnIn />} />
      <Route exact path="/Login" element={<LogIn />} />
      <Route exact path="/Chat" element={<Chat />} />
      <Route exact path="/Logout" element={<Logout />} />
      <Route path="*" element={<Error/>} />
      </Routes>
    </>
  )
}

export default App

