import express from 'express'
import { getAllUsers, userById, register, login, deleteAllUsers } from '../Controllers/usersController.js'
import validateId from '../MiddleWares/findByIdError.js'
import Users from '../Models/usersModel.js'
import VerifyJWT from '../MiddleWares/VerifyJWT.js'
const router = express.Router()

router.get("/", VerifyJWT, getAllUsers)
router.get("/:userId", validateId(Users,"userId"), userById)
router.post("/register", register)
router.post("/login", login)
router.delete("/delete", deleteAllUsers)
export default router