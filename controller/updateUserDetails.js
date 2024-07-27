
// const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
// const UserModel = require("../Modules/UserModule")

// async function updateUserDetails(request,response){
//     try {
//         console.log(request.cookies.token)
//         const token = request.cookies.token || ""
// console.log("token",token)
//         const user = await getUserDetailsFromToken(token)

//         const { name, profile_pic } = request.body

//         const updateUser = await UserModel.updateOne({ _id : user._id },{
//             name,
//             profile_pic
//         })

//         const userInfomation = await UserModel.findById(user._id)

//         return response.json({
//             message : "user update successfully",
//             data : userInfomation,
//             success : true
//         })


//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true
//         })
//     }
// }

// module.exports = updateUserDetails


const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../Modules/UserModule")

async function updateUserDetails(request, response) {
    try {
        // Ensure cookies are being parsed correctly
        console.log("Request Cookies:", request.cookies.abc);


        const token = request.cookies.abc || ""
        console.log("Token:", token)

        const user = await getUserDetailsFromToken(token)

        const { name, profile_pic } = request.body

        const updateUser = await UserModel.updateOne({ _id: user._id }, {
            name,
            profile_pic
        })

        const userInformation = await UserModel.findById(user._id)

        return response.json({
            message: "User updated successfully",
            data: userInformation,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = updateUserDetails
