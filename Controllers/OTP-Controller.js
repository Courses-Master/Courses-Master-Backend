const expressAsyncHandler = require("express-async-handler");
const OTP = require("../Models/OTPModel");
const Users = require("../Models/usersModel");
const verifyOTP = expressAsyncHandler(async (req, res) => {
    const { email, code } = req.body
    const verify = await OTP.findOne({ email, code })
    if (!verify) {
        return res.status(400).json({ error: 'Invalid or expired code' });
    }
    await OTP.deleteMany({ email });
    const user = await Users.findOne({ email });
    await user.updateOne({ isVerified: true });
    res.json({ message: 'Verification successful' });
});
module.exports = verifyOTP