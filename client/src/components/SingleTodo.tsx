import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { handleDeleteTodo, handleEditTodo, handleStatusChange } from "./sevices/api/Api";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = async(id: number) => {
    console.log("called")
      try {
        const res = await handleStatusChange(id)
        if(res?.data.success){
          let updatedTodo = res.data.todo;
          setTodos((prev)=> prev.map((item)=> item._id === updatedTodo._id ? {...item,isDone: updatedTodo.isDone}:item))
        }
      } catch (error) {
        
      }
  };

  const handleDelete = async(id: number) => {
    try {
          const res = await handleDeleteTodo(id);
          if (res) {
            let receivedId = res.data.todo._id;
            setTodos((prev) => prev.filter((item) => item._id !== receivedId));
          }
    } catch (error) {
      console.log(error)
    }

  };

const handleEdit = async (e: React.FormEvent, id: number) => {
  e.preventDefault();
  try {
    const res = await handleEditTodo(id, editTodo);
    if (res?.data.success) {
      const updatedTodo = res.data.savedTodo;
      setTodos((prev) =>
        prev.map((item) =>
          item._id === updatedTodo._id
            ? { ...item, todo: updatedTodo.todo }
            : item
        )
      );
      setEdit(false);
      setEditTodo(""); 
    }
  } catch (error) {
    console.log(error);
  }
};


  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos_single" onSubmit={(e) => handleEdit(e, todo._id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos_single--text"
        />
      ) : todo.isDone ? (
        <s className="todos_single--text">{todo.todo}</s>
      ) : (
        <span className="todos_single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo._id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo._id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
