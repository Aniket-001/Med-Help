import React from 'react'
import "./chat.css"
import Rightchat from '../Component/Rightchat'
import Leftchat from '../Component/Leftchat'
import Centerchat from '../Component/Centerchat'


const Chat = () => {
  
  return (
    <>
      <div className="mainchat">
        <Leftchat />
        {/* <mycont.Provider val={}> */}
        <Centerchat />
        {/* </mycont.Provider> */}
        <Rightchat />
        {/* <h1>chat room</h1> */}
      </div>
    </>
  )
}

export default Chat
