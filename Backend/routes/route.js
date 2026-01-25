const express = require('express').Router();
const multer=require("multer");
const upload=multer();

const{getAllUser,addUser,getUsersById,getActiveUsers,updateUser,deleteUser,
    logInUser,getMe,forgotPassword,resetPassword
}=require("../controllers/userController");

const authGuard = require("../helpers/authguagrd");
const isAdmin = require("../helpers/isAdmin");

express.post("/user",upload.none(),addUser)
express.get("/me",authGuard,getMe)
express.post("/forgotpassword",forgotPassword)
express.post("/resetpassword",resetPassword)
express.get("/getalluser",authGuard,isAdmin,getAllUser)
express.get("/getusersbyid/:id",authGuard,isAdmin,getUsersById)
express.get("/getactiveusers",authGuard,getActiveUsers)
express.put("/updateuserbyid/:id",authGuard,isAdmin,updateUser)
express.delete("/deleteuserbyid/:id",authGuard,isAdmin,deleteUser)
express.post("/loginuser",logInUser)

module.exports=express;
