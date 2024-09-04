import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import CreateTodo from "../components/modals/CreateTodo";
import TodoList from "../components/TodoList";

const Todo: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const StyledH1 = styled("div")({
    fontSize: "2rem",
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  });
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
      </Box>
      <CreateTodo open={openModal} handleClose={handleCloseModal} />
      <TodoList />
    </>
  );
};

export default Todo;
