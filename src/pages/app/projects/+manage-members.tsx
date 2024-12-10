import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModals, useParams } from "@/router";

export default function ManageMember() {
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Manage Members</AlertDialogTitle>
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
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
