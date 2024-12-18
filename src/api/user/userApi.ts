import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { ApiSuccess } from "@/types/api";

interface User {
  name: string;
  email: string;
  avatar: string | null;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<ApiSuccess<User>, void>({
      query: () => ({ url: "/user" }),
      extraOptions: { isNeedToken: true },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<ApiSuccess<User>, FormData>({
      query: (user) => ({ url: "/user", method: "PUT", body: user }),
      extraOptions: { isNeedToken: true },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
