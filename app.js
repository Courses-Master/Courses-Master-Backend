const express = require('express');
const CORS = require('cors');
require('dotenv').config();
const VerifyJWT = require('./MiddleWares/VerifyJWT');
const ErrorHandler = require('./MiddleWares/ErrorHandler');
const RoutesHandler = require('./routes/RoutesHandler');
const app = express();
app.use(CORS())

app.use(express.json()); 
app.use("/api", VerifyJWT);

RoutesHandler(app)


app.all("*", (req, res) => {
  res.status(404).json({ message: "Recourse not found" });
});

app.use(ErrorHandler);

app.listen(5000, () => {
  console.log("✅ Server is running on port 3001");
});
