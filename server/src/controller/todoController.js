import express from "express";
import { todoModel } from "../model/todoModel.js";

export const getTodo = async (req, res) => {
  try {
    const todos = await todoModel.find().sort({ createdAt: -1 });

    if (todos.length > 0) {
      return res.send({
        success: true,
        message: "successful",
        todos,
      });
    } else {
      res.send({
        success: false,
        message: "No todos found",
      });
    }
  } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Internal Server Error",
        });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { todo } = req.body;

    const newTodo = await todoModel.create({ todo });

    if (newTodo) {
      return res.send({
        success: true,
        message: "Todo added successfully",
        newTodo,
      });
    } else {
      return res.send({
        success: false,
        message: "Todo add unsuccessfull",
      });
    }
  } catch (error) {
       console.log(error);
       return res.status(500).send({
         success: false,
         message: "Internal Server Error",
       });
  }
};

export const editTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const {todo } = req.body;

    const savedTodo = await todoModel.findById(id);

    if (savedTodo) {
      savedTodo.todo = todo;

      await savedTodo.save();

      return res.json({
        success: true,
        message: "Todo edited successfully",
        savedTodo,
      });
    } else {
      return res.send({
        success: false,
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const todoStatusChange = async (req, res) => {
  try {
    const  id  = req.params.id;

    const todo = await todoModel.findById(id);

    if (todo) {
      todo.isDone = !todo.isDone;

      await todo.save();

      return res.json({
        success: true,
        message: "Todo status updated successfully",
        todo,
      });
    } else {
      return res.send({
        success: false,
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
        const id = req.params.id;

    const todo = await todoModel.findByIdAndDelete(id);

    console.log(todo)

    if (todo) {
      return res.json({
        success: true,
        message: "Todo status updated successfully",
        todo,
      });
    } else {
      return res.send({
        success: false,
        message: "Todo not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

