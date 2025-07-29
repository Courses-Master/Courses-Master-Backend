const express = require('express');
const usersRouter = require('./routes/usersRoutes');
const CORS = require('cors');
require('dotenv').config();
const path = require('path');
const VerifyJWT = require('./MiddleWares/VerifyJWT');
const coursesRouter = require('./routes/coursesRoutes');
const instructorsRoutes = require("./routes/instructorsRoutes")
const verifyOTP = require('./Controllers/OTP-Controller');
const app = express();
app.use(CORS())
app.use(express.json());
app.use("/api", VerifyJWT);
app.use("/api/verify-code", verifyOTP);
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/instructors',instructorsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Recourse not found" });
});

app.listen(3001, () => {
  console.log("✅ Server is running on port 3001");
});
