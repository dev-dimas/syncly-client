import { useCreateProjectMutation } from "@/api/projects/projectApi";
import { RootState } from "@/app/store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AutoForm } from "@/components/ui/autoform";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useModals, useNavigate, useParams } from "@/router";
import createProjectSchema, { CreateProjectSchemaType } from "@/schema/createProjectSchema";
import { setIsTeamTabSelected } from "@/slices/tabProjectSlice";
import { ApiError } from "@/types/api";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function CreateProject() {
  const modals = useModals();
  const isTeamTabSelected = useSelector((state: RootState) => state.tabProject.isTeamTabSelected);
  const [isTeamProject, setIsTeamProject] = useState(isTeamTabSelected);
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const params = useParams("/app/projects/:projectId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    if (params.projectId) {
      modals.close({
        at: "/app/projects/:projectId",
        params: { projectId: params.projectId },
        viewTransition: true,
      });
      return;
    }
    modals.close({
      at: "/app",
      viewTransition: true,
    });
  };

  const handleCreateProject = async (data: CreateProjectSchemaType) => {
    const res = await createProject({ ...data, isTeamProject });

    if (res.error) {
      toast.error((res.error as ApiError).message);
      return;
    }

    dispatch(setIsTeamTabSelected(isTeamProject));

    navigate("/app/projects/:projectId", {
      replace: true,
      params: { projectId: res.data.data.project.id },
    });
    toast.success("Project created");
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col gap-1 max-w-[90%] sm:max-w-lg rounded-lg overflow-y-auto">
        <AlertDialogHeader className="flex flex-row justify-between items-center space-y-0">
          <AlertDialogTitle>Create Project</AlertDialogTitle>
          <Button
            className="min-h-0 min-w-0 p-1 rounded-full m-0 aspect-square w-4 h-4 absolute top-4 right-4"
            variant="ghost"
            onClick={handleCloseModal}
            disabled={isLoading}
          >
            <X />
          </Button>
        </AlertDialogHeader>
        <AutoForm
          schema={createProjectSchema}
          onFormInit={(form) => form.setFocus("name")}
          onSubmit={handleCreateProject}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isTeamProject"
                defaultChecked={isTeamTabSelected}
                checked={isTeamProject}
                onCheckedChange={(checked: boolean) => setIsTeamProject(checked)}
              />
              <Label id="isTeamProject">Create as a team project</Label>
            </div>
          </div>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create
          </Button>
        </AutoForm>
      </AlertDialogContent>
    </AlertDialog>
  );
}
