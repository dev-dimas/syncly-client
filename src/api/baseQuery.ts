import {
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const query = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL + "/api",
  prepareHeaders: (headers, { extraOptions }) => {
    if ((extraOptions as Record<string, unknown>)?.isNeedToken) {
      const token = JSON.parse(localStorage.getItem("accessToken") || "");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

const transformResponseGlobal = (response: unknown): unknown => {
  return response;
};

export const baseQuery: typeof query = async (args, api, extraOptions) => {
  const result = await query(args, api, extraOptions);

  if (result.data) {
    result.data = transformResponseGlobal(result.data);
  }

  if (result.error) {
    result.error = result.error.data as FetchBaseQueryError;
  }

  return result;
};
