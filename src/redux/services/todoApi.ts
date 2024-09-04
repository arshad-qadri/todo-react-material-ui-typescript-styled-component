import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../variable";
import { ITodo } from "../../types/common";

interface Todos {
  todos: ITodo[];
}
interface IUpdateTodo {
  message: string;
}

export const todoApi = createApi({
  reducerPath: "api/todos",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todos, void>({
      query: () => "/all-todos",
      providesTags: ["todos"],
    }),

    createTodo: builder.mutation<IUpdateTodo, ITodo>({
      query: (todo) => ({
        url: "/create-todo",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["todos"],
    }),

    updateTodo: builder.mutation<IUpdateTodo, { id: string; todo: ITodo }>({
      query: ({ id, todo }) => ({
        url: `/update-todo/${id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["todos"],
    }),

    changeTodoStatus: builder.mutation<
      IUpdateTodo,
      { id: string; isCompleted: boolean }
    >({
      query: ({ id, isCompleted }) => ({
        url: `/update-todo-status/${id}`,
        method: "PUT",
        body: { isCompleted },
      }),
      invalidatesTags: ["todos"],
    }),

    deleteTodo: builder.mutation<IUpdateTodo, { id: string }>({
      query: ({ id }) => ({
        url: `/delete-todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useUpdateTodoMutation,
  useChangeTodoStatusMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
