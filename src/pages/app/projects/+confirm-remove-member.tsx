import { projectApi, useRemoveProjectMemberMutation } from "@/api/projects/projectApi";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useModals, useParams } from "@/router";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ConfirmRemoveMember() {
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const location = useLocation();
  const { memberName, userId, page } = location.state;
  const [removeMember, { isLoading }] = useRemoveProjectMemberMutation();
  const dispatch = useDispatch();

  const handleInvalidate = () => {
    dispatch(
      projectApi.util.invalidateTags([{ type: "Project", id: `${params.projectId}-page-${page}` }])
    );
  };

  const handleCloseModal = () => {
    modals.open("/app/projects/manage-members", {
      at: "/app/projects/:projectId",
      params: { projectId: params.projectId },
      viewTransition: true,
    });
  };

  const handleRemove = async () => {
    const res = await removeMember({ projectId: params.projectId, userId });

    if (res.error) {
      toast.error("Failed to remove member");
      return;
    }

    handleInvalidate();
    toast.success("Member removed");
    handleCloseModal();
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Member</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 flex-1 overflow-auto">
          Are you sure you want to remove "{memberName}" from project?
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleRemove} isLoading={isLoading}>
            Remove
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
