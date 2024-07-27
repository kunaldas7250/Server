const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")

// async function userDetails(request,response){
// try {
//     console.log(request.cookies);
//     const token=request.cookies.token || ""
//     console.log(token)
//     const user=await getUserDetailsFromToken(token)
//     console.log(user)
//     return response.status(200).json({
//         message:"user details",
//         data:user
//     })
// } catch (error) {
//     return response.status(500).json({
//         message:error.message || error,
//         error:true
//     })
// }
// }
// module.exports=userDetails

router.get("/user-details", async (req, res) => {
    try {
      console.log(req.cookies);
      const token = req.cookies.token || "";
      console.log(token);
      const user = await getUserDetailsFromToken(token);
      console.log(user);
      return res.status(200).json({
        message: "user details",
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true
      });
    }
  });


