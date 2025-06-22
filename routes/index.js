import express from "express";
import authRoutes from './auth.js'
import tasksRoutes from './tasks.js'
const router = express.Router();

router.use('/auth', authRoutes)
router.use('/tasks', tasksRoutes)
export default router;


