import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Avatar } from "@/components/ui/avatar";
import AvatarStacking from "@/components/ui/avatar-stacking";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PLACEHOLDER } from "@/dummy-data/project-id";
import { cn, getInitials } from "@/lib/utils";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import dayjs from "dayjs";
import {
  Calendar,
  Ellipsis,
  PencilLine,
  Plus,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const IS_OWNER = true;

export default function ProjectId() {
  const [isOpenTitleEditor, setIsOpenTitleEditor] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>(PLACEHOLDER.title);
  const [tabs, setTabs] = useState<"Active" | "Completed" | "Overdue">(
    "Active"
  );

  return (
    <>
      <Helmet>
        <title>Project {projectTitle} – Syncly</title>
      </Helmet>
      <div className="flex flex-col flex-1">
        <p className="text-xs font-medium text-[#7B849E]">
          Projects/
          <span className="text-black">{projectTitle}</span>
        </p>

        <div className="flex flex-col gap-2">
          {isOpenTitleEditor ? (
            <AutosizeTextarea
              minHeight={48}
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              onFocus={(e) => e.target.select()}
              autoFocus
              onBlur={() => {
                if (projectTitle === "") setProjectTitle(PLACEHOLDER.title);
                setIsOpenTitleEditor(false);
              }}
              className="p-0 text-4xl font-bold mt-3 pr-[20px] rounded-none"
            />
          ) : (
            <h1 className="text-4xl font-bold w-full mt-3 pr-[20px]">
              {projectTitle}
              <span className="ml-2">
                <button
                  className="text-[#7B849E]"
                  title="Edit Project Title"
                  onClick={() => setIsOpenTitleEditor(true)}
                >
                  <PencilLine size={28} />
                </button>
              </span>
            </h1>
          )}

          <div className="flex gap-2">
            <Button
              className="text-sm font-medium rounded-lg text-black border border-[#E0E5EB]"
              variant="ghost"
            >
              <Star strokeWidth={2} />
            </Button>
            <Button
              className="text-sm font-medium rounded-lg text-black border border-[#E0E5EB]"
              variant="ghost"
            >
              <Ellipsis strokeWidth={2} />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap mt-4 md:mt-6 gap-3">
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
              >
                <Users />
                <span>Manage Members</span>
              </Button>
            )}
          </div>
          <Button
            className="w-full mt-2 text-sm font-medium rounded-lg text-black border border-[#E0E5EB]"
            variant="ghost"
          >
            <Plus />
            <span>Create Task</span>
          </Button>
        </div>

        <Separator className="mt-4 mb-2" />

        <div className="flex flex-col sticky top-0 z-10 bg-white -mx-4 w-dvw px-4 border-b border-border">
          <p className="font-bold text-xl">Project Task</p>
          <div className="flex justify-between gap-2 relative -bottom-[1px]">
            <div className="flex gap-1.5 font-medium text-[#7B849E]">
              <button
                className={cn(
                  "py-2",
                  tabs === "Active" &&
                    "border-b border-black font-bold text-black"
                )}
                onClick={() => setTabs("Active")}
              >
                Active
              </button>
              <button
                className={cn(
                  "py-2",
                  tabs === "Completed" &&
                    "border-b border-black font-bold text-black"
                )}
                onClick={() => setTabs("Completed")}
              >
                Completed
              </button>
              <button
                className={cn(
                  "py-2",
                  tabs === "Overdue" &&
                    "border-b border-black font-bold text-black"
                )}
                onClick={() => setTabs("Overdue")}
              >
                Overdue
              </button>
            </div>
            <Select defaultValue="thisWeek">
              <SelectTrigger className="flex-1">
                <Calendar />
                <SelectValue
                  placeholder="Theme"
                  className="text-sm font-medium"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* <Separator className="-mx-4 w-dvw" /> */}

        <div className="bg-[#F6F6F9] -mx-4 -mb-5 w-dvw px-4 pt-4 pb-8 flex-1 flex flex-col gap-4">
          {Array.from({ length: 20 }, () => ({
            ...PLACEHOLDER.activeTask[0],
          })).map((task) => (
            <div className="flex gap-3 items-center justify-center w-full  text-base">
              <Avatar className="rounded-md z-0">
                <AvatarImage src="#" />
                <AvatarFallback className="bg-blue-100 text-blue-500 font-bold text-xs w-full flex items-center justify-center">
                  {getInitials(task.title)}
                </AvatarFallback>
              </Avatar>
              <p className="flex-1 truncate font-medium">{task.title}</p>
              <p className="flex-1">Due tomorrow</p>
              <Button
                className="min-w-0 min-h-0 aspect-square"
                variant="outline"
              >
                <Ellipsis />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
