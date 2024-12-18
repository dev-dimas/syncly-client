import { useDeleteProjectMutation } from "@/api/projects/projectApi";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useModals, useNavigate, useParams } from "@/router";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ConfirmLeaveProject() {
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner, isTeamProject } = location.state;
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const handleLeaveProject = async () => {
    const res = await deleteProject({ id: params.projectId, isTeamProject });

    if (res.error) {
      toast.error(`Failed to ${isOwner ? "delete" : "leave"} project`);
      return;
    }

    navigate("/app", { replace: true });
    toast.success(`Successfully ${isOwner ? "deleted" : "left"} project`);
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>{isOwner ? "Delete" : "Leave"} Project</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 flex-1 overflow-auto">
          Are you sure you want to {isOwner ? "delete" : "leave"} this project?
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
            Cancel
          </AlertDialogCancel>
          <Button variant="destructive" onClick={handleLeaveProject} isLoading={isLoading}>
            {isOwner ? "Delete" : "Leave"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
