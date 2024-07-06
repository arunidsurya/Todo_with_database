import express from 'express';
import { createTodo, deleteTodo, editTodo, getTodo, todoStatusChange } from '../controller/todoController.js';

const router = express.Router();

router.get("/get-todo",getTodo);
router.post("/add-todo",createTodo);
router.post("/edit-todo/:id",editTodo);
router.put("/todo-status-change/:id", todoStatusChange);
router.delete("/delete-todo/:id",deleteTodo)


export default router;