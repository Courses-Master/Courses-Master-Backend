import jwt from "jsonwebtoken"
export default (payload) => {
    const token = jwt.sign(payload, process.env.secrete_key)
    return token
}