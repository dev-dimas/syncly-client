import { TaskOnProjectDetail } from "@/api/projects/projectApi";
import TaskCard from "./_task-card";

type Props = {
  tasks: TaskOnProjectDetail[];
  category: string;
};
export default function TaskList({ tasks, category }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-[#7B849E]">
          Currently there are no {category.toLowerCase()} tasks in this project
        </p>
      </div>
    );
  }

  return tasks
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .map((task) => <TaskCard key={task.id} task={task} />);
}
