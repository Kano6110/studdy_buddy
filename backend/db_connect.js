import mongoose from "mongoose";


export const connectDB=async()=>{
    const uri=process.env.MongoDB_URI;
    if(!uri){
        console.error("MongoDB_URI is not defined in environment variables");
        process.exit(1);
    }
    else{
        try{
            await mongoose.connect(uri,{
                useUnifiedTopology:true
            });
            console.log("✅ Connected to MongoDB");
            }
            catch(error){
                console.error("❌ Error connecting to MongoDB:",error.message);
                process.exit(1);
            }
    }
};