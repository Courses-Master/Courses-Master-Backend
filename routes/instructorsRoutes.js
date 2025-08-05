const express = require('express');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
    addInstructor,
    getAllInstructors,
    instructorById,
    deleteInstructor
} = require('../Controllers/InstructorsController');

const validateId = require('../MiddleWares/findByIdError');
const instructors = require('../Models/InstructorsModel');
const VerifyJWT = require('../MiddleWares/VerifyJWT');

const router = express.Router();

router.get("/", VerifyJWT, getAllInstructors);
router.get("/:instructorId", validateId(instructors, "instructorId"), instructorById);
router.post("/add-instructor", VerifyJWT, addInstructor);
router.delete("/delete-instructor/:instructorId", validateId(instructors,"instructorId"), deleteInstructor);

module.exports = router;