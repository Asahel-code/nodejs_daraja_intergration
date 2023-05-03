require('dotenv').config();
const path = require("path");
const fs = require('fs');
const https = require('https');
const { default: axios } = require("axios");

__dirname = path.resolve('./');

const certificate = fs.readFileSync(path.join(__dirname, '/cert/cacert.pem'));

const agent = new https.Agent({
  rejectUnauthorized: true,
  cert: certificate,
});

const BASE_URL = process.env.BASE_URL;

const AxiosUtility = axios.create({
  httpsAgent: agent,
  baseURL: `${BASE_URL}`,
  headers: {
    accept: 'application/json',
  },
});

module.exports = AxiosUtility;