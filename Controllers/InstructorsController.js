const expressAsyncHandler = require("express-async-handler");
const instructors = require("../Models/InstructorsModel");
const bcrypt = require("bcrypt");
const path = require("path")
const fs = require("fs");
const imagekit = require("../Storage/Storage");
const generateJwt = require("../utils/generateJwt");
const OTP = require("../Models/OTPModel");
const nodemailer = require("nodemailer");

const getAllInstructors = expressAsyncHandler(async (req, res) => {
    const allInstructors = await instructors.find().select("-__v");
    res.json({ data: allInstructors });
});

// const instructorById = expressAsyncHandler(async (req, res) => {
//   const userId = req.params.userId;
//   const user = await Users.findById(userId);
//   res.json(user);
// });


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mwmnadl11@gmail.com",
        pass: 'etew srhw xvxy hgde',
    },
});
const addInstructor = expressAsyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message:
                missingFields.length > 1
                    ? `${missingFields.join(" and ")} are required`
                    : `${missingFields.join()} is required`,
        });
    }

    const sameEmail = await instructors.findOne({ email });
    if (sameEmail) {
        return res.status(400).json({ message: "instructor is already exist" });
    }

    await instructors.create({
        name,
        email,
        phone,
    });
    function generateStrongPassword(length = 10) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        return password;
    }

    await OTP.create({ email, password: generateStrongPassword() });

    await transporter.sendMail({
        to: email,
        from: "Courses Master",
        subject: "invitation to add you instructor in Course Master",
        text: `email: ${email}
        password : ${generateStrongPassword()} 
        `,
    });

    res.status(201).json({ message: "The verification code has been sent to your email." });
});


const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const requiredKeys = [];

    if (!email) requiredKeys.push("email");
    if (!password) requiredKeys.push("password");

    if (requiredKeys.length > 0) {
        return res.status(404).json(
            requiredKeys.length > 1
                ? { message: `${requiredKeys.join(" and ")} are required` }
                : { message: `${requiredKeys.join("")} is required` }
        );
    }

    const user = await Users.findOne({ email: email }).select("-__v");
    if (!user.isVerified) {
        return res.status(403).json({ message: "Please verify your email first" });
    }
    if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
    }


    const isMatch = await bcrypt.compare(password.toString(), user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateJwt({ email, id: user._id });

    if (user && isMatch) {
        res.json({ data: user, token: token });
    }
});

const deleteAllUsers = expressAsyncHandler(async (req, res) => {
    await Users.deleteMany({});
    res.json({ message: "users deleted successfully" });
});

module.exports = {
    addInstructor,
    getAllInstructors
};
