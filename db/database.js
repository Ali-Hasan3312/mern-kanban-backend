import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'kanban',
    }).then((c)=>console.log(`MongoDB Connected to ${c.connection.host}`))
    .catch((err)=>console.log(`MongoDB connection error: ${err}`));
}