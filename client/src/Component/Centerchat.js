import React, { useState , useEffect } from 'react'
import Postmsg from "./Postmsg"
import { useNavigate } from 'react-router-dom'
import socketio from "socket.io-client"
import Scroll from "react-scroll-to-bottom"
import { ToastContainer, toast } from 'react-toastify';

let socket;
let data;

const Centerchat = () => {

  const navigate = useNavigate();
  const [msg, setmsg] = useState("");
  const [user, setuser] = useState("");
  const [status, setstatus] = useState(false);
  const [id, setid] = useState();
  const [msgs, setmsgs] = useState([]);
  
  
  const passmsg = (e) => {
    e.preventDefault();
    if(e.target.name==="input")
      setmsg(e.target.value);
    else{
      setuser(e.target.value);
    }
  }
  
  //---------------------------------------------
  const chatpage = async ()=>{
    try{
      const res = await fetch('/Chat',{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      data = await res.json();
      if(!res.status===200)
        throw new Error(res.error);
    }
    catch(err){
      navigate("/Login");
    }
  }
  
  useEffect(()=>{
    chatpage()
    return () => {
      
    }
  },[]);
  //--------------------------------
  const sendmsg = (e) => {
    e.preventDefault();
    socket.emit('msg',{msg:msg,id:id,name:user});
    setmsg("");
  }
  //--------------------------------------
  const gochat = (e)=>{
    e.preventDefault();
    if (user === "") {
      toast.error("Input box must be filled.", {
        position: "top-center",
        autoClose: 3000
		  });
      return;
		}
    setstatus(true);
    //-------------------------------------
    const endpoint ="http://localhost:5000/";
    socket=socketio(endpoint,{ transports:['websocket']});
    
    socket.on("connect",()=>{
      setid(socket.id);
    })
   
    socket.emit("joined",user)
    
    socket.on("userjoined",(data)=>{
      setmsgs(...msgs,[data]);
    })
    socket.on("welcome",(data)=>{
      setmsgs(...msgs,[data]);
    })
  }
  //-----------------------


  //-----------------------
  
  useEffect(()=>{
    if(user==="")
      return;
    else{
      socket.on("chat",(data)=>{
        setmsgs([...msgs,data]);
      })
      return () => {
        socket.off();
      }}
  },[msgs])
  
  return (
    <div className="home">
      {
        status?
        <>
      <Scroll className="msg">
        {
          msgs.map((val,ind)=>{
            return(
            <Postmsg msg={val.msg} key={ind} user={id} id={val.id} name={val.name} />
            )
          })
        } 
      </Scroll>
      <div className="searchbar">

        <textarea className="send" placeholder="Enter your text here....." value={msg} onChange={passmsg} name="input" />
        <button onClick={sendmsg} className="sendbtn"><i className='bx bx-paper-plane'></i></button>
      </div>
        </>
        :
        <>
        <div className='showmsg'>
          <img src="Image/name.svg" alt="name" />
          <div className="nick">
            <div className="box">Join the chatroom with a nick name : - 
            </div>
            <input type="text" name="user" className='user' placeholder="Your Nick Name..." value={user} onChange={passmsg} />
            <button onClick={gochat}>GO</button>
          </div>
          <ToastContainer />
        </div>
        </>
      }
    </div>
  )
}

export default Centerchat
export {data} 
