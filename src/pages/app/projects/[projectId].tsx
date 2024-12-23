import { projectApi, useGetProjectDetailQuery } from "@/api/projects/projectApi";
import AvatarStacking from "@/components/ui/avatar-stacking";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Navigate, useModals, useParams } from "@/router";
import dayjs from "dayjs";
import { Plus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import TaskList from "./(tasks)/_task-list";
import ProjectSettingButton from "./_project-setting-button";
import ProjectTitle from "./_project-title";
import SelectTaskScope from "./_select-task-scope";

export default function ProjectId() {
  const [isOpenTitleEditor, setIsOpenTitleEditor] = useState<boolean>(false);
  const [tabs, setTabs] = useState<"Active" | "Completed">("Active");
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const getAllProjectsCache = useSelector(projectApi.endpoints.getAllProjects.select());
  const { data: project, isLoading } = useGetProjectDetailQuery(params.projectId);

  const currentProject =
    getAllProjectsCache?.data?.data.team_projects.find(
      (project) => project.id === params.projectId
    ) ||
    getAllProjectsCache?.data?.data.personal_projects.find(
      (project) => project.id === params.projectId
    );

  const isFavorite = currentProject?.is_favorite || false;
  const isArchived = currentProject?.is_archived || false;

  const activeTasks = useMemo(
    () =>
      project?.data.project.tasks.filter(
        (task) => task.status === "ACTIVE" || task.status === "PAUSED"
      ),
    [project?.data.project.tasks]
  );
  const completedTasks = useMemo(
    () => project?.data.project.tasks.filter((task) => task.status === "COMPLETED"),
    [project?.data.project.tasks]
  );

  if (isLoading) {
    return null;
  }

  if (!project?.data.project) {
    return <Navigate to={"/app"} />;
  }

  return (
    <>
      <Helmet key={project.data.project.id}>
        <title>{project.data.project.name} – Syncly</title>
      </Helmet>
      <div className="flex flex-col flex-1">
        <p className="text-xs font-medium text-[#7B849E]">
          Projects/
          <span className="text-black">{project.data.project.name}</span>
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:items-end">
          <ProjectTitle
            key={project.data.project.id}
            projectId={project.data.project.id}
            isTeamProject={project.data.project.isTeamProject}
            isOwner={project.data.project.isProjectOwner}
            title={project.data.project.name}
            {...{
              isOpenTitleEditor,
              setIsOpenTitleEditor,
            }}
          />

          <div className="flex gap-2">
            <ProjectSettingButton
              isOwner={project.data.project.isProjectOwner}
              isTeamProject={project.data.project.isTeamProject}
              {...{ isFavorite, isArchived }}
            />
          </div>
        </div>

        <div className="flex flex-wrap mt-4 md:mt-6 gap-3 md:items-center md:gap-6">
          <p className="w-full text-sm font-medium text-[#7B849E]">
            Created on:{" "}
            <span className="text-black">
              {dayjs(project?.data.project.createdAt).format("MMM D, YYYY")}
            </span>
          </p>

          {project.data.project.isTeamProject && (
            <div className="flex gap-3">
              <AvatarStacking
                key={project.data.project.id}
                users={project?.data.project.members.map((member) => member.user) || []}
                totalUsers={project?.data.total_members || 0}
              />
              <Button
                className="text-sm font-medium rounded-lg text-black border border-[#E0E5EB]"
                variant="ghost"
                onClick={() =>
                  modals.open("/app/projects/manage-members", {
                    at: "/app/projects/:projectId",
                    params,
                    replace: true,
                    state: {
                      isOwner: project.data.project.isProjectOwner,
                      ownerId: project.data.project.ownerId,
                      totalMembers: project.data.total_members,
                    },
                    viewTransition: true,
                  })
                }
              >
                <Users />
                <span>{project.data.project.isProjectOwner ? "Manage" : "View"} Members</span>
              </Button>
            </div>
          )}

          <Button
            className="w-full mt-2 text-sm font-medium rounded-lg text-black border border-[#E0E5EB]"
            variant="ghost"
            onClick={() =>
              modals.open("/app/projects/create-task", {
                at: "/app/projects/:projectId",
                params,
                replace: true,
                viewTransition: true,
              })
            }
          >
            <Plus />
            <span>Create Task</span>
          </Button>
        </div>

        <Separator className="mt-4 mb-2" />

        <div className="flex flex-col sticky top-0 z-10 bg-white -mx-4 w-[calc(100%+32px] px-4 border-b border-border">
          <p className="font-bold text-xl">Project Task</p>
          <div className="flex justify-between gap-2 relative -bottom-[1px]">
            <SelectTaskScope key={project.data.project.id} {...{ tabs, setTabs }} />
          </div>
        </div>

        <div
          className={cn(
            "bg-[#F6F6F9] -mx-4 -mb-5 w-[calc(100%+32px] pt-4 pb-8 flex-1 flex flex-col gap-2",
            tabs === "Completed" && "hidden"
          )}
        >
          <TaskList tasks={activeTasks || []} category="Active" />
        </div>

        <div
          className={cn(
            "bg-[#F6F6F9] -mx-4 -mb-5 w-[calc(100%+32px] pt-4 pb-8 flex-1 flex flex-col gap-2",
            tabs === "Active" && "hidden"
          )}
        >
          <TaskList tasks={completedTasks || []} category="completed" />
        </div>
      </div>
    </>
  );
}
