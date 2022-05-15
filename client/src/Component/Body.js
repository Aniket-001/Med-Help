import React from 'react'
import { useNavigate } from 'react-router-dom'

const Body = () => {
  let navigate=useNavigate();
  return (
    <>
      <div className="body1">
          <div className="content">
            <div className="head">Med-Help</div>
            <div className="para">A healthy building is intentionally designed and operated to support the health, safety, and well-being of the people who use it, as well as the health of the planet.</div>
          </div>
          <img src="Image/img15.svg" alt="img15" className="img15" />
      </div>

      
      <div className="body2">
          <div className="gal">
            <img src="Image/img15.svg" alt="gal_img" />
            <img src="Image/img15.svg" alt="gal_img" />
            <img src="Image/img15.svg" alt="gal_img" />
            <img src="Image/img15.svg" alt="gal_img" />
          </div>
          <div className="txt">
          <div className="galTxt1">Hey there!</div>
          <div className="galTxt2"> First time vistor? Be a part of this community. Let's take one step forward towards exploring this. Register yourself here
          <button className='btn' onClick={()=>{navigate("/Signin")}}>Register</button>
          </div>
          </div>
      </div>
    </>
  )
}

export default Body
