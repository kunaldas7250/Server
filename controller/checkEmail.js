const UserModule = require("../Modules/UserModule")

async function checkEmail(request,response){
    try {
        const {email}=request.body
        const checkEmail=await UserModule.findOne({email}).select("-password")
        if(!checkEmail){
            return response.status(400).json({
                message:"user not exist in our database",
                error:true
            })
        }
return response.status(200).json({
    message:"email verify",
    success:true,
    data:checkEmail
})
    } catch (error) {
        return response.status(500).json({
            message:error.message||error,
            error:true
        })
    }
}
module.exports=checkEmail