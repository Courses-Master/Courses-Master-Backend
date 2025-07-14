const mongoose = require("mongoose");
require("dotenv").config();
const validator = require("validator");

const usersUrl = `${process.env.db_string}users`;
const usersConnection = mongoose.createConnection(usersUrl);

const usersSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "add valid email",
    },
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    required: true,
    type: String,
  },
  phone: {
    required: false,
    type: String,
  },
  avatar: {
    required: false,
    type: String,
  },
});

const Users = usersConnection.model("users", usersSchema);

module.exports = Users;
