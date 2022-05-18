import React from 'react'

const Postmsg = (props) => {
  return (
    <>
    {props.msg && props.name==="Med-Help" ? <div className="centermsg"><b> MED-HELP:  </b>{props.msg}</div> :""}
    {props.msg && props.id===props.user ? <div className="rightmsg"><b> YOU:  </b>{props.msg}</div> :""}
    {props.msg && props.id!==props.user && props.name!=="Med-Help" ? <div className="leftmsg"><b> {props.name}:  </b>{props.msg}</div> :""}
    </>
  )
}

export default Postmsg
