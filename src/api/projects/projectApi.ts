import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { ApiSuccess } from "@/types/api";

export type DashboardProjectType = {
  id: string;
  name: string;
  is_favorite: boolean;
  is_archived: boolean;
};
type GetDashboardResponse = {
  team_projects: DashboardProjectType[];
  personal_projects: DashboardProjectType[];
};

export type TaskOnProjectDetail = {
  id: string;
  assignedTo: {
    user: {
      name: string;
      avatar: string | null;
    };
  }[];
  dueDate: Date;
  title: string;
  description: string | null;
  status: "ACTIVE" | "PAUSED" | "COMPLETED";
};
type ProjectDetailType = {
  project: {
    name: string;
    id: string;
    tasks: TaskOnProjectDetail[];
    isTeamProject: boolean;
    isProjectOwner: boolean;
    ownerId: string;
    members: {
      user: {
        name: string;
        avatar: string | null;
      };
    }[];
    createdAt: Date;
  };
  total_members: number;
};

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery,
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getAllProjects: builder.query<ApiSuccess<GetDashboardResponse>, void>({
      query: () => ({ url: "/projects" }),
      extraOptions: { isNeedToken: true },
      providesTags: ["Project"],
    }),
    createProject: builder.mutation<
      ApiSuccess<{ project: Pick<DashboardProjectType, "id" | "name"> }>,
      Pick<DashboardProjectType, "name"> & { isTeamProject: boolean }
    >({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      extraOptions: { isNeedToken: true },
      async onQueryStarted(newProject, { dispatch, queryFulfilled }) {
        try {
          const { data: createdProject } = await queryFulfilled;

          dispatch(
            projectApi.util.updateQueryData("getAllProjects", undefined, (project) => {
              if (newProject.isTeamProject) {
                project.data.team_projects.push({
                  ...createdProject.data.project,
                  is_favorite: false,
                  is_archived: false,
                });
              } else {
                project.data.personal_projects.push({
                  ...createdProject.data.project,
                  is_favorite: false,
                  is_archived: false,
                });
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getProjectDetail: builder.query<ApiSuccess<ProjectDetailType>, string>({
      query: (projectId) => ({ url: `/projects/${projectId}` }),
      extraOptions: { isNeedToken: true },
    }),
    updateProjectName: builder.mutation<
      ApiSuccess,
      { id: string; name: string; isTeamProject: boolean }
    >({
      query: (data) => ({
        url: `/projects/${data.id}`,
        method: "PUT",
        body: { name: data.name },
      }),
      extraOptions: { isNeedToken: true },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            projectApi.util.updateQueryData("getProjectDetail", data.id, (project) => {
              project.data.project.name = data.name;
            })
          );
          dispatch(
            projectApi.util.updateQueryData("getAllProjects", undefined, (project) => {
              if (data.isTeamProject) {
                project.data.team_projects = project.data.team_projects.map((project) => {
                  if (project.id === data.id) {
                    project.name = data.name;
                  }
                  return project;
                });
              } else {
                project.data.personal_projects = project.data.personal_projects.map((project) => {
                  if (project.id === data.id) {
                    project.name = data.name;
                  }
                  return project;
                });
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteProject: builder.mutation<ApiSuccess, { id: string; isTeamProject: boolean }>({
      query: (data) => ({
        url: `/projects/${data.id}`,
        method: "DELETE",
      }),
      extraOptions: { isNeedToken: true },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            projectApi.util.updateQueryData("getAllProjects", undefined, (project) => {
              if (data.isTeamProject) {
                project.data.team_projects = project.data.team_projects.filter(
                  (project) => project.id !== data.id
                );
              } else {
                project.data.personal_projects = project.data.personal_projects.filter(
                  (project) => project.id !== data.id
                );
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getProjectMembers: builder.query<
      ApiSuccess<{
        total_members: number;
        total_pages: number;
        members: { user: { id: string; name: string; avatar: string | null; email: string } }[];
      }>,
      { projectId: string; page: number; limit: number }
    >({
      query: (data) => ({
        url: `/projects/${data.projectId}/members`,
        params: { page: data.page, limit: data.limit },
      }),
      providesTags: (_result, _error, { projectId, page }) => [
        { type: "Project", id: `${projectId}-page-${page}` },
      ],
      extraOptions: { isNeedToken: true },
    }),
    addProjectMember: builder.mutation<ApiSuccess, { email: string; projectId: string }>({
      query: (data) => ({
        url: `/projects/${data.projectId}/members`,
        method: "POST",
        body: { email: data.email },
      }),
      extraOptions: { isNeedToken: true },
    }),
    removeProjectMember: builder.mutation<ApiSuccess, { userId: string; projectId: string }>({
      query: (data) => ({
        url: `/projects/${data.projectId}/members`,
        method: "DELETE",
        body: { userId: data.userId },
      }),
      extraOptions: { isNeedToken: true },
    }),
    toggleFavorite: builder.mutation<ApiSuccess, { id: string; isTeamProject: boolean }>({
      query: (data) => ({ url: `/projects/${data.id}/favorite`, method: "POST" }),
      extraOptions: { isNeedToken: true },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            projectApi.util.updateQueryData("getAllProjects", undefined, (project) => {
              if (data.isTeamProject) {
                project.data.team_projects = project.data.team_projects.map((project) => {
                  if (project.id === data.id) {
                    project.is_favorite = !project.is_favorite;
                  }
                  return project;
                });
              } else {
                project.data.team_projects = project.data.team_projects.map((project) => {
                  if (project.id === data.id) {
                    project.is_favorite = !project.is_favorite;
                  }
                  return project;
                });
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    toggleArchive: builder.mutation<ApiSuccess, { id: string; isTeamProject: boolean }>({
      query: (data) => ({ url: `/projects/${data.id}/archive`, method: "POST" }),
      extraOptions: { isNeedToken: true },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            projectApi.util.updateQueryData("getAllProjects", undefined, (project) => {
              if (data.isTeamProject) {
                project.data.team_projects = project.data.team_projects.map((project) => {
                  if (project.id === data.id) {
                    project.is_archived = !project.is_archived;
                  }
                  return project;
                });
              } else {
                project.data.team_projects = project.data.personal_projects.map((project) => {
                  if (project.id === data.id) {
                    project.is_archived = !project.is_archived;
                  }
                  return project;
                });
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useGetProjectDetailQuery,
  useUpdateProjectNameMutation,
  useDeleteProjectMutation,
  useGetProjectMembersQuery,
  useAddProjectMemberMutation,
  useRemoveProjectMemberMutation,
  useToggleFavoriteMutation,
  useToggleArchiveMutation,
} = projectApi;
