import React from 'react'

const Postmsg = (props) => {
  return (
    <>
    {props.msgg && props.cls==="rightmsg" ? <div className="rightmsg">{props.msgg}</div> :""}
    {props.msgg && props.cls==="leftmsg" ? <div className="leftmsg">{props.msgg}</div> :""}
    {props.msgg && props.cls==="centermsg" ? <div className="centermsg">{props.msgg}</div> :""}
    </>
  )
}

export default Postmsg
