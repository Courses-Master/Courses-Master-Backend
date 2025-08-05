const mongoose = require("mongoose");
require("dotenv").config();

const coursesUrl = `${process.env.db_string}Courses`;
const coursesConnection = mongoose.createConnection(coursesUrl);



const instructorsSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
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
    },
    has_assigned: {
        required: true,
        type: Boolean,
        default: false
    }
});
instructorsSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const instructors = coursesConnection.model("instructor", instructorsSchema);

module.exports = instructors;
