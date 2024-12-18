import { useGetTaskDetailQuery, useUpdateTaskMutation } from "@/api/task/taskApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Chips from "@/components/ui/chips";
import { cn, getInitials } from "@/lib/utils";
import { useModals, useParams } from "@/router";
import dayjs from "dayjs";
import { ArrowRightLeft, Settings } from "lucide-react";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function TaskDetail() {
  const params = useParams("/app/projects/:projectId");
  const modals = useModals();
  const location = useLocation();
  const { taskId } = location.state;
  const { data: taskDetail, isLoading } = useGetTaskDetailQuery(taskId);
  const [updateTask, { isLoading: isLoadingUpdateTask }] = useUpdateTaskMutation();

  if (isLoading || !taskDetail) return null;

  const handleMarkTaskCompleted = async () => {
    const res = await updateTask({
      status: taskDetail.data.task.status === "ACTIVE" ? "COMPLETED" : "ACTIVE",
      projectId: params.projectId,
      taskId: taskDetail.data.task.id,
    });

    if (res.error) {
      toast.error(
        `Failed to mark task as ${
          taskDetail.data.task.status === "ACTIVE" ? "completed" : "active"
        }`
      );
      return;
    }

    toast.success(
      `Task marked as ${taskDetail.data.task.status === "ACTIVE" ? "completed" : "active"}`
    );
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Task Details</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 flex-1 overflow-auto">
          <Detail label="Title" data={taskDetail?.data.task.title} />
          <Detail label="Description" data={taskDetail?.data.task.description || "-"} />
          <Detail label="Status">
            <Chips
              title={
                dayjs().subtract(1, "day").isAfter(taskDetail?.data.task.dueDate)
                  ? "Overdue"
                  : taskDetail?.data.task.status.charAt(0) +
                    taskDetail?.data.task.status.slice(1).toLowerCase()
              }
              variant={
                dayjs().subtract(1, "day").isAfter(taskDetail?.data.task.dueDate)
                  ? "red"
                  : taskDetail?.data.task.status === "ACTIVE"
                  ? "blue"
                  : taskDetail?.data.task.status === "COMPLETED"
                  ? "green"
                  : "yellow"
              }
            />
          </Detail>
          <Detail
            label="Due Date"
            data={dayjs(taskDetail.data.task.dueDate).format("DD MMMM YYYY")}
          />
          <Detail label="Assigned To">
            <div className="flex gap-2 flex-wrap min-w-full">
              {taskDetail.data.task.assignedTo.map((assignee, index, arr) => (
                <div key={assignee.user.name + index} className="flex items-center gap-1.5 text-xs">
                  <Avatar>
                    <AvatarImage src={assignee.user.avatar || "#"} />
                    <AvatarFallback className="bg-blue-100 text-blue-500 font-bold w-full flex items-center justify-center">
                      {getInitials(assignee.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {assignee.user.name}
                    <span>{index !== arr.length - 1 && " ,"}</span>
                  </span>
                </div>
              ))}
            </div>
            <Button
              className="min-w-full shadow-sm mt-2"
              variant="outline"
              onClick={() => {
                modals.open("/app/projects/add-remove-task-assignee", {
                  state: { taskDetail },
                  viewTransition: true,
                });
              }}
            >
              <Settings strokeWidth={2} />
              Add/remove task assignee
            </Button>
          </Detail>
          <Detail
            label="Created At"
            data={dayjs(taskDetail.data.task.createdAt).format("DD MMMM YYYY, hh:mm A")}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              modals.close({
                at: "/app/projects/:projectId",
                replace: true,
                params,
                viewTransition: true,
              })
            }
          >
            Close
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="ghost"
              className={cn(
                "hover:text-white font-medium",
                taskDetail.data.task.status === "ACTIVE" &&
                  "bg-green-200 hover:bg-green-500 text-green-500",
                taskDetail.data.task.status === "COMPLETED" ||
                  (taskDetail.data.task.status === "PAUSED" &&
                    "bg-blue-200 hover:bg-blue-500 text-blue-500")
              )}
              isLoading={isLoadingUpdateTask}
              onClick={handleMarkTaskCompleted}
            >
              <ArrowRightLeft strokeWidth={2} />
              <span>
                Mark as {taskDetail.data.task.status === "ACTIVE" ? "completed" : "active"}
              </span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Detail({
  label,
  className,
  data,
  children,
}: {
  label: string;
  className?: string;
  data?: string | Record<string, string>[] | ReactNode;
  children?: ReactNode;
}) {
  return (
    <div key={label} className={cn("flex flex-col items-start", className)}>
      <span className="text-sm font-medium text-[#7B849E]">{label}</span>

      {typeof data === "string" && <span className="text-sm font-medium text-black">{data}</span>}

      {children}
    </div>
  );
}
