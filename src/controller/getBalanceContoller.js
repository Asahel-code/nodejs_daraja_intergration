require('dotenv').config();
const request = require("request");

const getBalance = (req, res) => {
    let url = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query"
    let auth = "Bearer " + req.access_token

    request(
        {
            url: url,
            method: "POST",
            headers: {
                Authorization: auth
            },
            json: {
                Initiator: "testApi584!",
                SecurityCredential: "RpNt7V0rS1osZ3Yx18iVwVkzOji8ZZBVqqzgmAwC6kfbJy8+zcFkE7VKZIRYISZaTHDqlS3LDlLJXoyFlMGChj4OvC66g9sgfA2Dl9/cNctAz4qo0HS4+X05uS//brr5tfkUjhFAB+l91UKlIWpQezD4fKAI0GnWIkb3WC1Rce8p1XXSFRSHnkaGScQhrabolPEIVk7tkrnCWl4UY9ghTkADY7QmIZN9pB+uhDkanfcb3T1aY4jGoeU6PG7+gR37Fvc7jdL7e1YNOqaDaZuSRSozs83oWJwDqM/XRAJCblgLO60CtHORGIGdlDmNt5qMt5Z/2ADKS7F6jGfr/9NzfA==",
                CommandID: "AccountBalance",
                PartyA: "600584",
                IdentifierType: "4",
                Remarks: "Remarks",
                QueueTimeOutURL: `${process.env.APP_URL}/AccountBalance/queue/`,
                ResultURL: `${process.env.APP_URL}/AccountBalance/result/`
            }
        },
        (error, response, body) => {
            if (error) { console.log(error) }
            else { res.status(200).json(body) }
        }
    )
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