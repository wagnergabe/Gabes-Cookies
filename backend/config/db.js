import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://wagnergabe:Waggabr!2619@gabecookies.b7uql.mongodb.net/gabesCookies?retryWrites=true&w=majority&appName=GabeCookies");
        console.log(`Mongo Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;