const mongoose = require("mongoose");
require("dotenv").config();

const coursesUrl = `${process.env.db_string}Courses`;
const coursesConnection = mongoose.createConnection(coursesUrl);

const coursesSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  instructor: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const courses = coursesConnection.model("courses", coursesSchema);

module.exports = courses;
