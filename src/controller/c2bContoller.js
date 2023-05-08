const AxiosUtility = require("../helper/axiosUtility");

const registerURLs = async (req, res) => {
    let url = "/mpesa/c2b/v1/registerurl";
    let auth = "Bearer " + req.access_token;

    const data = {
        ShortCode: "600986",
        ResponseType: 'Completed',
        ConfirmationURL: `${process.env.APP_URL}/api/v1/payment/confirmation`,
        ValidationURL: `${process.env.APP_URL}/api/v1/payment/validation`,
    };

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


// make payment function
const performPayment = async (req, res) => {

    // get phone number from url params 
    const {
        params: { phoneNumber, amount },
    } = req;

    let url = "/mpesa/c2b/v1/simulate";
    let auth = "Bearer " + req.access_token;

    const data = {
        CommandID: "CustomerPayBillOnline",
        Amount: amount,
        Msisdn: phoneNumber,
        BillRefNumber: "00000",
        ShortCode: "600986",
    }

    await AxiosUtility.post(url, data, {
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

const confirm = (req, res) => {
    console.log(".......................Confirmation............................")
    console.log(req.body)
}

const validate = (req, res) => {
    console.log(".......................Validation............................")
    if (req.body.TransAmount == "5") {
        return res.json(
            {
                ResultCode: "0",
                ResultDesc: "Accepted",
            }
        );
    }
    else {
        return res.json(
            {
                ResultCode: "C2B00011",
                ResultDesc: "Rejected",
            }
        );
    }
    console.log(req.body)
}

module.exports = {
    registerURLs,
    performPayment,
    confirm,
    validate
}