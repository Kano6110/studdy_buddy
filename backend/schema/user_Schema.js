import { create } from "domain";
import mongoose from "mongoose";
import { type } from "os";

const useSchema=new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        enum:['student','tutor','admin'],
        default:'student',
    },
    password_hash:{
        type:String,
        required:true,
    },
    avatar_url:{
        type:String,
        default:'',
    },
    bio:{
        type:String,
        default:'', 
    },
    subjects:{
        type:[String],
        default:[],
    },
    availability:{
        type:[String],
        default:[],
    },
    created_at:{
        type:Date,
        default:Date.now,
    }
});

const User=mongoose.model('User',useSchema);
export default User;