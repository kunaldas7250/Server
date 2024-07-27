// const express=require("express")
// const cookieParser = require("cookie-parser");
// const cors=require("cors")
// require("dotenv").config()

// const ConnectDb=require("./config/ConnectDb")


// const app=express()
// const router=require("./routes/index")

// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     credentials:true
// }))
// app.use(express.json())
// const PORT=process.env.PORT||8080
// app.get("/",(request,response)=>{
// response.json({
//     message:"server running "+PORT
// })
// })
// app.use("/api",router)
// app.use(cookieParser());
// ConnectDb().then(()=>{
//     app.listen(PORT,()=>{
//         console.log("server running",+PORT)
//     })
// })

// 2 nd code
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// require("dotenv").config();
// const ConnectDb = require("./config/ConnectDb");

// const app = express();
// const router = require("./routes/index");

// // Middleware setup
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());

// const PORT = process.env.PORT || 8080;

// // Basic server check route
// app.get("/", (request, response) => {
//     response.json({
//         message: "server running " + PORT
//     });
// });

// // API endpoints
// app.use("/api", router);

// // Connect to the database and start the server
// ConnectDb().then(() => {
//     app.listen(PORT, () => {
//         console.log("server running on port " + PORT);
//     });
// }).catch((error) => {
//     console.error("Error connecting to the database:", error);
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: "Internal Server Error" });
// });

// module.exports = app;

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const ConnectDb = require("./config/ConnectDb");
const {app,server}=require("../Server/socket/index")
// const app = express();
const router = require("./routes/index");

// Middleware setup
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

// Basic server check route
app.get("/", (req, res) => {
    res.json({
        message: "server running on port " + PORT
    });
});

// API endpoints
app.use("/api", router);

// Connect to the database and start the server
ConnectDb().then(() => {
    server.listen(PORT, () => {
        console.log("server running on port " + PORT);
    });
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
