const express = require('express');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
    getAllUsers,
    userById,
    register,
    login,
    deleteAllUsers
} = require('../Controllers/usersController');

const validateId = require('../MiddleWares/findByIdError');
const Users = require('../Models/usersModel');
const VerifyJWT = require('../MiddleWares/VerifyJWT');

const router = express.Router();

router.get("/", VerifyJWT, getAllUsers);
router.get("/:userId", validateId(Users, "userId"), userById);
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.delete("/delete", deleteAllUsers);

module.exports = router;
