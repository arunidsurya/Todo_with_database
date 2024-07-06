import React, { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import axios from "axios";
import { handleAddTodo, handleGetTodo } from "./components/sevices/api/Api";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTodo() {
      try {
        const res = await handleGetTodo();
        setTodos(res?.data.todos);
      } catch (err) {
        console.log(err);
      }
    }

    getTodo();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      try {
        const res = await handleAddTodo(todo)
        setTodos((prev) => [
          ...prev,
          res?.data.newTodo, 
        ]);
        setTodo("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <div>
        <button  className="button1">Active</button>
        <button className="button2">completed</button>
      </div>

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
