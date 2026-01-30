const User=require("../models/userModel.js");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const crypto = require('crypto');
const { sendResetEmail } = require('../helpers/emailService');

const addUser=async(req,res)=>{
    try{
        const {username,email,password,phoneNumber}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"Email and password are required"});
        }

        // const isUser = await User.findOne({where:{username}});
        const isemail = await User.findOne({where:{email}});
        // if(isUser||isemail){
        //     return res.json({success:false,message:"User already exists"});
        // }
        if(isemail){
            return res.json({success:false,message:"User already exists"});
        }

        const hassed = await bcrypt.hash(password,10);
        // console.log(hassed);

        const newUser=await User.create({
            username,
            email,
            password: hassed,
            phoneNumber
        });

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:newUser
        });

    }catch(error){
        res.status(500).json({message:"Error creating user",error: error.message});
    }
}


const getAllUser=async(req,res)=>{
    try{
        const users=await User.findAll({attributes:{exclude:["password"]}});
        return res.json({success:true,users,message:"User fetched successfully"});        
    }catch(error){
        return res.status(500).json({message:"Error fetching users",error: error.message});
    }
}

const getUsersById=async(req,res)=>{
    try{
        const id=req.params.id;
        const user=await User.findByPk(id);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        return res.json({
            success:true,
            user:{id:user.id,username:user.username},
            message:"User fetched successfully"
        });
    }catch(error){
        return res.status(500).json({
            message:"Error fetching user",
            error: error.message
        });
    }
}

const getActiveUsers = async (req, res) => {
  res.json({ message: "Get active users - to be implemented" });
};

const updateUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const {username,email,password,phoneNumber}=req.body;
        const user=await User.findByPk(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        if(username){
            const isexistinguser=await User.findOne({where:{username}});
            if(isexistinguser && isexistinguser.id!==user.id){
                return res.status(400).json({success:false,message:"User with that username exists"});
            }
        }


        let hassedPassword=user.password;
        if(password){
            hassedPassword=await bcrypt.hash(password,10);
        }
        await user.update({
            username:username|| user.username,
            email:email|| user.email,
            password:hassedPassword,
            phoneNumber:phoneNumber|| user.phoneNumber,
        });
        return res.status(200).json({success:true,message:"User updated successfully",user:{
            id:user.id
        }});
    }catch(error){
        return res.status(500).json({message:"Error updating user",error: error.message});
    }
}

const deleteUser=async(req,res)=>{
    try{
        const id=req.params.id;
        const user= await User.findByPk(id);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }

        await user.destroy();

        return res.status(200).json({
            success:true,
            // user:{id:user.id,username:user.username},
            message:"User deleted"
        });
    }catch(error){
        return res.status(500).json({
            message:"Error",
            error:error.message
        })
    }
}

const logInUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({where:{email}});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const isvalidUser=await bcrypt.compare(password,user.password);

        if(!isvalidUser){
            return res.status(400).json({success:false,message:"Invalid credentials"});
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success:true,
            message:"Login successful",
            token,
            user:{id:user.id,username:user.username,email:user.email,role:user.role}
        });


    }catch(error){
        return res.status(500).json({
            message:"Error logging in",
            error:error.message
        });
    }
}

const getMe = async (req, res) => {
  const id=req.user.id
  try {
    const user = await User.findByPk(id)
    return res.json({ 
        success:true,
        user: { 
            id: user.id, 
            username: user.username, 
            email: user.email, 
            role: user.role 
        },
        message: "User fetched successfully" 
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
}


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate a 6-digit numeric OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
        const expires = Date.now() + 60 * 60 * 1000; // 1 hour

        await user.update({ resetPasswordToken: hashedOtp, resetPasswordExpires: expires });

        // Send email with OTP
        try {
            await sendResetEmail(user.email, otp, user.username);
        } catch (emailError) {
            // Rollback token fields if email fails
            await user.update({ resetPasswordToken: null, resetPasswordExpires: null });
            return res.status(500).json({ success: false, message: 'Error sending email', error: emailError.message });
        }

        return res.status(200).json({ success: true, message: 'OTP sent to email' });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending OTP', error: error.message });
    }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await User.findOne({
      where: {
        email,
        resetPasswordToken: hashedOtp,
        resetPasswordExpires: { [require('sequelize').Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ success: false, message: 'Email, OTP and new password are required' });
    }

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await User.findOne({
      where: {
        email,
        resetPasswordToken: hashedOtp,
        resetPasswordExpires: { [require('sequelize').Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null });

    return res.status(200).json({ success: true, message: 'Password has been reset' });
  } catch (error) {
    return res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};

// Admin Settings Controller
const getAdminSettings = async (req, res) => {
  try {
    // Get the admin user (assuming logged-in user is admin)
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return admin settings
    const settings = {
      adminName: user.username || 'Admin',
      adminEmail: user.email,
      siteName: process.env.SITE_NAME || 'Sport Booking',
      currency: process.env.CURRENCY || 'INR (₹)',
      bookingAutoApprove: process.env.AUTO_APPROVE_BOOKINGS === 'true' || false,
      emailAlerts: process.env.EMAIL_ALERTS === 'true' || true,
      twoFactor: user.twoFactorEnabled || true
    };

    return res.status(200).json({
      success: true,
      message: 'Admin settings fetched successfully',
      settings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching admin settings',
      error: error.message
    });
  }
};

const updateAdminSettings = async (req, res) => {
  try {
    const { adminName, adminEmail, siteName, currency, bookingAutoApprove, emailAlerts, twoFactor } = req.body;

    // Get the admin user
    const user = await User.findOne({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user fields
    if (adminName) user.username = adminName;
    if (adminEmail) user.email = adminEmail;
    if (twoFactor !== undefined) user.twoFactorEnabled = twoFactor;

    await user.save();

    // Settings would normally be stored in a settings table or env, but for now we'll just return success
    return res.status(200).json({
      success: true,
      message: 'Admin settings updated successfully',
      settings: {
        adminName: user.username,
        adminEmail: user.email,
        siteName,
        currency,
        bookingAutoApprove,
        emailAlerts,
        twoFactor: user.twoFactorEnabled
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating admin settings',
      error: error.message
    });
  }
};

module.exports={
    getAllUser,addUser,getUsersById,getActiveUsers,updateUser,deleteUser,
    logInUser,getMe,forgotPassword,verifyOtp,resetPassword,getAdminSettings,updateAdminSettings
}

