import AvatarStacking from "@/components/ui/avatar-stacking";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PLACEHOLDER } from "@/dummy-data/project-id";
import dayjs from "dayjs";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ProjectSettingButton from "./_project-setting-button";
import ProjectTitle from "./_project-title";
import SelectTaskScope from "./_select-task-scope";
import TaskCard from "./_task-card";
import { useModals, useParams } from "@/router";

const IS_OWNER = true;

export default function ProjectId() {
  const [isOpenTitleEditor, setIsOpenTitleEditor] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>(PLACEHOLDER.title);
  const [tabs, setTabs] = useState<"Active" | "Completed">("Active");

  const modals = useModals();
  const params = useParams("/app/projects/:projectId");

  return (
    <>
      <Helmet>
        <title>{projectTitle} – Syncly</title>
      </Helmet>
      <div className="flex flex-col flex-1">
        <p className="text-xs font-medium text-[#7B849E]">
          Projects/
          <span className="text-black">{projectTitle}</span>
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:items-end">
          <ProjectTitle
            {...{
              projectTitle,
              setProjectTitle,
              isOpenTitleEditor,
              setIsOpenTitleEditor,
            }}
          />

          <div className="flex gap-2">
            <ProjectSettingButton />
          </div>
        </div>

        <div className="flex flex-wrap mt-4 md:mt-6 gap-3 md:items-center md:gap-6">
          <p className="w-full text-sm font-medium text-[#7B849E]">
            Created on:{" "}
            <span className="text-black">
              {dayjs(PLACEHOLDER.createdAt).format("MMM D, YYYY")}
            </span>
          </p>

          <div className="flex gap-3">
            <AvatarStacking
              users={PLACEHOLDER.member}
              totalUsers={PLACEHOLDER.memberCount}
            />
            {IS_OWNER && (
              <Button
                className="text-sm font-medium rounded-lg text-black border border-[#E0E5EB]"
                variant="ghost"
                onClick={() =>
                  modals.open("/app/projects/manage-members", {
                    at: "/app/projects/:projectId",
                    params,
                    replace: true,
                    viewTransition: true,
                  })
                }
              >
                <Users />
                <span>Manage Members</span>
              </Button>
            )}
          </div>

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
            <SelectTaskScope {...{ tabs, setTabs }} />
          </div>
        </div>

        <div className="bg-[#F6F6F9] -mx-4 -mb-5 w-[calc(100%+32px] pt-4 pb-8 flex-1 flex flex-col gap-2">
          {Array.from({ length: 20 }, () => ({
            ...PLACEHOLDER.activeTask[0],
          })).map((task) => (
            <TaskCard key={task.title} task={task} />
          ))}
        </div>
      </div>
    </>
  );
}
