const jwt = require("jsonwebtoken");

const generateJwt = (payload) => {
  const token = jwt.sign(payload, process.env.secrete_key);
  return token;
};

module.exports = generateJwt;
