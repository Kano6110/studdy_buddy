console.log("passport.js loaded");  // <- top of passport.js
import passport from "passport"; 
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv"; 
import path from 'path'; dotenv.config({ path: path.resolve("./.env") });
import User from "./schema/user_Schema.js";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google strategy called"); // ✅ first debug
      console.log("Profile received:", profile); // ✅ shows Google profile
      try {
        let user = await User.findOne({ googleID: profile.id });
        if (!user) {
          console.log("User not found, creating new user..."); // ✅ debug
          user = new User({
            googleID: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
          console.log("New Google user saved:", user); // ✅ debug
        } else {
          console.log("User already exists:", user); // ✅ debug
        }
        return done(null, user);
      } catch (error) {
        console.error("Error saving Google account:", error);
        return done(error, null);
      }
    }
  )
);
