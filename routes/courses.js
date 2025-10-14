const express = require('express');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  getAllCourses,
  addCourse,
  courseById,
  updateCourse,
  deleteCourse
} = require('../Controllers/coursesController');
const validateId = require('../MiddleWares/findByIdError');
const courses = require('../Models/coursesModel');
const AccessRole = require('../MiddleWares/AccessRole');
const {
  getStudentCourses,
  enrollCourse
} = require("../Controllers/EnrolledCoursesController")
const coursesRouter = express.Router();

coursesRouter.get("/", getAllCourses);
coursesRouter.get("/student-courses", AccessRole('student'), getStudentCourses);
coursesRouter.get("/:courseId", validateId(courses, "courseId"), courseById);
coursesRouter.post("/addCourse", upload.single("courseImage"), AccessRole('admin'), addCourse);
coursesRouter.post("/enroll-course/:courseId", AccessRole('student'), validateId(courses, "courseId"), enrollCourse);
coursesRouter.put("/update-course/:courseId", AccessRole('admin'), validateId(courses, "courseId"), upload.single("courseImage"), updateCourse);
coursesRouter.delete("/deleteCourse/:courseId", AccessRole('admin'), validateId(courses, "courseId"), deleteCourse);

module.exports = coursesRouter;
