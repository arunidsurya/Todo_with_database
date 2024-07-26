import React, { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { handleAddTodo, handleGetTodo } from "./components/sevices/api/Api";
import axios from "axios";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    async function getTodo() {
      try {
        const res = await handleGetTodo();
        setTodos(res?.data.todos || []);
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
        const res = await handleAddTodo(todo);
        setTodos((prev) => [...prev, res?.data.newTodo]);
        setTodo("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleActiveClick = () => {
    setIsCompleted(false);
  };

  const handleCompletedClick = () => {
    setIsCompleted(true);
  };

  const filteredTodos =
    todos?.filter((todo) => {
      if (isCompleted) {
        return todo.isDone;
      } else {
        return !todo.isDone;
      }
    }) || [];

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <div>
        <button
          className="button1"
          style={{ border: !isCompleted ? "2px solid yellow" : "none" }}
          onClick={handleActiveClick}
        >
          Active
        </button>
        <button
          className="button2"
          style={{ border: isCompleted ? "2px solid yellow" : "none" }}
          onClick={handleCompletedClick}
        >
          Completed
        </button>
      </div>
      {filteredTodos.length > 0 ? (
        <TodoList todos={filteredTodos} setTodos={setTodos} />
      ) : (
        <p className="toto-empty">No todos available. Please add a todo.</p>
      )}
    </div>
  );
};

export default App;
