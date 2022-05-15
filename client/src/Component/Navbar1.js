import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'


const Navbar1 = () => {
  const [bar, setBar] = useState(0);
  //const [wdth, setWdth] = useState(1);
  let hght;
  document.addEventListener('scroll', () => {
    const hght1 = document.body.scrollHeight;
    let hght2 = Math.ceil(document.documentElement.scrollTop);
    hght = (hght2 / (hght1 - window.innerHeight)) * 100;
    hght = Math.floor(hght);
    setBar(hght);
  })
  let navigate = useNavigate();

  /*document.addEventListener('resize', () => {
    const wdth=window.innerWidth;
    if(wdth<500)
      setWdth(0);
    else
      setWdth(1);
  })*/
  return (
    <>
      <div className="nav">
        <div className="logo">
          <NavLink to="/" className="route" >MED-HELP</NavLink>
        </div>
        <div className="btngrp">
          <button className='btn1' onClick={() => { navigate("/Chat") }}><i className="fa-solid fa-message"></i></button>
          <button className='btn3' onClick={() => { navigate("/Signin") }}><i className="fa-solid fa-right-to-bracket"></i></button>
          {/* <button className='btn2' onClick={() => { navigate("/Logout") }}><i className="fa-solid fa-right-from-bracket"></i></button> */}
        </div>
        <div className="progress" style={{ width: `${bar}%` }}></div>
      </div>
    </>
  )
}

export default Navbar1
