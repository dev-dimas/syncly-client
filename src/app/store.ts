import { authApi } from "@/api/auth/authApi";
import { notificationApi } from "@/api/notification/notificationApi";
import { passwordApi } from "@/api/password/passwordApi";
import { projectApi } from "@/api/projects/projectApi";
import { taskApi } from "@/api/task/taskApi";
import { userApi } from "@/api/user/userApi";
import notificationReducer from "@/slices/notificationSlice";
import tabReducer from "@/slices/tabProjectSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    tabProject: tabReducer,
    notification: notificationReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      passwordApi.middleware,
      projectApi.middleware,
      taskApi.middleware,
      notificationApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
