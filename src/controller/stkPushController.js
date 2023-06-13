require('dotenv').config();
const Payment = require("../models/Payment");
const AxiosUtility = require("../helper/axiosUtility");

const performPayment = async (req, res) => {

    // get phone number and amount from url params
    const { phoneNumber } = req.params
    const { amount } = req.params


    let url = "/mpesa/stkpush/v1/processrequest"
    let auth = "Bearer " + req.access_token


    const timestamp = new Date()
        .toISOString()
        .replace(/[^0-9]/g, '')
        .slice(0, -3);
    const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");

    const data = {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.BUSINESS_SHORT_CODE,
        PhoneNumber: phoneNumber,
        CallBackURL: `${process.env.APP_URL}/api/v1/payment/stkpush/result/`,
        AccountReference: "Hello",
        TransactionDesc: "Test"
    }


    await AxiosUtility.post(url,
        data, {
        headers: {
            Authorization: auth
        },
    })
        .then((response) => {
            return res.status(200).json(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

const querySTKPayment = async (req, res) => {

    const { checkoutRequestID } = req.params

    let url = "/mpesa/stkpushquery/v1/query"
    let auth = "Bearer " + req.access_token


    const timestamp = new Date()
        .toISOString()
        .replace(/[^0-9]/g, '')
        .slice(0, -3);
    const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");

    const data = {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestID,
    }


    await AxiosUtility.post(url,
        data, {
        headers: {
            Authorization: auth
        },
    })
        .then((response) => {
            return res.status(200).json(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
}

const getTransctionsStatus = (req, res, next) => {
    if (req.method === "POST") {
        const data = req.body;

        console.log(data.Body.stkCallback)
    }
}

module.exports = {
    performPayment,
    querySTKPayment,
    getTransctionsStatus
}