// // const UserModule = require("../Modules/UserModule")
// // const bcryptjs=require("bcryptjs")
// // const jwt=require("jsonwebtoken")
// // async function checkPassword(request,response){
// // try {
// //     const {password,userId}=request.body
// //     const user=await UserModule.findById(userId)
// //     const verifyPassword=await bcryptjs.compare(password,user.password)
// //     if(!verifyPassword){
// //         return response.status(400).json({
// //             message:"please check password",
// //             error:true
// //         })
// //     }
// // const tokenData={
// //     id:user._id,
// //     email:user.email
// // }
// //     const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
// //     const cookieopt={
// //         // http:true,
// //         // secure:true
// //          httpOnly: true,
// //             secure: process.env.NODE_ENV === 'production'
// //     }
// //     return response.cookie("token",token,cookieopt).status(200).json({
// //         message:"login successfully",
// //         token:token,
// //         success:true
// //     })
// // } catch (error) {
// //     return response.status(500).json({
// //         message:error.message||error,
// //         error:true
// //     })
// // }
// // }
// // module.exports=checkPassword


// const UserModel = require("../Modules/UserModule")
// const bcryptjs = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// async function checkPassword(request,response){
//     try {
//         const { password, userId } = request.body

//         const user = await UserModel.findById(userId)

//         const verifyPassword = await bcryptjs.compare(password,user.password)

//         if(!verifyPassword){
//             return response.status(400).json({
//                 message : "Please check password",
//                 error : true
//             })
//         }

//         const tokenData = {
//             id : user._id,
//             email : user.email 
//         }
//         const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{ expiresIn : '1d'})

//         const cookieOptions = {
//             httpOnly: true,
//             secure : true
//         }

//         return response.cookie('token',token,cookieOptions).status(200).json({
//             message : "Login successfully",
//             token : token,
//             success :true
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true
//         })
//     }
// }

// module.exports = checkPassword


const UserModel = require("../Modules/UserModule")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function checkPassword(request, response) {
    try {
        const { password, userId } = request.body

        const user = await UserModel.findById(userId)

        const verifyPassword = await bcryptjs.compare(password, user.password)

        if (!verifyPassword) {
            return response.status(400).json({
                message: "Please check password",
                error: true
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email 
        }
        const def = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' // only set secure flag in production
        }

        return response.cookie('abc', def, cookieOptions).status(200).json({
            message: "Login successfully",
            token: def,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = checkPassword
