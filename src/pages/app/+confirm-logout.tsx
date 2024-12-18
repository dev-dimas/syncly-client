import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useAccessToken from "@/hooks/useAccessToken";
import { useModals, useNavigate, useParams } from "@/router";
import { toast } from "sonner";

export default function ConfirmLogout() {
  const { clearAccessToken } = useAccessToken();
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAccessToken();
    toast.success("Logout success");
    navigate("/", { replace: true, state: null });
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 flex-1 overflow-auto">
          Are you sure you want to logout?
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              params.projectId
                ? modals.close({
                    at: "/app/projects/:projectId",
                    replace: true,
                    params,
                    viewTransition: true,
                  })
                : modals.close({
                    at: "/app",
                    replace: true,
                    viewTransition: true,
                  })
            }
          >
            Cancel
          </AlertDialogCancel>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
