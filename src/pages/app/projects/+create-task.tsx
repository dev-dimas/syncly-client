import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useModals, useParams } from "@/router";
import { Save } from "lucide-react";

export default function CreateTask() {
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Create Task</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 flex-1 overflow-auto"></div>
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
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="font-medium">
              <Save strokeWidth={2} />
              <span>Save</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
