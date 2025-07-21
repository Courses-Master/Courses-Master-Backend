const jwt = require("jsonwebtoken");
const Users = require("../Models/usersModel");

const authMiddleware = async (req, res, next) => {
  const findToken = req.headers["authorization"] || req.headers["Authorization"];
  const token = findToken?.split(' ')[1];
  const excludedPaths = ["/api/users/login", "/api/users/register", "/api/Instructors/addInstructor","/api/verify-code"];

  if (excludedPaths.includes(req.originalUrl)) {
    return next();
  }

  if (!token) {
    return res.status(404).json({ message: "token is required" });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.secrete_key);
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = authMiddleware;
