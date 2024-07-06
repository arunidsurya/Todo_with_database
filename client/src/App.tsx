import React, { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import axios from "axios";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getTodo() {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/get-todo", {
          withCredentials: true,
        });
        setTodos(res.data.todos);
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
        const res = await axios.post(
          "http://localhost:5000/api/v1/add-todo",
          { todo },
          {
            withCredentials: true,
          }
        );
        setTodos((prev) => [
          ...prev,
          res.data.newTodo, // Assuming server returns the new todo item as res.data.todo
        ]);
        setTodo(""); // Clear the input field after adding
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
