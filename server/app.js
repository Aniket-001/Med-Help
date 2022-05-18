require('dotenv').config();
const express=require("express");
const http= require("http");
const cors= require("cors");
const socketio = require('socket.io');
var cookieParser = require('cookie-parser');

const app=express();

app.use(cookieParser());
app.use(cors());

app.use(express.json())
app.use(require("./router/route"))

//-------------------------
const users =[{}];
const server=http.createServer(app);
const io=socketio(server);

io.on("connection",(socket)=>{
    console.log("Connection established...");

    socket.on("msg",(data)=>{
        io.emit("chat",data);
    })

    socket.on('joined',(data)=>{
        users[socket.id]=data;
        socket.emit("welcome",{msg:`Welcome to the MED-HELP, ${data}`, name : "Med-Help"})
        socket.broadcast.emit("userjoined",{msg:`${data} has joined the room`,name: "Med-Help"})
    })

});

//-------------------------

const port= process.env.PORT;

server.listen(port,()=>{
    console.log(`listening to the port ${port}`); 
})