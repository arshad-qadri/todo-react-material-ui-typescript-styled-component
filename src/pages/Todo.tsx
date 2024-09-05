import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import CreateTodo from "../components/modals/CreateTodo";
import TodoList from "../components/TodoList";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import {
  useDeleteAllTodosMutation,
  useGetAllTodosQuery,
} from "../redux/services/todoApi";

const Todo: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteAllTodos, { isLoading }] = useDeleteAllTodosMutation();
  const { data } = useGetAllTodosQuery();
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const StyledH1 = styled("div")({
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#d32f2f",
    textAlign: "center",
  });
  const handleDeleteAll = async () => {
    const confirmed = confirm("Are you sure you wants to delete all!");
    if (confirmed) {
      const deleteTodos = await deleteAllTodos();
      alert(deleteTodos.data?.message);
    }
  };
  return (
    <>
      <StyledH1>Todos</StyledH1>
      <Box sx={{ textAlign: "right" }} className=" my-3">
        <Button
          variant="outlined"
          size="small"
          onClick={handleOpenModal}
          title="Create Todo"
        >
          <AddIcon />
        </Button>
        {data?.todos && data?.todos?.length > 0 && (
          <StiledDeleteButton
            size="small"
            variant="contained"
            title="Delete all"
            onClick={handleDeleteAll}
            disabled={isLoading}
          >
            <DeleteSweepIcon />
          </StiledDeleteButton>
        )}
      </Box>
      <CreateTodo open={openModal} handleClose={handleCloseModal} />
      <TodoList />
    </>
  );
};

const StiledDeleteButton = styled(Button)`
  color: #fff;
  margin-left: 10px;
  font-weight: 700;
  background-color: #d32f2f;
`;
export default Todo;
