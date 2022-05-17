import React, { useState } from 'react'
import "./chat.css"
import Leftchat from '../Component/Leftchat'
import Centerchat from '../Component/Centerchat'


const Chat = () => {
  const [theme,settheme] = useState(true);
  const set=(data)=>{
    settheme(data);
  }
  return (
    <>
      <div className={theme ? "mainchat" : "mainchat dark"}>
        <Leftchat func={set}/>
        {/* <mycont.Provider val={}> */}
        <Centerchat />
        {/* </mycont.Provider> */}
      </div>
    </>
  )
}

export default Chat
