import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ITodo } from "../../types/common";
import { useUpdateTodoMutation } from "../../redux/services/todoApi";

interface EditTodoProps {
  open: boolean;
  handleClose: () => void;
  todo: ITodo | null;

}

interface IFormData {
  todo: string;
  description: string;
}

const EditTodo: React.FC<EditTodoProps> = ({
  open,
  handleClose,
  todo,
}) => {
  const [formData, setFormData] = useState<IFormData>({
    todo: "",
    description: "",
  });
  const [updateTodo] =
    useUpdateTodoMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateTodo = async () => {
    if (todo?._id) {
      const data = await updateTodo({ id: todo?._id, todo: formData }).unwrap();
      if(data.message){
        alert(data?.message)
      }
    }
    setFormData({ todo: "", description: "" });
    handleClose();
  };

  useEffect(() => {
    if (todo) {
      setFormData({ todo: todo.todo, description: todo.description });
    }
  }, [todo,open]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Todo</DialogTitle>
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
          onClick={handleUpdateTodo}
        >
          Save Todo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodo;
