const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mwmnadl11@gmail.com",
        pass: 'etew srhw xvxy hgde',
    },
});
module.exports = transporter