require('dotenv').config();
const AxiosUtility = require('../helper/axiosUtility');

const accessToken = async (req, res, next) => {
    let url = "/oauth/v1/generate?grant_type=client_credentials"
    let auth = new Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString("base64");

    await AxiosUtility.get(url, {
        headers: {
            "Authorization": "Basic " + auth
        }
    })
        .then((response) => {
            req.access_token = response.data.access_token
            next()
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = accessToken;