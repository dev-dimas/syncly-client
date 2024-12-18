import { useChangePasswordMutation } from "@/api/password/passwordApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AutoForm } from "@/components/ui/autoform";
import { Button } from "@/components/ui/button";
import { useModals, useParams } from "@/router";
import changePasswordSchema, { ChangePasswordSchemaType } from "@/schema/changePasswordSchema";
import { ApiError } from "@/types/api";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function ChangePassword() {
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const [changePassword] = useChangePasswordMutation();

  const handleCloseModal = () =>
    params.projectId
      ? modals.close({
          at: "/app/projects/:projectId",
          replace: true,
          params: { projectId: params.projectId },
          viewTransition: true,
        })
      : modals.close({
          at: "/app",
          replace: true,
          viewTransition: true,
        });

  const handleChangePassword = async (data: ChangePasswordSchemaType, resetForm: () => void) => {
    const res = await changePassword(data);

    if (res.error) {
      toast.error((res.error as ApiError).message);
      return;
    }

    resetForm();
    toast.success("Password changed");
    handleCloseModal();
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col gap-1 max-w-[90%] sm:max-w-lg rounded-lg overflow-y-auto">
        <AlertDialogHeader className="flex flex-row justify-between items-center space-y-0">
          <AlertDialogTitle>Change Password</AlertDialogTitle>
          <Button
            className="min-h-0 min-w-0 p-1 rounded-full m-0 aspect-square w-4 h-4 absolute top-4 right-4"
            variant="ghost"
            onClick={handleCloseModal}
          >
            <X />
          </Button>
        </AlertDialogHeader>
        <AutoForm
          schema={changePasswordSchema}
          onFormInit={(form) => form.setFocus("currentPassword")}
          uiComponents={{
            SubmitButton: () => (
              <Button type="submit" className="w-full">
                Save
              </Button>
            ),
          }}
          onSubmit={(values, form) => handleChangePassword(values, form.reset)}
          withSubmit
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
