import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/elegance`);
        console.log('DB connected');
    } catch (error) {
        console.log(`Something went wrong ${error}`);
    }
}

export default connectDB;