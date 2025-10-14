const expressAsyncHandler = require("express-async-handler");
const courses = require("../Models/coursesModel");
const imagekit = require("../Storage/Storage");
const fs = require("fs");
const path = require("path");
const generateUniqueRandomId = require("../utils/generateRandomId");
const instructors = require("../Models/InstructorsModel");
const createError = require("../utils/createError");

const getAllCourses = expressAsyncHandler(async (req, res) => {
  const allCourses = await courses.find()
  res.json({ data: allCourses });
});

const courseById = expressAsyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const course = await courses.findOne({ id: courseId })
  res.json({ data: [course] });
});

const addCourse = expressAsyncHandler(async (req, res) => {
  const { title, instructor, price, category, description } = req.body;
  const missingFields = [];

  if (!title) missingFields.push("title");
  if (!instructor) missingFields.push("instructor");
  if (!price) missingFields.push("price");
  if (!category) missingFields.push("category");
  if (!description) missingFields.push("description");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message:
        missingFields.length > 1
          ? `${missingFields.join(" and ")} are required`
          : `${missingFields.join()} is required`,
    });
  }

  const sameCourse = await courses.findOne({ title: title?.trim() });
  if (sameCourse) {
    throw createError("course is already exist", 409)
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
  const generateId = await generateUniqueRandomId()

  const assignInstructor = await instructors.findOne({ id: instructor }).select("-_id -__v -has_assigned")

  if (!assignInstructor) {
    throw createError("instructor Not Found", 409)
  }
  await instructors.updateOne(
    { id: instructor },
    { $set: { has_assigned: true } }
  );
  await courses.create({
    id: generateId,
    title,
    price,
    description,
    category,
    instructor: assignInstructor,
    courseImage: avatarUrl,
  });
  const allCourses = await courses.find()

  res.json({ data: allCourses });
});

const updateCourse = expressAsyncHandler(async (req, res) => {
  const { title, instructor, price, category, description, videos } = req.body;
  const { courseId } = req.params;

  const course = await courses.findOne({ id: courseId })
  const courseInstructors = course?.instructor
  let courseVideos

  const assignInstructor = await instructors.findOne({ id: instructor }).select("-_id -__v -has_assigned")
  console.log(courseInstructors);


  if (!assignInstructor && courseInstructors.length === 0) {
    throw createError("Instructor Not Found", 404)
  }

  const updatedInstructors = [...courseInstructors, assignInstructor];

  if (course.videos.length > 0 && !course.videos.includes(videos)) {
    courseVideos = [...course.videos, videos];
  } else {
    courseVideos = [videos]
  }



  const updatedCourse = await courses.findOneAndUpdate(
    { id: courseId },
    { title, instructor: updatedInstructors, price, category, description, videos: courseVideos },
    { new: true, runValidators: true }
  );

  if (!updatedCourse) {
    return res.status(404).json({ message: { error: "Course Not Found" } });
  }


  res.status(200).json({
    message: "Course updated successfully",
    data: updatedCourse
  });
});




const deleteCourse = expressAsyncHandler(async (req, res) => {
  const courseId = req.params.courseId
  await courses.deleteOne({ id: courseId });
  const findCourses = await courses.find()
  res.json({ message: "course deleted successfully", data: [findCourses] });
});

module.exports = {
  getAllCourses,
  addCourse,
  updateCourse,
  courseById,
  deleteCourse,
};
