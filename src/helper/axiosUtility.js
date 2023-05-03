require('dotenv').config();
const { default: axios } = require("axios");

const BASE_URL = process.env.BASE_URL;

const AxiosUtility = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    accept: 'application/json',
  },
});

module.exports = AxiosUtility;