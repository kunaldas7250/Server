const mongoose=require("mongoose")
async function ConnectDb(){
    try{
await mongoose.connect(process.env.MONGODB_URI)
const connection=mongoose.connection
connection.on("connected",()=>{
    console.log("connect to db")
})
connection.on("error",(error)=>{
console.log("something went wrong with mongoose connection",error)
})
    }
    catch(error){
console.log("something went wrong",error)
    }
}
module.exports=ConnectDb