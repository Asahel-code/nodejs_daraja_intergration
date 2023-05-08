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
    const password = new Buffer.from("174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");

    const data = {
        BusinessShortCode: "174379",
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: "174379",
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

const getTransctionsStatus = (req, res) => {
    console.log(".......................STK............................")
    if (req.body.Body.stkCallback.ResultCode === 0) {
        req.body.Body.stkCallback.CallbackMetadata.Item.forEach(((element) => {
            Object.values(element)[1];
            const newPayment = new Payment({

            });
        }))
        res.status(200).json(req.body.Body.stkCallback.CallbackMetadata.Item)
    }
    else if (req.body.Body.stkCallback.ResultCode === 1032) {
        console.log(req.body.Body.stkCallback)
    }
}

module.exports = {
    performPayment,
    getTransctionsStatus
}