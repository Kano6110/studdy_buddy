import mongoose from "mongoose";
import express from "express";
import user from "../model/userSch.js";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import { access } from "fs";
import passport from "passport";

export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    const isexistuser=await user.findOne({email:email});
    if(isexistuser){
        return res.status(400).json({message:"User already exist"});
    }
    try{
    const hashedpassword=await bycrpt.hash(password,10);
    const newuser= new user({
        _id:new mongoose.Types.ObjectId(),
        name:name,
        email:email,
        password_hash:hashedpassword,
    });
}    catch(error){
    console.error("Error during user registration:", error);
    return res.status(500).json({ message: "Internal server error during registration" });
}

};

export const login=async (req,res)=>{
    const {email,password}=req.body;
    const exist=await user.findOne({email:email});
    if(!exist){
        return res.status(404).json({message:"User not found"});
    }
    
        const isMatch=await bycrpt.compare(password,exist.password_hash);
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

