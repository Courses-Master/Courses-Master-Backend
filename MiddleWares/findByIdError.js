export default function validateId(model, id) {
    return async (req, res, next) => {
        try {
            const userId =   req.params[id]
            const findById = await model.findById(userId)
            if (findById) {
                next()
            }
        } catch (err) {
            return res.status(404).json({ message: "invalid Id" })
        }
    }
}