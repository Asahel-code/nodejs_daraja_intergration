require('dotenv').config();
const AxiosUtility = require('../helper/axiosUtility');

const getBalance = async (req, res) => {
    let url = "/mpesa/accountbalance/v1/query";
    let auth = "Bearer " + req.access_token;

    const password = new Buffer.from("600996" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919").toString("base64");

    const data = {
        Initiator: "testapi",
        SecurityCredential: password,
        CommandID: "AccountBalance",
        PartyA: "600978",
        IdentifierType: "4",
        Remarks: "Remarks",
        QueueTimeOutURL: `${process.env.APP_URL}/AccountBalance/queue/`,
        ResultURL: `${process.env.APP_URL}/AccountBalance/result/`
    }

    await AxiosUtility.post(url, {
        headers: {
            Authorization: auth
        },
    }, data)
        .then((response) => {
            return res.status(200).json(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
}

const accountBalanceQueue = (req, res) => {
    console.log(".......................Balance Timeout Response...........................")
    console.log(req.body)
};

const accountBalanceResults = (req, res) => {
    console.log(".......................Balance Response...........................")
    console.log(req.body)
};

module.exports = {
    getBalance,
    accountBalanceQueue,
    accountBalanceResults
}