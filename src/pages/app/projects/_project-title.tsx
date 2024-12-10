import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { PLACEHOLDER } from "@/dummy-data/project-id";
import { PencilLine } from "lucide-react";

type Props = {
  projectTitle: string;
  setProjectTitle: React.Dispatch<React.SetStateAction<string>>;
  isOpenTitleEditor: boolean;
  setIsOpenTitleEditor: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProjectTitle({
  projectTitle,
  setProjectTitle,
  isOpenTitleEditor,
  setIsOpenTitleEditor,
}: Props) {
  return isOpenTitleEditor ? (
    <AutosizeTextarea
      minHeight={48}
      value={projectTitle}
      onChange={(e) => setProjectTitle(e.target.value)}
      onFocus={(e) => e.target.select()}
      autoFocus
      onBlur={() => {
        if (projectTitle === "") setProjectTitle(PLACEHOLDER.title);
        setIsOpenTitleEditor(false);
      }}
      className="p-0 text-4xl font-bold mt-3 pr-[20px] rounded-none md:flex-1"
    />
  ) : (
    <h1 className="text-4xl font-bold w-full mt-3 pr-[20px] md:flex-1">
      {projectTitle}
      <span className="ml-2">
        <button
          className="text-[#7B849E]"
          title="Edit Project Title"
          onClick={() => setIsOpenTitleEditor(true)}
        >
          <PencilLine size={28} />
        </button>
      </span>
    </h1>
  );
}
