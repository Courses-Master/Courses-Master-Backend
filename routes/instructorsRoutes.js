const express = require('express');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
    addInstructor,
    getAllInstructors
} = require('../Controllers/InstructorsController');

const validateId = require('../MiddleWares/findByIdError');
const instructors = require('../Models/InstructorsModel');
const VerifyJWT = require('../MiddleWares/VerifyJWT');

const router = express.Router();

router.get("/", VerifyJWT, getAllInstructors);
router.post("/add-instructor", VerifyJWT, addInstructor);

module.exports = router;
