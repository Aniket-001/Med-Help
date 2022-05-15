import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <div className='error'>
      <img src="Image/error.svg" alt="error" />
      <div className="errtxt"><span>404</span><span>Ooops! You weren't supposed to see this</span>
        <span>The page you're looking for no longer exists.
        Return to the <NavLink to="/" className="route2">Home</NavLink> page & remember you haven't seen anything.</span></div>
    </div>
  )
}

export default Error
