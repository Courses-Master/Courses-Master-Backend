function validateId(model, id) {
  return async (req, res, next) => {
    const modelId = req.params[id];
  
      const findById = await model.findOne({ id: modelId });
      if (findById) {
        next();
      } else {
        return res.status(404).json({ message: "invalid Id" });
      }
  };
}

module.exports = validateId;
