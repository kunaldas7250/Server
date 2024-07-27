const UserModule = require("../Modules/UserModule")

async function searchUser(request,responce){
    try {
        const {search}=request.body
        const query=new RegExp(search,"i","g")
        const user=await UserModule.find({
          "$or"  :[
        {name: query  },
        {email: query  }
          ]
        }).select("-password")
        return responce.json({
            message:"all user",
            data:user,
            success:true
        })
    } catch (error) {
        return responce.status(500).json({
         message:error.message||error,
         error:true
        })
    }
}
module.exports=searchUser