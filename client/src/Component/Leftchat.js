import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import use from "../../../../chatcord-master/public/index.html"



const Leftchat = (props) => {
  const [status, setstatus] = useState(true);
  const [theme, settheme] = useState(true);
  const [show, setshow] = useState(true);

  let navigate = useNavigate();
  //const share = createContext()
  return (
    <>
      <nav className={status ? `sidebar close` : `sidebar`}>
        {/* <nav className={status ? `sidebar close ${theme?"":"dark"}` : `sidebar ${theme?"":"dark"}`}> */}
        <header>
          <div className="image-text">
            <span className="image">
              {/* <img src="../../public/Image/logo.png" alt="logo" /> */}
            </span>

            <div className="text logo-text">
              <span className="name" onClick={() => navigate("/")}>MED-HELP</span>
              {/* <span className="profession">By- Ansh, Aniket & Anshu</span> */}
            </div>
          </div>

          <i className='bx bx-chevron-right toggle' onClick={() => status ? setstatus(false) : setstatus(true)}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">

            <li className="search-box" onClick={() => setstatus(false)}>
              <i className='bx bx-search icon'></i>
              <input type="text" placeholder="Search..." />
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <div className='a'  onClick={()=>{show?setshow(false):setshow(true)}}>
                  <i className='bx bxs-group icon'></i>
                  <span className="text nav-text">Grp</span>
                  {
                    show ?
                      <i className='bx bx-chevron-down icon'></i>
                      :
                      <i className='bx bx-chevron-up icon'></i>
                  }
                </div>
              </li>

              {/* <li className="nav-link">
              <a href="#">
                <i className='bx bx-bar-chart-alt-2 icon'></i>
                <span className="text nav-text">Revenue</span>
              </a>
            </li>  */}
              <div className="panel" style={{ display: show ? "block" : "none" }}>

                <li className="nav-link">
                  <div className='a'>
                    <i className='bx bx-hash icon'></i>
                    <span className="text nav-text">Medicine</span>

                  </div>
                </li>
                <li className="nav-link">
                  <div className='a'>
                    <i className='bx bx-hash icon'></i>
                    <span className="text nav-text">Dentistry</span>
                  </div>
                </li>
                <li className="nav-link">
                  <div className='a'>
                    <i className='bx bx-hash icon'></i>
                    <span className="text nav-text">Optometry</span>
                  </div>
                </li>
              </div>
              {/* <li className="nav-link">
              <a href="#">
                <i className='bx bx-pie-chart-alt icon'></i>
                <span className="text nav-text">Analytics</span>
              </a>
            </li> 

            <li className="nav-link">
              <a href="#">
                <i className='bx bx-heart icon'></i>
                <span className="text nav-text">Likes</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className='bx bx-wallet icon'></i>
                <span className="text nav-text">Wallets</span>
              </a>
            </li> */}

            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <div className="a" onClick={() => { navigate("/Logout") }}>
                <i className='bx bx-log-out icon'></i>
                <span className="text nav-text">Logout</span>
              </div>
            </li>

            <li className="mode">
              <div className="sun-moon">
                {theme ? <i className='bx bx-moon icon moon'></i>
                  : <i className='bx bx-sun icon sun'></i>}
                {/* <i className='bx bx-moon icon moon'></i>
              <i className='bx bx-sun icon sun'></i> */}
              </div>
              <span className="mode-text text">{theme ? "Dark mode" : "Light mode"}</span>

              <div className={theme ? "toggle-switch" : "toggle-switch dark"} onClick={() => theme ? settheme(false) : settheme(true)}>
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
