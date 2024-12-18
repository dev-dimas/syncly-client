import { useCreateTaskMutation } from "@/api/task/taskApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AutoForm } from "@/components/ui/autoform";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useModals, useParams } from "@/router";
import createTaskSchema, { CreateTaskSchema } from "@/schema/createTaskSchema";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateTask() {
  const [date, setDate] = useState<Date>();
  const [dateFieldError, setDateFieldError] = useState(false);
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleCreateTask = async (data: CreateTaskSchema) => {
    if (!date) return setDateFieldError(true);

    const res = await createTask({ ...data, dueDate: date, projectId: params.projectId });

    if (res.error) {
      toast.error("Failed to create task");
      return;
    }

    toast.success("Task created");
    modals.close({
      at: "/app/projects/:projectId",
      params: { projectId: params.projectId },
      viewTransition: true,
    });
  };

  useEffect(() => {
    if (date) setDateFieldError(false);
  }, [date]);

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col gap-1 max-w-[90%] sm:max-w-lg rounded-lg overflow-y-auto">
        <AlertDialogHeader className="flex flex-row justify-between items-center space-y-0">
          <AlertDialogTitle>Create Task</AlertDialogTitle>
          <Button
            className="min-h-0 min-w-0 p-1 rounded-full m-0 aspect-square w-4 h-4 absolute top-4 right-4"
            variant="ghost"
            onClick={() =>
              modals.close({
                at: "/app/projects/:projectId",
                replace: true,
                params: { projectId: params.projectId },
                viewTransition: true,
              })
            }
          >
            <X />
          </Button>
        </AlertDialogHeader>
        <AutoForm
          schema={createTaskSchema}
          onFormInit={(form) => form.setFocus("title")}
          onSubmit={handleCreateTask}
        >
          <div className="space-y-2">
            <Label>
              Due Date <span className="text-destructive"> *</span>
            </Label>
            <DatePicker disablePast {...{ date, setDate }} />
            <p className={cn("text-sm text-destructive", !dateFieldError && "hidden")}>
              {date ? "Invalid date" : "Due date is required!"}
            </p>
          </div>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Task
          </Button>
        </AutoForm>
      </AlertDialogContent>
    </AlertDialog>
  );
}
