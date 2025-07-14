const expressAsyncHandler = require("express-async-handler");
const Users = require("../Models/usersModel");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path")
const fs = require("fs");
const imagekit = require("../Storage/Storage");
const jwt = require("jsonwebtoken");
const generateJwt = require("../MiddleWares/generateJwt");

const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await Users.find().select("-__v");
    res.json({ data: users });
});

const userById = expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await Users.findById(userId);
    res.json(user);
});



const register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (!role) missingFields.push("role");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message:
        missingFields.length > 1
          ? `${missingFields.join(" and ")} are required`
          : `${missingFields.join()} is required`,
    });
  }

  const sameEmail = await Users.findOne({ email });
  if (sameEmail) {
    return res.status(400).json({ message: "user is already exist" });
  }

  let avatarUrl = "";

if (req.file) {
  const buffer = fs.readFileSync(req.file.path)
  const ext = path.extname(req.file.originalname) || ".jpg";
  const fileName = `${Date.now()}${ext}`;

    const uploaded = await imagekit.upload({
      file: buffer,
      fileName,
    });

    avatarUrl = uploaded.url;
    fs.unlinkSync(req.file.path); 
}

  const passwordHashed = await bcrypt.hash(password.toString(), 10);

  const newUser = await Users.create({
    name,
    email,
    password: passwordHashed,
    phone,
    role,
    avatar: avatarUrl,
  });

  const token = await generateJwt({ email: newUser.email, id: newUser._id });

  res.json({ data: newUser, token });
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
    getAllUsers,
    userById,
    register,
    login,
    deleteAllUsers,
};
