import express from "express";
import { createTask, deleteTask, getMyTasks, updateTask } from "../controllers/tasks.js";
import { verifyJwt } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post('',upload,verifyJwt, createTask)
router.get('', verifyJwt, getMyTasks);
router.put('/:id', upload, verifyJwt, updateTask);
router.delete('/:id', verifyJwt, deleteTask);


export default router;