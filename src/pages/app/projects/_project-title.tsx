import { useUpdateProjectNameMutation } from "@/api/projects/projectApi";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { cn } from "@/lib/utils";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  projectId: string;
  title: string;
  isTeamProject: boolean;
  isOpenTitleEditor: boolean;
  isOwner: boolean;
  setIsOpenTitleEditor: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProjectTitle({
  projectId,
  title,
  isTeamProject,
  isOwner,
  isOpenTitleEditor,
  setIsOpenTitleEditor,
}: Props) {
  const [projectTitle, setProjectTitle] = useState(title);
  const [updateProjectName, { isLoading }] = useUpdateProjectNameMutation();

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      await handleUpdateProjectName();
    }
  };

  const handleUpdateProjectName = async () => {
    if (projectTitle === "") {
      setProjectTitle(title);
      return;
    }
    setIsOpenTitleEditor(false);

    const res = await updateProjectName({ id: projectId, name: projectTitle, isTeamProject });

    if (res.error) {
      toast.error("Failed to update project name");
      setProjectTitle(title);
      return;
    }
  };

  return isOpenTitleEditor ? (
    <AutosizeTextarea
      minHeight={48}
      value={projectTitle}
      onChange={(e) => setProjectTitle(e.target.value)}
      onFocus={(e) => e.target.select()}
      autoFocus
      onKeyDown={handleKeyDown}
      onBlur={handleUpdateProjectName}
      className="p-0 text-4xl font-bold mt-3 pr-[20px] rounded-none md:flex-1"
    />
  ) : (
    <h1
      className={cn(
        "text-4xl font-bold w-full mt-3 pr-[20px] md:flex-1",
        isLoading && "opacity-40"
      )}
    >
      {projectTitle}
      {isOwner && (
        <span className="ml-2">
          <button
            className="text-[#7B849E]"
            title="Edit Project Title"
            onClick={() => setIsOpenTitleEditor(true)}
          >
            <PencilLine size={28} />
          </button>
        </span>
      )}
    </h1>
  );
}
