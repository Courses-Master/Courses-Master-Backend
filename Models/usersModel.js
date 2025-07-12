import mongoose from "mongoose";
import "dotenv/config"
import validator from "validator"
const usersUrl = `${process.env.db_string}users`
const usersConnection = mongoose.createConnection(usersUrl)

const usersSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        validate: {
            validator: validator.isEmail,
            message: "add valid email"
        }
    },
    phone: {
        require: false,
        type: String,
    }
})

const Users = usersConnection.model('users', usersSchema)
export default Users