const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {

    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;
