const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
  getAllUser,
  addUser,
  getUsersById,
  getActiveUsers,
  updateUser,
  deleteUser,
  logInUser,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getAdminSettings,
  updateAdminSettings,
} = require("../controllers/userController");

const authGuard = require("../helpers/authguagrd");
const isAdmin = require("../helpers/isAdmin");

console.log('addUser type:', typeof addUser);
console.log('upload.none type:', typeof upload.none);

router.post("/user", upload.none(), addUser);
router.get("/me", authGuard, getMe);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyotp", verifyOtp);
router.post("/resetpassword", resetPassword);
router.get("/getalluser", authGuard, isAdmin, getAllUser);
router.get("/getusersbyid/:id", authGuard, isAdmin, getUsersById);
router.get("/getactiveusers", authGuard, getActiveUsers);
router.put("/updateuserbyid/:id", authGuard, isAdmin, updateUser);
router.delete("/deleteuserbyid/:id", authGuard, isAdmin, deleteUser);
router.post("/loginuser", logInUser);
router.get("/admin/settings", authGuard, isAdmin, getAdminSettings);
router.put("/admin/settings", authGuard, isAdmin, updateAdminSettings);

module.exports = router;
