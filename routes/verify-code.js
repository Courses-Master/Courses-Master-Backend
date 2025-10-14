const express = require('express');
const verifyOTP = require('../Controllers/OTP-Controller');

const router = express.Router();

router.post("/", verifyOTP);

module.exports = router;
