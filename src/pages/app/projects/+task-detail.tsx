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
import { PLACEHOLDER } from "@/dummy-data/project-id";
import { cn, getInitials } from "@/lib/utils";
import { useModals, useParams } from "@/router";
import dayjs from "dayjs";
import { Check } from "lucide-react";
import { ReactNode } from "react";

export default function TaskDetail() {
  const params = useParams("/app/projects/:projectId");
  const modals = useModals();

  const taskDetail = PLACEHOLDER.activeTask[0];

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Task Details</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 flex-1 overflow-auto">
          <Detail label="Title" data={taskDetail.title} />
          <Detail label="Description" data={taskDetail.description} />
          <Detail label="Status">
            <Chips
              title={
                dayjs().isAfter(taskDetail.dueDate)
                  ? "Overdue"
                  : taskDetail.status
              }
              variant={
                dayjs().isAfter(taskDetail.dueDate)
                  ? "red"
                  : taskDetail.status === "Active"
                  ? "blue"
                  : taskDetail.status === "Completed"
                  ? "green"
                  : "yellow"
              }
            />
          </Detail>
          <Detail
            label="Due Date"
            data={dayjs(taskDetail.dueDate).format("DD MMMM YYYY, hh:mm A")}
          />
          <Detail label="Assigned To">
            <div className="flex gap-2 flex-wrap">
              {[
                ...taskDetail.assignedTo,
                ...taskDetail.assignedTo,
                ...taskDetail.assignedTo,
              ].map((user, index, arr) => (
                <div
                  key={user.userId}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <Avatar key={user.userId}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-500 font-bold w-full flex items-center justify-center">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {user.name}
                    <span>{index !== arr.length - 1 && " ,"}</span>
                  </span>
                </div>
              ))}
            </div>
          </Detail>
          <Detail
            label="Created At"
            data={dayjs(taskDetail.createdAt).format("DD MMMM YYYY, hh:mm A")}
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
              className="bg-green-200 hover:bg-green-500 text-green-500 hover:text-white font-medium"
            >
              <Check strokeWidth={2} />
              <span>Mark as completed</span>
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

      {typeof data === "string" && (
        <span className="text-sm font-medium text-black">{data}</span>
      )}

      {children}
    </div>
  );
}
