const jwt = require("jsonwebtoken");
const Users = require("../Models/usersModel");
const createError = require("../utils/createError");
const authMiddleware = async (req, res, next) => {
  const findToken = req.headers["authorization"] || req.headers["Authorization"];
  const token = findToken?.split(' ')[1];
  const excludedPaths =
    [
      "/api/users/login",
      "/api/users/register",
      "/api/verify-code"
    ];

  if (excludedPaths.includes(req.originalUrl)) {
    return next();
  }

  if (!token) {
    return next(createError("Unauthorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.secrete_key);
    req.user = decoded
    next();
  } catch (err) {
    return next(createError("invalid token", 401));
  }
};

module.exports = authMiddleware;
