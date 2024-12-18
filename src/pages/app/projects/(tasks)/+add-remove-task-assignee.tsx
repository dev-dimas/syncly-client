import { TaskOnProjectDetail } from "@/api/projects/projectApi";
import {
  useAddTaskAssigneeMutation,
  useGetTaskAssigneesQuery,
  useRemoveTaskAssigneeMutation,
} from "@/api/task/taskApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import MultiSelector, { Option } from "@/components/ui/multi-select";
import { Skeleton } from "@/components/ui/skeleton";
import { useModals } from "@/router";
import { ApiSuccess } from "@/types/api";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function AddRemoveTaskAssignee() {
  const modals = useModals();
  const location = useLocation();
  const taskDetail: ApiSuccess<{
    task: TaskOnProjectDetail & {
      createdAt: string;
    };
  }> = location.state.taskDetail;
  const taskId = taskDetail.data.task.id;
  const { data: assignees, isLoading } = useGetTaskAssigneesQuery(taskId);
  const [addAssignee, { isLoading: isLoadingAddAssignee }] = useAddTaskAssigneeMutation();
  const [removeAssignee, { isLoading: isLoadingRemoveAssignee }] = useRemoveTaskAssigneeMutation();
  const [selectValue, setSelectValue] = useState<Option[]>(
    assignees?.data.taskAssignee.map((user) => ({
      label: user.name,
      value: user.userId,
      fixed: user.userId === assignees.data.userId,
    })) || []
  );

  useEffect(() => {
    setSelectValue(
      assignees?.data.taskAssignee.map((user) => ({
        label: user.name,
        value: user.userId,
        fixed: user.userId === assignees.data.userId,
      })) || []
    );
  }, [assignees]);

  const multipleSelectOption: Option[] = useMemo(() => {
    if (!assignees) return [];
    return [...assignees.data.taskAssignee, ...assignees.data.availableAssignee].map((user) => ({
      label: user.name,
      value: user.userId,
    }));
  }, [assignees]);

  const handleCloseModal = () => {
    modals.open("/app/projects/task-detail", {
      state: { taskId },
      replace: true,
      viewTransition: true,
    });
  };

  const findChangedSelect = async (incomingValue: Option[]) => {
    const removed = selectValue.find(
      (oldItem) => !incomingValue.some((newItem) => newItem.value === oldItem.value)
    );
    if (removed) {
      const res = await removeAssignee({ taskId, userId: removed.value });

      if (res.error) {
        toast.error("Failed to remove task assignee");
        setSelectValue(selectValue.filter((item) => item.value !== removed.value));
        return;
      }
    }

    const added = incomingValue.find(
      (newItem) => !selectValue.some((oldItem) => oldItem.value === newItem.value)
    );
    if (added) {
      const res = await addAssignee({ taskId, userId: added.value });

      if (res.error) {
        toast.error("Failed to add task assignee");
        setSelectValue(selectValue.filter((item) => item.value !== added.value));
        return;
      }
    }
  };

  const handleOnSelectChange = async (val: Option[]) => {
    setSelectValue(val);
    await findChangedSelect(val);
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="max-h-[80%] flex flex-col gap-1 max-w-[90%] h-1/2 sm:max-w-lg rounded-lg overflow-y-auto">
        <AlertDialogHeader className="flex flex-row gap-1 items-center space-y-0">
          <Button
            className="min-h-0 min-w-0 rounded-full p-0 px-2 m-0 w-fit h-8 relative -left-2"
            variant="ghost"
            onClick={handleCloseModal}
          >
            <ArrowLeft />
          </Button>
          <AlertDialogTitle>Add/Remove Task Assignee</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-3 relative">
          {isLoading && !assignees ? (
            <Skeleton className="w-full h-10 rounded-md" />
          ) : (
            <MultiSelector
              placeholder="Type to add assignee"
              defaultOptions={[...multipleSelectOption]}
              value={selectValue}
              onChange={handleOnSelectChange}
              emptyIndicator="No available assignee"
              badgeClassName="bg-gray-500 text-white"
              hideClearAllButton
              disabled={isLoading || isLoadingAddAssignee || isLoadingRemoveAssignee}
            />
          )}
          {(isLoading || isLoadingAddAssignee || isLoadingRemoveAssignee) && (
            <LoaderCircle className="absolute z-40 animate-spin right-3 top-2" />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
