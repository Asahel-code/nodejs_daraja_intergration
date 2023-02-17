require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    }
    catch (error) {
        console.log(error.message);
    }
}
module.exports = connectDB