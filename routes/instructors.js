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

const router = express.Router();

router.get("/", getAllInstructors);
router.get("/:instructorId", validateId(instructors, "instructorId"), instructorById);
router.post("/add-instructor", addInstructor);
router.delete("/delete-instructor/:instructorId", validateId(instructors, "instructorId"), deleteInstructor);

router.Access_Role = ["admin"]

module.exports = router;