const mongoose = require("mongoose");
require("dotenv").config();

const OTPUrl = `${process.env.db_string}OTP`;
const OTPConnection = mongoose.createConnection(OTPUrl);

const OTPSchema = new mongoose.Schema({
  email: {
    type: String
  },
  code: {
    type: String
  }
}, { timestamps: true });

const OTP = OTPConnection.model("OTP", OTPSchema);

module.exports = OTP;
