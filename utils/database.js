import mongoose from "mongoose";
let isConnected = false;

export const connectDb = async ()=>{
    mongoose.set('strictQuery', true);
    if (isConnected) {
       
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            dbName:'share_prompt'
        })
        isConnected = true;
        console.log("database connected ..............")
    }catch(err){
        console.log(err)
    }
}