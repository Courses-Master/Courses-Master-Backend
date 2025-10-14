const expressAsyncHandler = require("express-async-handler")
const enrolledCourses = require("../Models/EnrolledCourses")
const courses = require("../Models/coursesModel")
const createError = require("../utils/createError")

const enrollCourse = expressAsyncHandler(async (req, res) => {
    const { courseId } = req.params
    let emails = []
    const studentEmail = req.user.email
    const findCourse = await courses.findOne({ id: courseId }).select("-__v")
    const course = await enrolledCourses.findOne({ "id": courseId })
    console.log(course);

    if (
        course?.enrolledEmails &&
        Array.isArray(course?.enrolledEmails) &&
        course?.enrolledEmails.includes(studentEmail)
    ) {
        throw createError("you already enrolled in this course", 409)
    }
    if (course?.enrolledEmails && course?.enrolledEmails.length > 0) {
        emails = [...course?.enrolledEmails, studentEmail]
    } else {
        emails = [studentEmail]
    }
    if (course) {
        await enrolledCourses.findOneAndUpdate(
            { id: courseId },
            { $set: { enrolledEmails: emails } },
            { new: true }
        )
    } else {
        await enrolledCourses.create({
            id: courseId,
            course: findCourse,
            enrolledEmails: emails
        })
    }

    const enrolledCoursesByStudent = await enrolledCourses.find({
        enrolledEmails: studentEmail
    }).select("-enrolledEmails");

    res.json({ message: "courseEnrolledSuccessfully", data: enrolledCoursesByStudent })
})


const getStudentCourses = expressAsyncHandler(async (req, res) => {
    const { email } = req.user

    let studentCourses = await enrolledCourses.find({ enrolledEmails: email })

    if (studentCourses.length === 0 || !studentCourses) {
        throw createError("courses not found or you do not have courses yet", 404)
    }
    const courseIds = studentCourses.map((course) => course.id);

    const findUpdatedCourse = await courses.find({ id: { $in: courseIds } })

    const updatedCourseId = studentCourses.map((course) => course.id);
    console.log(updatedCourseId);

    await enrolledCourses.findOneAndUpdate(
        { id: { $in: updatedCourseId } },
        { course: findUpdatedCourse[0] },
        { new: true }
    )
    const finalStudentCourses = await enrolledCourses.find({ enrolledEmails: email }).select("-enrolledEmails")

    res.json({ data: finalStudentCourses })

})

module.exports = {
    enrollCourse,
    getStudentCourses
}