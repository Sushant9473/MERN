import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

console.log("BASE_URL", BASE_URL);

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // This ensures cookies are sent with every request
  prepareHeaders: (headers, { getState }) => {
    // You can add any custom headers here if needed
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
