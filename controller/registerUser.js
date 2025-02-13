const UserModule = require("../Modules/UserModule")
const bcryptjs=require("bcryptjs")
async function registerUser(request,response){
    try{
const {name,email,password,profile_pic}=request.body
const checkEmail=await UserModule.findOne({email})
if(checkEmail){
    return response.status(400).json({
        message:"already been exist ",
        error:true
    })
}

const salt= await bcryptjs.genSalt(10)
const hashpassword=await bcryptjs.hash(password,salt)
const payload={
    name,
    email,
    password:hashpassword,
    profile_pic
}
const user=new UserModule(payload)
const UserSave=await user.save()
return response.status(201).json({
    message:"user created sussfully",
    data:UserSave,
    success:true
})
    }
    catch(error){
return response.status(500).json({
    message:error.message||error,
    error:true
})
    }
}
module.exports=registerUser