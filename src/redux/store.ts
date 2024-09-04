import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./services/todoApi";
import { contactApi } from "./services/contact.api";

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDfaultMiddleware) =>
    getDfaultMiddleware().concat(todoApi.middleware, contactApi.middleware),
  
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
