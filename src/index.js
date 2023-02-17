require('dotenv').config();
const express = require("express");
const connectDB = require('../src/config/dbConnection');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const v1MpesaPaymentRoutes = require("./v1/routes/mpesaRoutes");
const Payment = require("./models/Payment");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();


// For testing purposes 
app.get("/", (req, res) => {
    res.send("<h2>It's Working!</h2>");
});

app.use('/api/v1/payment', v1MpesaPaymentRoutes);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => { console.log(`Server running on ${PORT} ...`); });
})