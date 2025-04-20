const mongoose = require('mongoose');
require('dotenv').config();
const mySecret = process.env.MONGO_URI;

const initialDbConnection = async () => {
  try {
    await mongoose.connect(mySecret);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  } 
};

module.exports = initialDbConnection; 
