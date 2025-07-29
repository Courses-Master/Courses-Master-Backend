const mongoose = require("mongoose");
require("dotenv").config();

const coursesUrl = `${process.env.db_string}Courses`;
const coursesConnection = mongoose.createConnection(coursesUrl);


function generateRandomId() {
    const length = Math.floor(Math.random() * 3) + 2;
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const instructorsSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: generateRandomId()
    },
    name: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        required: false,
        type: String
    }

});

const instructors = coursesConnection.model("instructor", instructorsSchema);

module.exports = instructors;
