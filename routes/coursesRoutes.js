const express = require('express');
const {
  getAllCourses,
  addCourse,
  courseById,
  deleteAllCourses
} = require('../Controllers/coursesController');
const validateId = require('../MiddleWares/findByIdError');
const VerifyJWT = require('../MiddleWares/VerifyJWT');
const courses = require('../Models/coursesModel');

const coursesRouter = express.Router();

coursesRouter.get("/", getAllCourses);
coursesRouter.get("/:courseId", validateId(courses, "courseId"), courseById);
coursesRouter.post("/addCourse", addCourse);
coursesRouter.delete("/deleteCourses", deleteAllCourses);

module.exports = coursesRouter;
