import { useUpdateTaskMutation } from "@/api/task/taskApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AutoForm } from "@/components/ui/autoform";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useModals, useParams } from "@/router";
import updateTaskSchema, { UpdateTaskSchema } from "@/schema/updateTaskSchema";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function UpdateTask() {
  const location = useLocation();
  const { taskId, taskTitle, taskDescription, taskStatus, taskDueDate } = location.state;
  const [date, setDate] = useState<Date | undefined>(taskDueDate);
  const [dateFieldError, setDateFieldError] = useState(false);
  const [selectValue, setSelectValue] = useState(taskStatus);
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const handleUpdateTask = async (data: UpdateTaskSchema) => {
    if (!date) return setDateFieldError(true);

    const res = await updateTask({
      ...data,
      status: selectValue,
      taskId,
      dueDate: date,
      projectId: params.projectId,
    });

    if (res.error) {
      toast.error("Failed to update task");
      return;
    }

    toast.success("Task updated");
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
          <AlertDialogTitle>Update Task</AlertDialogTitle>
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
          schema={updateTaskSchema}
          onFormInit={(form) => {
            form.setFocus("title");
          }}
          defaultValues={{
            title: taskTitle,
            description: taskDescription,
          }}
          onSubmit={handleUpdateTask}
        >
          <div className="space-y-2">
            <Label>
              Status <span className="text-destructive"> *</span>
            </Label>
            <Select defaultValue={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select task status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="PAUSED">Pause</SelectItem>
                <SelectItem value="COMPLETED">Complete</SelectItem>
              </SelectContent>
            </Select>

            <p className={cn("text-sm text-destructive", !dateFieldError && "hidden")}>
              {date ? "Invalid date" : "Due date is required!"}
            </p>
          </div>
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
            Update Task
          </Button>
        </AutoForm>
      </AlertDialogContent>
    </AlertDialog>
  );
}
