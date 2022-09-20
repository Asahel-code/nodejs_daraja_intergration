require('dotenv').config();
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const v1MpesaPaymentRoutes = require("./v1/routes/mpesaRoutes")

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;



// For testing purposes 
app.get("/", (req, res) => {
    res.send("<h2>It's Working!</h2>");
});

app.use('/api/v1/payment', v1MpesaPaymentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT} ...`);
});


