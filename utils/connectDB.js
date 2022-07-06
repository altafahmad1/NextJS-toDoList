import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => mongoose.connect(process.env.MONGO_URI);

export default connectDB;
