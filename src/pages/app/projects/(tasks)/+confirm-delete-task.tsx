import { useDeleteTaskMutation } from "@/api/task/taskApi";
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
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ConfirmDeleteTask() {
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const location = useLocation();
  const { taskTitle, taskId, projectId } = location.state;
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const handleCloseModal = () => {
    modals.close({
      at: "/app/projects/:projectId",
      replace: true,
      params: { projectId: params.projectId },
      viewTransition: true,
    });
  };

  const handleDelete = async () => {
    const res = await deleteTask({ taskId, projectId });

    if (res.error) {
      toast.error("Failed to delete task");
      return;
    }

    toast.success("Task deleted");
    handleCloseModal();
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 flex-1 overflow-auto">
          Are you sure you want to delete task "{taskTitle}"?
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} isLoading={isLoading}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
