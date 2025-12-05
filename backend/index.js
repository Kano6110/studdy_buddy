import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve("./.env") }); 
import session from 'express-session';
import "./passport.js";
import passport from 'passport';


const app=express();
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//google route
app.get('/auth/google',
    passport.authenticate("google",{scope:["profile","email"]})
);
app.get('/auth/google/callback',
    passport.authenticate("google",{
        failureRedirect:'/login',}),
        (req,res)=>{
            res.redirect('http://localhost:5173/home');
        }
);


mongoose.connect(process.env.MongoDB_URI)
.then(() => {
    console.log("✅ Connected to MongoDB");
})
.catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
});

app.listen(5000, () => {
    console.log("🚀 Server is running on port 5000");
});

