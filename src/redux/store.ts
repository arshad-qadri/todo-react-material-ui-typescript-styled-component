import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./services/todoApi";

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDfaultMiddleware) =>
    getDfaultMiddleware().concat(todoApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
