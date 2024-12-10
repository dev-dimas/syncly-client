import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, Ellipsis, Star, Trash } from "lucide-react";

const IS_OWNER = true;

export default function ProjectSettingButton() {
  return (
    <>
      <Button
        className="text-sm font-medium rounded-lg text-black border border-[#E0E5EB]"
        variant="ghost"
      >
        <Star strokeWidth={2} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="text-sm font-medium rounded-lg text-black border border-[#E0E5EB]"
            variant="ghost"
          >
            <Ellipsis strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Project Setting</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button variant="ghost" className="w-full">
              <Archive />
              <span>Move to archive</span>
            </Button>
          </DropdownMenuItem>
          {IS_OWNER && (
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="mt-1 w-full bg-red-100 hover:!bg-red-500 text-red-500 hover:!text-white focus-visible:ring-0"
              >
                <Trash />
                <span>Delete project</span>
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
