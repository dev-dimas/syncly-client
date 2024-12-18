import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { ApiSuccess } from "@/types/api";
import { projectApi, TaskOnProjectDetail } from "../projects/projectApi";
import { CreateTaskSchema } from "@/schema/createTaskSchema";
import { UpdateTaskSchema } from "@/schema/updateTaskSchema";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery,
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    createTask: builder.mutation<
      ApiSuccess<{ task: TaskOnProjectDetail }>,
      CreateTaskSchema & { dueDate: Date; projectId: string }
    >({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      extraOptions: { isNeedToken: true },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: createdTask } = await queryFulfilled;
          dispatch(
            projectApi.util.updateQueryData("getProjectDetail", data.projectId, (project) => {
              project.data.project.tasks.push(createdTask.data.task);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateTask: builder.mutation<
      ApiSuccess<{ task: TaskOnProjectDetail }>,
      Partial<UpdateTaskSchema & { dueDate: Date; status: string }> & {
        taskId: string;
        projectId: string;
      }
    >({
      query: (data) => ({
        url: `/tasks/${data.taskId}`,
        method: "PUT",
        body: data,
      }),
      extraOptions: { isNeedToken: true },
      invalidatesTags: (_result, _error, { taskId }) => [{ type: "Task", id: taskId }],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedTask } = await queryFulfilled;
          dispatch(
            projectApi.util.updateQueryData("getProjectDetail", data.projectId, (project) => {
              project.data.project.tasks = project.data.project.tasks.map((task) => {
                if (task.id === data.taskId) {
                  return updatedTask.data.task;
                }
                return task;
              });
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getTaskDetail: builder.query<
      ApiSuccess<{ task: TaskOnProjectDetail & { createdAt: string } }>,
      string
    >({
      query: (taskId) => ({ url: `/tasks/${taskId}` }),
      providesTags: (_result, _error, taskId) => [{ type: "Task", id: taskId }],
      extraOptions: { isNeedToken: true },
    }),
    deleteTask: builder.mutation<ApiSuccess, { taskId: string; projectId: string }>({
      query: (data) => ({
        url: `/tasks/${data.taskId}`,
        method: "DELETE",
      }),
      extraOptions: { isNeedToken: true },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            projectApi.util.updateQueryData("getProjectDetail", data.projectId, (project) => {
              project.data.project.tasks = project.data.project.tasks.filter(
                (task) => task.id !== data.taskId
              );
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getTaskAssignees: builder.query<
      ApiSuccess<{
        userId: string;
        availableAssignee: { userId: string; name: string }[];
        taskAssignee: { userId: string; name: string }[];
      }>,
      string
    >({
      query: (taskId) => ({ url: `/tasks/${taskId}/assignee` }),
      extraOptions: { isNeedToken: true },
    }),
    addTaskAssignee: builder.mutation<ApiSuccess, { taskId: string; userId: string }>({
      query: (data) => ({
        url: `/tasks/${data.taskId}/assignee`,
        method: "POST",
        body: { userId: data.userId },
      }),
      extraOptions: { isNeedToken: true },
    }),
    removeTaskAssignee: builder.mutation<ApiSuccess, { taskId: string; userId: string }>({
      query: (data) => ({
        url: `/tasks/${data.taskId}/assignee`,
        method: "DELETE",
        body: { userId: data.userId },
      }),
      extraOptions: { isNeedToken: true },
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetTaskDetailQuery,
  useDeleteTaskMutation,
  useGetTaskAssigneesQuery,
  useAddTaskAssigneeMutation,
  useRemoveTaskAssigneeMutation,
} = taskApi;
