import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../variable";

interface IContactMessage {
  message: string;
}

interface IContactField {
  name: string;
  email: string;
  message: string;
}

export const contactApi = createApi({
  reducerPath: "api/contact",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    contactUs: builder.mutation<IContactMessage, IContactField>({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useContactUsMutation } = contactApi;
