import mongoose from "mongoose";
import user from"../schema/user_Schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    console.log("Received body:", req.body);

    const isexistuser = await user.findOne({ email: email });
    if (isexistuser) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedpassword);

        const newuser = new user({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            passwordHash: hashedpassword,
        });

        await newuser.save();

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login=async (req,res)=>{
    const {email,password}=req.body;
    const exist=await user.findOne({email:email});
    if(!exist){
        return res.status(404).json({message:"User not found"});
    }
    
        const isMatch=await bcrypt.compare(password,exist.passwordHash);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token=jwt.sign(
            {id:exist._id,email:exist.email},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );
        return res.status(200).json({
            token,
            id:exist._id,
            name:exist.name,
            email:exist.email,
            role:exist.role,
        });
        console.log("User logged in successfully");
};
export const logout=async(req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.status(500).json({message:"Error during logout"});
        }
        res.status(200).json({message:"logout successful"});
    })
}

