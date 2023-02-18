require('dotenv').config();
const request = require("request");

const getTranscationStatus = (req, res) => {

    const { transactionID } = req.params

    let url = "https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query";
    let auth = "Bearer " + req.access_token;

    const password = new Buffer.from("600996" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919").toString("base64");

    request(
        {
            url: url,
            method: "POST",
            headers: {
                Authorization: auth
            },
            json: {
                Initiator: "testapi",
                SecurityCredential: password,
                CommandID: "TransactionStatusQuery",
                TransactionID: transactionID,
                PartyA: "600996",
                IdentifierType: "1",
                ResultURL: `${process.env.APP_URL}/transactionStatus/result/`,
                QueueTimeOutURL: `${process.env.APP_URL}/transactionStatus/queue/`,
                Remarks: "Hello",
                Occasion: "1"
            }
        },
        (error, response, body) => {
            if (error) return res.status(500).json(error)
            else return res.status(200).json(body)
        }
    )
}

const transctionsStatusResults = (req, res) => {
    console.log(".......................MSISDN............................")
    console.log(req.body)
}

module.exports = {
    getTranscationStatus,
    transctionsStatusResults
}