const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        mpesaReceiptNumber: { type: String, required: true, unique: true },
        amount: { type: Number, required: true },
        phoneNumber: { type: Number, required: true },
        transactionDate: { type: Number, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Payments', PaymentSchema);
