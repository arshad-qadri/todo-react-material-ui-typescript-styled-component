import React, { ChangeEvent, useEffect } from "react";
import { ITodo } from "../types/common";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  useChangeTodoStatusMutation,
  useDeleteTodoMutation,
} from "../redux/services/todoApi";
interface TodoItemProps {
  todo: ITodo;
  handleEdit: (todo: ITodo) => void;
}
const TodoItem: React.FC<TodoItemProps> = ({ todo, handleEdit }) => {
  const [changeTodoStatus] = useChangeTodoStatusMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const handleCheckTodo = async (
    event: ChangeEvent<HTMLInputElement>,
    todo: ITodo
  ) => {
    const { value } = event.target;
    if (value) {
      const data = await changeTodoStatus({
        id: value,
        isCompleted: !todo?.isCompleted,
      }).unwrap();
      if (data.message) {
        alert(data?.message);
      }
    }
  };
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this todo!")
    if (id && confirmed) {
      const deletedTodo = await deleteTodo({ id });
      alert(deletedTodo.data?.message);
    }
  };
  return (
    <Box
      sx={{
        border: "1px solid #f3f3f3",
        margin: "10px 0",
        padding: 1.5,
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            mb: 1,
            columnGap: 1,
          }}
        >
          <Checkbox
            sx={{ padding: 0 }}
            value={todo._id}
            checked={todo.isCompleted}
            onChange={(event) => handleCheckTodo(event, todo)}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: 18,
              fontWeight: 600,
              textDecoration: todo.isCompleted ? "line-through" : "none",
            }}
          >
            {todo.todo}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
        >
          {todo.description}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", columnGap: 1 }}>
        <Button
          variant="outlined"
          color="error"
          size="small"
          sx={{ padding: "5px" }}
          onClick={() => handleDelete(todo?._id ? todo?._id : "")}
        >
          <DeleteIcon />
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ padding: "5px" }}
          onClick={() => handleEdit(todo)}
        >
          <EditIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default TodoItem;
