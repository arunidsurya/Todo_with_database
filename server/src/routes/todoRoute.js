import express from 'express';
import { createTodo, getTodo } from '../controller/todoController.js';

const router = express.Router();

router.get("/get-todo",getTodo)
router.post("/add-todo",createTodo)


export default router;