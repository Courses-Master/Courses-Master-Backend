const createError = require("../utils/createError");

function validateId(model, id) {
  return async (req, res, next) => {
    const modelId = req.params[id];
    if (!modelId && req.method === "PUT") {
      return next(createError("Id is required", 404))
    }
    const findById = await model.findOne({ id: modelId });
    if (findById) {
      next();
    } else {
      return next(createError("invalid Id", 404))
    }
  };
}

module.exports = validateId;
