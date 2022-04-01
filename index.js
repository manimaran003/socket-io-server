const express=require("express")
const app=express()
const http=require("http")
const cors=require("cors")
const {Server, Socket}=require("socket.io")
const server=http.createServer(app)
app.use(cors())

const io=new Server(server,{
    cors:{
         origin:"http://localhost:3000",
         methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    console.log(socket.id)
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`user with id ${socket.id} from ${data}`)
    })
    socket.on("send_message",(data)=>{
        console.log("new emitted",data)
        socket.to(data.room).emit("received_message",data)
    })
    socket.on("disconnect",()=>{
        console.log("disconnected",socket.id)
    })
})
server.listen(3001,()=>{
    console.log("server running")
})