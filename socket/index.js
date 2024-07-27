const express=require("express")
const {Server}=require("socket.io")
const hhtp=require("http")
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModule = require("../Modules/UserModule")
const {Conversations,messagemodule}=require("../Modules/Conversation")
const { Console } = require("console")
const app=express()
// server coonection
const server=hhtp.createServer(app)
const io=new Server(server,{
    cors:{
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})
//online user
const onlineUser=new Set()
// socket running
io.on("connection",async(socket)=>{
    console.log("connect user",socket.id)
    const token=socket.handshake.auth.token
    //current user details
    const user=await getUserDetailsFromToken(token)
    console.log("token",user)
    //create a room
    socket.join(user?._id.toString())
    onlineUser.add(user?._id?.toString())
    io.emit("onlineUser",Array.from(onlineUser))
    socket.on("message-page",async(userId)=>{
        console.log("userId",userId)
        const userdetails=await UserModule.findById(userId).select("-password")
        const payload={
            _id:userdetails?._id,
            name:userdetails?.name,
            profile_pic:userdetails?.profile_pic,
            email:userdetails?.email,
            online:onlineUser.has(userId)
        }
        socket.emit("message-user",payload)
    })
    //new message
    socket.on("new message",async(data)=>{
        let Conversation= await Conversations.findOne({
            "$or":[
                {sender:data?.sender,receiver:data?.receiver},
                {sender: data?.receiver,receiver:data?.sender}
            ]
        })
        // console.log("Conversation",Conversation)
        // //if conversation is not availble
        if(!Conversation){
            const createconversation=await Conversations({
                sender:data?.sender,
                receiver:data?.receiver
            })
            Conversation=await createconversation.save()
        }
        const message=new messagemodule({
            
            text : data.text,
            imageUrl : data.imageUrl,
            videoUrl : data.videoUrl,
             msgByUserId : data?.msgByUserId
        })
        const saveMessage= await message.save()
        const updateConversation=await Conversations.updateOne({_id:Conversation?._id},
            {"$push":{message:saveMessage?._id}
        })
        const getConversationmessage=await Conversations.findOne({
            "$or":[
                {sender:data?.sender,receiver:data?.receiver},
                {sender: data?.receiver,receiver:data?.sender}
            ]
        }).populate("message").sort({updatedAt:-1})
        io.to(data?.sender).emit("message",getConversationmessage.
            message)
        io.to(data?.receiver).emit("message",getConversationmessage.
            message)
        // console.log("getConversation",getConversation)
// console.log("new message",data)
// console.log("Conversation",Conversation)
    })
    //disconnect
    socket.on("disconnect",()=>{
        onlineUser.delete(user?._id)
        console.log("disconnect user",socket.id)
    })
})
module.exports={
    app,
    server
}

// const express = require("express");
// const { Server } = require("socket.io");
// const http = require("http");
// const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

// const app = express();
// // server connection
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//     credentials: true
//   }
// });

// // online users
// const onlineUser = new Set();

// // socket running
// io.on("connection", async (socket) => {
//   console.log("connected user", socket.id);
//   const token = socket.handshake.auth.token;
//   try {
//     // current user details
//     const user = await getUserDetailsFromToken(token);
//     if (!user || !user._id) {
//       socket.disconnect();
//       return;
//     }
//     console.log("token", user);

//     // create a room
//     socket.join(user._id);
//     onlineUser.add(user._id);

//     // emit updated online users
//     io.emit("onlineUser", Array.from(onlineUser));

//     // handle disconnect
//     socket.on("disconnect", () => {
//       console.log("disconnected user", socket.id);
//       onlineUser.delete(user._id);
//       io.emit("onlineUser", Array.from(onlineUser));
//     });
//   } catch (error) {
//     console.error("Error getting user details:", error);
//     socket.disconnect();
//   }
// });

// module.exports = {
//   app,
//   server
// };



