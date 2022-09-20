const request = require("request");


// make payment function
const performPayment = (req, res) => {

    // get phone number from url params 
    const {
        params: { phoneNumber },
    } = req;

    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
    let auth = "Bearer " + req.access_token

    request(
        {
            url: url,
            method: "POST",
            headers: {
                Authorization: auth
            },
            json: {
                CommandID: "CustomerPayBillOnline",
                Amount: "1",
                Msisdn: phoneNumber,
                BillRefNumber: "00000",
                ShortCode: "600247",
            }
        },
        (error, response, body) => {
            if (error) { console.log(error) }
            else { res.status(200).json(body) }
        }
    )
}

const confirm = (req, res) => {
    console.log(".......................Confirmation............................")
    console.log(req.body)
}

const validate = (req, res) => {
    console.log(".......................Validation............................")
    console.log(req.body)
}

module.exports = { 
    performPayment,
    confirm,
    validate
}