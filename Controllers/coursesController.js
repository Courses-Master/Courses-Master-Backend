const expressAsyncHandler = require("express-async-handler");
const courses = require("../Models/coursesModel");
const imagekit = require("../Storage/Storage");
const fs = require("fs");
const path = require("path");
const generateUniqueRandomId = require("../utils/generateRandomId");
const instructors = require("../Models/InstructorsModel");

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
  const { title, instructor, price, description } = req.body;
  const missingFields = [];

  if (!title) missingFields.push("title");
  if (!instructor) missingFields.push("instructor");
  if (!price) missingFields.push("price");
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
    return res.status(400).json({ message: "course is already exist" });
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
    return res.status(404).json({ message: { error: "instructor Not Found" } })
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
    instructor: assignInstructor,
    courseImage: avatarUrl,
  });
  const allCourses = await courses.find()

  res.json({ data: allCourses });
});

const deleteAllCourses = expressAsyncHandler(async (req, res) => {
  await courses.deleteMany({});
  res.json({ message: "courses deleted successfully" });
});

module.exports = {
  getAllCourses,
  addCourse,
  courseById,
  deleteAllCourses,
};
