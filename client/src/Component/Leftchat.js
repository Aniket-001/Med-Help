import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Clock from 'react-live-clock';
import {data} from './Centerchat';


const Leftchat = (props) => {
  const [status, setstatus] = useState(true);
  const [theme, settheme] = useState(true);
  const [show, setshow] = useState(true);

  let navigate = useNavigate();

const out = () =>{
  navigate("/Logout");
}

const dotheme =()=>{
  theme ? settheme(false) : settheme(true);
}

useEffect(()=>{
  props.func(theme);
},[theme])
  return (
    <>
      <nav className={status ? `sidebar close` : `sidebar`}>
        
        <header>
          <div className="image-text">
            <span className="image">
            </span>

            <div className="text logo-text">
              <span className="name" onClick={() => navigate("/")}>MED-HELP</span>
            </div>
          </div>

          <i className='bx bx-chevron-right toggle' onClick={() => status ? setstatus(false) : setstatus(true)}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">

            <li className="search-box" onClick={() => setstatus(false)}>
            <i className='bx bxs-time-five icon'></i>
              <Clock format="HH:mm:ss" interval={1000} ticking={true} style={{fontwight:"bold",fontSize: '30px', color:"blueviolet"}} />
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <div className='a'  onClick={()=>{show?setshow(false):setshow(true)}}>
                  <i className='bx bxs-user icon'></i>
                  <span className="text nav-text">Profile</span>
                  {
                    show ?
                    <i className='bx bx-chevron-up icon'></i>
                    :
                    <i className='bx bx-chevron-down icon'></i>
                  }
                </div>
              </li>

      
              <div className="panel" style={{ display: show ? "block" : "none" }}>

                <li className="nav-link">
                  <div className='a'>
                    <i className='bx bx-hash icon'></i>
                    <span className="wrap nav-text">{data?data.email:""}</span>

                  </div>
                </li>
                <li className="nav-link">
                  <div className='a'>
                    <i className='bx bx-hash icon'></i>
                    <span className="text nav-text">{data?data.fname+" "+data.lname:""}</span>
                  </div>
                </li>
                </div>
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <div className="a" onClick={out}>
                <i className='bx bx-log-out icon'></i>
                <span className="text nav-text">Logout</span>
              </div>
            </li>

            <li className="mode">
              <div className="sun-moon">
                {theme ? <i className='bx bx-moon icon moon'></i>
                  : <i className='bx bx-sun icon sun'></i>}
              </div>
              <span className="mode-text text">{theme ? "Dark mode" : "Light mode"}</span>

              <div className={theme ? "toggle-switch" : "toggle-switch dark"} onClick={dotheme}>
                <span className="switch"></span>
              </div>
            </li>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Leftchat
