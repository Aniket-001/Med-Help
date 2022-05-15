import React, {  useState , useEffect } from 'react'
import Postmsg from "./Postmsg"
import { useNavigate } from 'react-router-dom'
import socketio from "socket.io-client"

let socket;

const Centerchat = () => {

  const [msg, setmsg] = useState("");
  const [status, setstatus] = useState(false);
  const [arr, setarr] = useState([]);

  const navigate = useNavigate();

  const passmsg = (e) => {
    e.preventDefault();
    setmsg(e.target.value);
  }

  const sendmsg = () => {
    setarr([...arr,msg])
    socket.emit('msg',msg);
    setmsg("");
  }

    //const [userdata,setuserdata] = useState({});
  //const mycont = createContext(userdata);
  //const [userdata,setuserdata] = useState({fname:"..."});

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
      const data = await res.json();
      //---------------------------------------------------
      //setuserdata(data);
      //console.log("dst", userdata);
      
      //----------------------------------------------------
      if(!res.status===200)
        throw new Error(res.error);
      localStorage.setItem("user",JSON.stringify(data));
    }
    catch(err){
      navigate("/Login");
    }
  }

  const Msg= () =>{
    const endpoint ="http://localhost:5000/";
    socket=socketio(endpoint,{ transports:['websocket']});

    /*socket.on("connect",()=>{
        alert("connected");
    })*/

    socket.emit("joined",JSON.parse(localStorage.getItem("user")))
    socket.on("welcome",(data)=>{
      console.log(data.msg, data.name);
    })
    socket.on("userjoined",(data)=>{
      console.log(data.name, data.msg);
    })
  }

  useEffect(()=>{
    chatpage();
  },[]);

  useEffect(()=>{
    Msg();
  },[status]);

  return (
    <div className="home">
      {
        status?
        <>
      <div className="msg">
        {
          arr.map((val,ind)=>{
            return(
            <Postmsg msgg={val} ind={ind} />
            )
          })
        }
        <div className="centermsg"> tempora doloribus pariatur incidunt, illum consequuntur sed? Expedita delectus odio minus cumque ab laborum.</div>
        <div className="leftmsg">
          Quibusdam ullam natus expedita rem dolore voluptatum harum voluptates ex saepe, velit voluptatem
          .</div>
        <div className="rightmsg">dcasdcjasdjhcashjbjsbcjsb Lorem ipsum dolor sit amet consectetur um, delectus voluptate eum sequi ipsum sed minus.
          Perspiciatis c</div>
      </div>
      <div className="searchbar">
        {/* <input type="text" className="search" value={msg} onChange={passmsg} /> */}
        <textarea className="send" placeholder="Enter your text here....." value={msg} onChange={passmsg} />
        <button onClick={sendmsg} className="sendbtn"><i className='bx bx-paper-plane'></i></button>
      </div>
        </>
        :
        <div className="note">hiiii there!!!!!!</div>
      }
    </div>
  )
}

export default Centerchat
