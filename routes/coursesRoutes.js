import express from 'express'
import {
    getAllCourses,
    addCourse,
    courseById,
    deleteAllCourses
} from '../Controllers/coursesController.js'
import validateId from '../MiddleWares/findByIdError.js'
import VerifyJWT from '../MiddleWares/VerifyJWT.js'
import courses from '../Models/coursesModel.js'
const coursesRouter = express.Router()

coursesRouter.get("/", getAllCourses)
coursesRouter.get("/:courseId", validateId(courses,"courseId"), courseById)
coursesRouter.post("/addCourse", addCourse)
coursesRouter.delete("/deleteCourses", deleteAllCourses)
export default coursesRouter