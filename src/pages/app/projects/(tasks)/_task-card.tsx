import { TaskOnProjectDetail } from "@/api/projects/projectApi";
import { useUpdateTaskMutation } from "@/api/task/taskApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Chips from "@/components/ui/chips";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { useModals, useParams } from "@/router";
import dayjs from "dayjs";
import { ArrowRightLeft, Ellipsis, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export default function TaskCard({ task }: { task: TaskOnProjectDetail }) {
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  let dueDate = "";
  if (dayjs().subtract(1, "day").isAfter(task.dueDate)) {
    dueDate = `Due ${dayjs(task.dueDate).format("DD MMM YYYY")}`;
  } else {
    const due = dayjs(task.dueDate).add(1, "day");
    const now = dayjs();

    const yearDiff = due.diff(now, "year");
    const monthDiff = due.diff(now, "month");
    const dayDiff = due.diff(now, "day");

    dueDate =
      yearDiff > 0
        ? `Due in ${yearDiff} year${yearDiff > 1 ? "s" : ""}`
        : monthDiff > 0
        ? `Due in ${monthDiff} month${monthDiff > 1 ? "s" : ""}`
        : dayDiff === 0
        ? "Due Today"
        : dayDiff === 1
        ? "Due Tomorrow"
        : `Due in ${dayDiff} day${dayDiff > 1 ? "s" : ""}`;
  }

  const handleMarkTaskCompleted = async () => {
    const res = await updateTask({
      status: task.status === "ACTIVE" ? "COMPLETED" : "ACTIVE",
      projectId: params.projectId,
      taskId: task.id,
    });

    if (res.error) {
      toast.error(`Failed to mark task as ${task.status === "ACTIVE" ? "completed" : "active"}`);
      return;
    }

    toast.success(`Task marked as ${task.status === "ACTIVE" ? "completed" : "active"}`);
  };

  return (
    <div
      className="flex gap-3 items-center justify-center w-full text-base hover:bg-blue-50 py-2 px-4"
      role="button"
      onClick={() => {
        modals.open("/app/projects/task-detail", {
          at: "/app/projects/:projectId",
          params: { projectId: params.projectId },
          state: { taskId: task.id },
          viewTransition: true,
        });
      }}
    >
      <Avatar className="rounded-md z-0">
        <AvatarImage src="#" />
        <AvatarFallback className="bg-blue-100 text-blue-500 font-bold text-xs w-full flex items-center justify-center rounded-md">
          {getInitials(task.title)}
        </AvatarFallback>
      </Avatar>
      <p className="flex-1 truncate font-medium">{task.title}</p>
      <p className="flex-1">{dueDate}</p>
      <div className="flex-1">
        <Chips
          title={
            dayjs().subtract(1, "day").isAfter(task.dueDate)
              ? "Overdue"
              : task.status.charAt(0) + task.status.slice(1).toLowerCase()
          }
          variant={
            task.status === "PAUSED"
              ? "yellow"
              : task.status === "COMPLETED"
              ? "green"
              : dayjs().subtract(1, "day").isAfter(task.dueDate)
              ? "red"
              : "blue"
          }
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="min-w-0 min-h-0 aspect-square"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="h-fit">
          <DropdownMenuItem asChild>
            <Button
              variant="outline"
              className="font-medium w-full"
              onClick={(e) => {
                e.stopPropagation();
                modals.open("/app/projects/update-task", {
                  viewTransition: true,
                  state: {
                    taskId: task.id,
                    taskTitle: task.title,
                    taskDescription: task.description,
                    taskStatus: task.status,
                    taskDueDate: task.dueDate,
                  },
                });
              }}
            >
              <Pencil strokeWidth={2} />
              <span>Edit Task</span>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Button
              variant="outline"
              className="font-medium mt-1"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkTaskCompleted();
              }}
              isLoading={isLoading}
            >
              <ArrowRightLeft strokeWidth={2} />
              <span>{task.status === "COMPLETED" ? "Mark as active" : "Mark as completed"}</span>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="mt-1 w-full bg-red-100 hover:!bg-red-500 text-red-500 hover:!text-white focus-visible:ring-0"
              onClick={(e) => {
                e.stopPropagation();
                modals.open("/app/projects/confirm-delete-task", {
                  viewTransition: true,
                  state: { taskTitle: task.title, taskId: task.id, projectId: params.projectId },
                });
              }}
            >
              <Trash />
              <span>Delete task</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
