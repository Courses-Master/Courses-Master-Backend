const mongoose = require("mongoose");
require("dotenv").config();

const coursesUrl = `${process.env.db_string}Courses`;
const coursesConnection = mongoose.createConnection(coursesUrl);

const coursesSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    required: true,
    type: String,
  },
  instructor: {
    type: Array,
    required: true,
  },
  category: {
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
  videos: {
    type: Array,
    required: true
  },
  courseImage: {
    type: String,
    default: "",
    required: true,
  }
}, { timestamps: true });


coursesSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const courses = coursesConnection.model("courses", coursesSchema);

module.exports = courses;
