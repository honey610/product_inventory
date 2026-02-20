import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(422).json({message:"User already exists"});
        }
        const newUser=new User({name,email,password});
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }catch(error){
        res.status(500).json({message:"Server error",error:error.message});
    }

}

export const login=async(req,res)=>{
   try{
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.cookie("token",token);
    res.status(200).json({
        token,
        user:{
            _id:user._id,
           
            role:user.role
        }
    });
   }catch(error){
    res.status(500).json({message:"Server error",error:error.message});
   }
}



export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

