import mongoose from "mongoose";


if(!process.env.MONGO_URI){
    throw new Error("Please provide MONGO_URI ")
}
const connectDb = async (req, res) =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log("Database is connected"))
        .catch((error) => console.log(error))
    }
    catch(error){
        console.error("Server is not connected");
        process.exit(1);
    }
}

export default connectDb;