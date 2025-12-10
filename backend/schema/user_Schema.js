import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleID: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ["student", "tutor", "admin"],
      default: "student",
    },

    passwordHash: {
      type: String,
      required: true,
    },

    avatar_url: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    subjects: {
      type: [String],
      default: [],
    },

    availability: [
      {
        day: { type: String },
        from: { type: String },
        to: { type: String },
      }
    ]
  },

  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);
export default User;
