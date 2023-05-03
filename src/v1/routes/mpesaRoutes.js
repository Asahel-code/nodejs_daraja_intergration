const express = require('express');
const router = express.Router();
const stkPushController = require('../../controller/stkPushController');
const c2bController = require('../../controller/c2bContoller');
const getBalanceController = require('../../controller/getBalanceContoller');
const getTranscationStatus = require('../../controller/getTranscationStatus');
const accessToken = require('../../middleware/generateAccessToken');

//Mpesa express routes
router.get("/stkpush/:phoneNumber&:amount", accessToken, stkPushController.performPayment);
router.post("/stkpush/result/", stkPushController.getTransctionsStatus);

// Get transaction status
router.get("/transactionQuery/:transactionID", accessToken, getTranscationStatus.getTranscationStatus);
router.post("/transactionStatus/result/", getTranscationStatus.transctionsStatusResults);

//Account balance routes
router.get("/balance", accessToken, getBalanceController.getBalance);
router.post("/AccountBalance/queue", getBalanceController.accountBalanceQueue);
router.post("/AccountBalance/result", getBalanceController.accountBalanceResults);

//Mpesa C2B routes
router.get("/registerUrls", accessToken, c2bController.registerURLs);
router.get("/c2b/:phoneNumber&:amount", accessToken, c2bController.performPayment);
router.post("/confirmation", accessToken, c2bController.confirm);
router.post("/validation", accessToken, c2bController.validate);

module.exports = router;
