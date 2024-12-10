import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/dummy-data/project-id";
import { getInitials } from "@/lib/utils";
import { useModals, useParams } from "@/router";
import { Check, Ellipsis, Trash } from "lucide-react";

const IS_OWNER = true;

export default function TaskCard({ task }: { task: Task }) {
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  return (
    <div
      className="flex gap-3 items-center justify-center w-full text-base hover:bg-blue-50 py-2 px-4"
      role="button"
      onClick={() => {
        modals.open("/app/projects/task-detail", {
          at: "/app/projects/:projectId",
          params: { projectId: params.projectId },
          replace: true,
          viewTransition: true,
        });
      }}
    >
      <Avatar className="rounded-md z-0">
        <AvatarImage src="#" />
        <AvatarFallback className="bg-blue-100 text-blue-500 font-bold text-xs w-full flex items-center justify-center">
          {getInitials(task.title)}
        </AvatarFallback>
      </Avatar>
      <p className="flex-1 truncate font-medium">{task.title}</p>
      <p className="flex-1">Due tomorrow</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="min-w-0 min-h-0 aspect-square"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              console.log("object");
            }}
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Button variant="outline" className="font-medium">
              <Check strokeWidth={2} />
              <span>Mark as completed</span>
            </Button>
          </DropdownMenuItem>
          {IS_OWNER && (
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="mt-1 w-full bg-red-100 hover:!bg-red-500 text-red-500 hover:!text-white focus-visible:ring-0"
              >
                <Trash />
                <span>Delete task</span>
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
