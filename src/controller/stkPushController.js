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
    if (req.method === "POST") {
        const data = req.body;

        if (data.Body.stkCallback.ResultCode === 0) {
            var Item = data.Body.stkCallback.CallbackMetadata.Item;

            var metadata = {
                MerchantRequestID: data.Body.stkCallback.MerchantRequestID,
                CheckoutRequestID: data.Body.stkCallback.CheckoutRequestID,
                ResultCode: data.Body.stkCallback.ResultCode,
                ResultDesc: data.Body.stkCallback.ResultDesc
            };

            var mpesaData = Item.reduce(function (obj, item) {
                obj[item.Name] = item.Value;
                return obj;
            }, metadata);

            console.log(mpesaData);
        }
        else if (data.Body.stkCallback.ResultCode === 1032) {
            console.log(data.Body.stkCallback)
            return res.status(200).json(data.Body)
        }
        else if (data.Body.stkCallback.ResultCode === 1037) {
            console.log(data.Body.stkCallback)
            return res.status(200).json(data.Body)
        }
    }
}

module.exports = {
    performPayment,
    getTransctionsStatus
}