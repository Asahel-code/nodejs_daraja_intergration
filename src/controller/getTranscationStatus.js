require('dotenv').config();
const AxiosUtility = require("../helper/axiosUtility");

const getTranscationStatus = async (req, res) => {

    const { transactionID } = req.params

    let url = "/mpesa/transactionstatus/v1/query";
    let auth = "Bearer " + req.access_token;

    const password = new Buffer.from("600996" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919").toString("base64");

    const data = {
        Initiator: "testapi",
        SecurityCredential: password,
        CommandID: "TransactionStatusQuery",
        TransactionID: transactionID,
        IdentifierType: "Organization shortcode",
        PartyA: "600996",
        IdentifierType: "1",
        ResultURL: `${process.env.APP_URL}/transactionStatus/result`,
        QueueTimeOutURL: `${process.env.APP_URL}/transactionStatus/queue`,
        Remarks: "Hello",
        Occasion: "1"
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

const transctionsStatusResults = (req, res) => {
    console.log(".......................Results............................")
    console.log(req.body)
}

const transctionsStatusQueue = (req, res) => {
    console.log(".......................TimeOut............................")
    console.log(req.body)
}

module.exports = {
    getTranscationStatus,
    transctionsStatusResults,
    transctionsStatusQueue
}