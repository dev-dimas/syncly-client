import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { ApiSuccess } from "@/types/api";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery,
  endpoints: (builder) => ({
    readAllMessage: builder.mutation<ApiSuccess, void>({
      query: () => ({
        url: "/notifications",
        method: "POST",
      }),
      extraOptions: { isNeedToken: true },
    }),
  }),
});

export const { useReadAllMessageMutation } = notificationApi;
