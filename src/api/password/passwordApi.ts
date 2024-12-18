import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { ChangePasswordSchemaType } from "@/schema/changePasswordSchema";
import { ApiSuccess } from "@/types/api";

export const passwordApi = createApi({
  reducerPath: "passwordApi",
  baseQuery,
  endpoints: (builder) => ({
    changePassword: builder.mutation<
      ApiSuccess,
      Omit<ChangePasswordSchemaType, "confirmNewPassword">
    >({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        body: data,
      }),
      extraOptions: { isNeedToken: true },
    }),
  }),
});

export const { useChangePasswordMutation } = passwordApi;
