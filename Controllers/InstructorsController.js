const expressAsyncHandler = require("express-async-handler");
const instructors = require("../Models/InstructorsModel");
const OTP = require("../Models/OTPModel");
const transporter = require("../utils/mailTransporter");
const generateUniqueRandomId = require("../utils/generateRandomId");

// get All Instructors
const getAllInstructors = expressAsyncHandler(async (req, res) => {
    const allInstructors = await instructors.find()
    res.json({ data: allInstructors });
});


// get Instructors by Id
const instructorById = expressAsyncHandler(async (req, res) => {
    const instructorId = req.params.instructorId;
    const instructor = await instructors.findOne({ id: instructorId })
    res.json({ data: [instructor] });
});

// add instructor
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
                    : `${missingFields[0]} is required`,
        });
    }

    // check if instructor has been added
    const sameEmail = await instructors.findOne({ email });
    if (sameEmail) {
        return res.status(400).json({ message: "Instructor already exists" });
    }

    // generate id for each instructor
    const id = await generateUniqueRandomId();

    const generateStrongPassword = (length = 10) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        return password;
    };
    // generate password for each instructor and sent it in email
    const password = generateStrongPassword();

    await instructors.create({
        id,
        name,
        email,
        phone,
    });

    await OTP.create({ email, password });

    await transporter.sendMail({
        to: email,
        from: "Courses Master",
        subject: "Invitation to join Course Master",
        text: `Welcome to Course Master!
Email: ${email}
Password: ${password}`,
    });

    res.status(201).json({ message: "The verification code has been sent to your email." });
});


// const login = expressAsyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const requiredKeys = [];

//     if (!email) requiredKeys.push("email");
//     if (!password) requiredKeys.push("password");

//     if (requiredKeys.length > 0) {
//         return res.status(404).json(
//             requiredKeys.length > 1
//                 ? { message: `${requiredKeys.join(" and ")} are required` }
//                 : { message: `${requiredKeys.join("")} is required` }
//         );
//     }

//     const user = await Users.findOne({ email: email }).select("-__v");
//     if (!user.isVerified) {
//         return res.status(403).json({ message: "Please verify your email first" });
//     }
//     if (!user) {
//         return res.status(404).json({ message: "Invalid credentials" });
//     }


//     const isMatch = await bcrypt.compare(password.toString(), user.password);
//     if (!isMatch) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = generateJwt({ email, id: user._id });

//     if (user && isMatch) {
//         res.json({ data: user, token: token });
//     }
// });



const deleteInstructor = expressAsyncHandler(async (req, res) => {
    const instructorId = req.params["instructorId"]
    if (!instructorId) {
        return res.status(422).json({ message: "Id Not Found" });
    }
    console.log(req.params);

    await instructors.deleteOne({ id: instructorId })
    const allInstructors = await instructors.find()
    res.json({ message: "instructor deleted successfully", data: allInstructors })
})

// const deleteAllUsers = expressAsyncHandler(async (req, res) => {
//     await Users.deleteMany({});
//     res.json({ message: "users deleted successfully" });
// });

module.exports = {
    addInstructor,
    getAllInstructors,
    instructorById,
    deleteInstructor
};
