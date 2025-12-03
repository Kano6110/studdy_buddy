const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const userRoute = require('./route/userRoute');
const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
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