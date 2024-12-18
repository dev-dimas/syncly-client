import { useGetUserQuery, useUpdateUserMutation } from "@/api/user/userApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AutoForm } from "@/components/ui/autoform";
import { Button } from "@/components/ui/button";
import { useModals, useParams } from "@/router";
import editProfileSchema, { EditProfileSchemaType } from "@/schema/editProfileSchema";
import { ApiError } from "@/types/api";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function EditProfile() {
  const { data: user, isLoading } = useGetUserQuery();
  const [updateUser, { isLoading: isLoadingUpdateUser }] = useUpdateUserMutation();
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");

  const handleCloseModal = () => {
    if (params.projectId) {
      modals.close({
        at: "/app/projects/:projectId",
        replace: true,
        params: { projectId: params.projectId },
        viewTransition: true,
      });
      return;
    }
    modals.close({
      at: "/app",
      replace: true,
      viewTransition: true,
    });
  };

  const handleUpdateUser = async (data: EditProfileSchemaType) => {
    if (data.name === user?.data.name && data.email === user?.data.email) {
      handleCloseModal();
      return;
    }

    const formData = new FormData();
    if (data.name !== user?.data.name) formData.append("name", data.name);
    if (data.email !== user?.data.email) formData.append("email", data.email);

    const res = await updateUser(formData);

    if (res.error) {
      toast.error((res.error as ApiError).message);
      return;
    }

    toast.success("Profile updated");
    handleCloseModal();
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col gap-1 max-w-[90%] sm:max-w-lg rounded-lg overflow-y-auto">
        <AlertDialogHeader className="flex flex-row justify-between items-center space-y-0">
          <AlertDialogTitle>Edit Profile</AlertDialogTitle>
          <Button
            className="min-h-0 min-w-0 p-1 rounded-full m-0 aspect-square w-4 h-4 absolute top-4 right-4"
            variant="ghost"
            onClick={handleCloseModal}
          >
            <X />
          </Button>
        </AlertDialogHeader>
        <div className="w-full flex justify-center"></div>
        <AutoForm
          schema={editProfileSchema}
          formProps={{
            style: {
              cursor: isLoading || isLoadingUpdateUser ? "not-allowed" : "auto",
              pointerEvents: isLoading || isLoadingUpdateUser ? "none" : "auto",
            },
          }}
          values={{
            name: isLoading || isLoadingUpdateUser ? "Loading..." : user?.data.name,
            email: isLoading || isLoadingUpdateUser ? "Loading..." : user?.data.email,
          }}
          uiComponents={{
            SubmitButton: () => (
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                isLoading={isLoadingUpdateUser}
              >
                Update
              </Button>
            ),
          }}
          onSubmit={handleUpdateUser}
          withSubmit
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}
