import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { ITodo } from "../../types/common";
import { useCreateTodoMutation } from "../../redux/services/todoApi";

interface CreateTodoProps {
  open: boolean;
  handleClose: () => void;
}

interface IFormData {
  todo: string;
  description: string;
}

const CreateTodo: React.FC<CreateTodoProps> = ({
  open,
  handleClose,
}) => {
  const [createTodo] = useCreateTodoMutation();
  const [formData, setFormData] = useState<IFormData>({
    todo: "",
    description: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTodo = async () => {
    const newtodo: ITodo = {
      todo: formData.todo,
      description: formData.description,
    };
    const createdTodo = await createTodo(newtodo);
    if(createdTodo.data?.message){
      alert(createdTodo.data?.message);
    }
    setFormData({ todo: "", description: "" });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create a New Todo</DialogTitle>
      <DialogContent>
        <TextField
          label="Todo"
          variant="outlined"
          fullWidth
          margin="dense"
          name="todo"
          value={formData.todo}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="dense"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "10px 20px" }}>
        <Button
          onClick={handleClose}
          color="error"
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{ textTransform: "capitalize", padding: "5px 10px" }}
          onClick={handleAddTodo}
        >
          Add Todo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTodo;
