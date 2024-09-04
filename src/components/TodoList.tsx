import React, { useState } from "react";
import { ITodo } from "../types/common";
import TodoItem from "./TodoItem";
import EditTodo from "./modals/EditTodo";
import { useGetAllTodosQuery } from "../redux/services/todoApi";
import { Box, CircularProgress } from "@mui/material";
// interface TodoListProps {
//   todos: ITodo[];
// }
interface ApiError {
  data?: {
    message?: string;
  };
}


const TodoList: React.FC = () => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editMdalValue, setEditModalValue] = useState<ITodo | null>(null);
  const { data: todos, error, isLoading } = useGetAllTodosQuery();

  const handleEdit = (todo: ITodo) => {
    if (todo.isCompleted) {
      alert("Cannot edit completed todo.");
      return;
    }
    setEditModalValue(todo);
    setEditModal(true);
  };

  const handleClose = () => {
    setEditModal(false);
  };

  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    const apiError = error as ApiError;
    return (
      <p className="text-red-500">
        Error: {apiError.data?.message || "An Error occured"}
      </p>
    );
  }
  return (
    <div>
      <EditTodo
        open={editModal}
        handleClose={handleClose}
        todo={editMdalValue}
      />
      {todos?.todos &&
        todos?.todos.length > 0 &&
        todos?.todos.map((item: ITodo, index: number) => (
          <TodoItem todo={item} key={index} handleEdit={handleEdit} />
        ))}
    </div>
  );
};

export default TodoList;
