const express = require('express');
const router = express.Router();
const stkPushController = require('../../controller/stkPushController');
const c2bController = require('../../controller/c2bContoller');
const getBalanceController = require('../../controller/getBalanceContoller');
const getTranscationStatus = require('../../controller/getTranscationStatus');
const accessToken = require('../../middleware/generateAccessToken');

//Mpesa express routes
router.get("/simulate/:phoneNumber&:amount", accessToken, stkPushController.performPayment);
router.post("/transactionsStatus", stkPushController.getTransctionsStatus);

// Get transaction status
router.get("/transactionQuery/:transactionID", accessToken, getTranscationStatus.getTranscationStatus);
router.post("/TransactionStatus/result/", getTranscationStatus.transctionsStatusResults);

//Account balance routes
router.get("/balance", accessToken, getBalanceController.getBalance);
router.post("/AccountBalance/queue", getBalanceController.accountBalanceQueue);
router.post("/AccountBalance/result", getBalanceController.accountBalanceResults);

module.exports = router;
