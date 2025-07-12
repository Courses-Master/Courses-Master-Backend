import expressAsyncHandler from "express-async-handler";
import Users from "../Models/usersModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generateJwt from "../MiddleWares/generateJwt.js";
const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await Users.find().select("-__v");
    res.json({ data: users })
})

const userById = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId
    const user = await Users.findById(userId);
    res.json(user)
})

const register = expressAsyncHandler(async (req, res) => {
    const { name, email, password, phone, role, avatar } = req.body
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!role) missingFields.push("role");
    if (missingFields.length > 0) {
        return res.status(400).json({ message: missingFields.length > 1 ? `${missingFields.join(" and ")} are required` : `${missingFields.join()} is required` });
    }
    // find same email for another user
    const sameEmail = await Users.findOne({ email: email })
    if (sameEmail) {
        return res.status(400).json({ message: "user is already exist" });
    }
    const passwordHashed = await bcrypt.hash(password.toString(), 10)
    const newUser = await Users.create({
        name,
        password: passwordHashed,
        email,
        phone,
        role,
        avatar
    })
    // generate jwt
    const token = await jwt.sign({ email: newUser.email, id: newUser._id }, process.env.secrete_key, { expiresIn: "5m" })

    res.json({ data: newUser, token: token })
})

const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const requiredKeys = []
    if (!email) requiredKeys.push("email")
    if (!password) requiredKeys.push("password")
    if (requiredKeys.length > 0) {
        return res.status(404).json(requiredKeys.length > 1 ? { message: `${requiredKeys.join(" and ")} are required` } : { message: `${requiredKeys.join("")} is required` })
    }
    const user = await Users.findOne({ email: email }).select("-__v")
    if (!user) {
        return res.status(404).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password.toString(), user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateJwt({ email, id: user._id })
    if (user && isMatch) {
        res.json({ data: user, token: token })
    }
})
const deleteAllUsers = expressAsyncHandler(async (req, res) => {
    await Users.deleteMany({})
    res.json({ message: "users deleted successfully" })
})

export {
    getAllUsers
    , userById,
    register,
    login,
    deleteAllUsers
}