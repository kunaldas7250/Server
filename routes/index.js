// const express =require("express")
// const registerUser = require("../controller/registerUser")
// const router=express.Router()
// //create user api
// router.post("/register",registerUser)



// module.exports=router


const express = require("express");
const router = express.Router();
const registerUser = require("../controller/registerUser");
const checkEmail=require("../controller/checkEmail")
const checkPassword=require("../controller/checkPassword");
// const userDetails = require("../controller/userDetails");
const updateUserDetails=require("../controller/updateUserDetails")

const logout=require("../controller/logout");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const searchUser = require("../controller/searchUser");

// Create user API
router.post("/register", registerUser);
router.post("/email",checkEmail)
router.post("/password",checkPassword)

router.get("/user-details", async (req, res) => {
    try {
      // Log cookies to debug
      console.log("Cookies:", req.cookies);
      
      // Check if the token is available in cookies
      if (req.cookies && req.cookies.abc) {
        const token = req.cookies.abc;
        
        // Log the token to debug
        console.log("Token:", token);
        
        // Get user details from token
        const user = await getUserDetailsFromToken(token);
  
        // Check if the user is found
        if (user) {
          console.log("User:", user);
          return res.status(200).json({
            message: "User details",
            data: user
          });
        } else {
          return res.status(404).json({
            message: "User not found",
            error: true
          });
        }
      } else {
        return res.status(401).json({
          message: "Unauthorized",
          error: true
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true
      });
    }
  });
  router.post("/update-user",updateUserDetails)
router.get('/logout',logout)
router.post("/search-user",searchUser)
module.exports = router;
