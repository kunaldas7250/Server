const mongoose=require("mongoose")
const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        default:""

    },
    image_url:{
        type:String,
        default:""
    },
    video_url:{
        type:String,
default:""
    },
    seen:{
        type:Boolean,
        default:false
    },
    msgByUserId:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"user"
    }
},{
    timestamps:true
})
const ConversationSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"user"
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"user"
    },
    message:[{
        type:mongoose.Schema.ObjectId,
        ref:"message"
    }]
},{
    timestamps:true

})
const messagemodule=mongoose.model("message",messageSchema)
const Conversations =mongoose.model("conversation",ConversationSchema)



module.exports={
    messagemodule,
    Conversations
}