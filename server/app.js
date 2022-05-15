require('dotenv').config();
const express=require("express");
const http= require("http");
const cors= require("cors");
const store = require("store2");
const socketio = require('socket.io');
var cookieParser = require('cookie-parser');

const app=express();

app.use(cookieParser());
app.use(cors());

app.use(express.json())
app.use(require("./router/route"))

//-------------------------
const users =[];
let id;
const server=http.createServer(app);
const io=socketio(server);
io.on("connection",(socket)=>{
    console.log("Connection established...");

    socket.on("msg",(msg)=>{
        io.emit("Socket id-->",msg);
    })
    /*socket.broadcast.emit("message",()=>{
        console.log("Socket id-->",socket.id," joined");
    })*/
    socket.on('joined',(userdata)=>{
        users[socket.id]=userdata;
        //store('User', userdata); 
        //console.log("hii",store('User').fname);
        console.log(`${userdata.fname} has joined`);
        socket.emit("welcome",{msg:"Welcome to the MED-HELP", name : users[socket.id].fname})
        socket.broadcast.emit("userjoined",{msg:"has joined the room",name: users[socket.id].fname})
    })
    //const name=users[socket.id];
    //const nm=toString(users[socket.id].fname);
    //const nm= JSON.parse(localStorage.getItem("user"));

});
//-------------------------

const port= process.env.PORT;

server.listen(port,()=>{
    console.log(`listening to the port ${port}`); 
})