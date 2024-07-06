import express from "express";
import { todoModel } from "../model/todoModel.js";


export const getTodo=async(req,res) =>{
    console.log("reached the controller")
    const todos = await todoModel.find().sort({createdAt:-1});

    if(todos.length >0){
        return res.send({
            success:true,
            message:"successful",
            todos
        })
    }else{
        res.send({
            success:false,
            message:"No todos found"
        })
    }

}

export const createTodo = async (req, res) => {
  const {todo}= req.body;

  const newTodo = await todoModel.create({ todo });

  if(newTodo){
    return res.send({
      success: true,
      message: "Todo added successfully",
      newTodo,
    });
  }

};
