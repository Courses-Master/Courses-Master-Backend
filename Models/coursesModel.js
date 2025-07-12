import mongoose from "mongoose";
import "dotenv/config"
const coursesUrl = `${process.env.db_string}Courses`
const coursesConnection = mongoose.createConnection(coursesUrl)

const coursesSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    instructor: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const courses = coursesConnection.model('courses', coursesSchema)
export default courses