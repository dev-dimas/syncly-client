import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { ApiSuccess } from "@/types/api";

interface UserAuth {
  name: string;
  email: string;
  password: string;
  access_token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<
      ApiSuccess<Pick<UserAuth, "access_token">>,
      Omit<UserAuth, "access_token" | "name">
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<
      ApiSuccess<Omit<UserAuth, "password">>,
      Omit<UserAuth, "access_token">
    >({
      query: (credentials) => ({
        url: "/sign-up",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
