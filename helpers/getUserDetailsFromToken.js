// const jwt=require("jsonwebtoken")
// const UserModule = require("../Modules/UserModule")
// const getUserDetailsFromToken= async(token)=>{
//     if(!token){
//         return {
//             message:"session out",
//             logout:true
          
//     }
// }
// const decode=await jwt.verify(token,process.env.JWT_SECREAT_KEY)
// const user =await UserModule.findById(decode.id)
// return user
// }
// module.exports=getUserDetailsFromToken

const jwt = require('jsonwebtoken');
const UserModule = require('../Modules/UserModule');

const getUserDetailsFromToken = async (abc) => {
  try {
    // Verify the token
    const decoded = jwt.verify(abc, process.env.JWT_SECRET_KEY);

    // Log the decoded token
    console.log("Decoded token:", decoded);
    
    // Find the user by ID from the decoded token
    const user = await UserModule.findById(decoded.id).select("-password");
    
    return user;
  } catch (error) {
    console.error("Token verification error:", error.message);
    return null;
  }
};

module.exports = getUserDetailsFromToken;
