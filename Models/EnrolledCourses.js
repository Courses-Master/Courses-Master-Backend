const mongoose = require("mongoose");
require("dotenv").config();

const EnrolledCoursesUrl = `${process.env.db_string}EnrolledCourses`;
const EnrolledCoursesConnection = mongoose.createConnection(EnrolledCoursesUrl);

const EnrolledCoursesSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  enrolledEmails: {
    type: Array,
    required: true
  },
  course: {
    type: Object,
    required: true
  }
}, { timestamps: true });


EnrolledCoursesSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    delete ret._id;
    return ret;
  }
});

const EnrolledCourses = EnrolledCoursesConnection.model("EnrolledCourses", EnrolledCoursesSchema);

module.exports = EnrolledCourses;
