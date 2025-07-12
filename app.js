import express from 'express';
import usersRouter from './routes/usersRoutes.js';
import CORS from "cors"
import "dotenv/config";
import path from "path"
import { fileURLToPath } from 'url';
import VerifyJWT from './MiddleWares/VerifyJWT.js';
import coursesRouter from './routes/coursesRoutes.js';
const app = express();
// const __fileName = fileURLToPath(import.meta.url)
// const __dirName = path.dirname(__fileName)
app.use(CORS())
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirName, "uploads")))
app.use("/api", VerifyJWT)
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);
app.all("*", (req, res) => {
  res.status(404).json({ message: "Recourse not found" })
})
app.listen(3001, () => {
  console.log("✅ Server is running on port 3001");
});
