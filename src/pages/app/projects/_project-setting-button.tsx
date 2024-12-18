import { useToggleArchiveMutation, useToggleFavoriteMutation } from "@/api/projects/projectApi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useModals, useParams } from "@/router";
import { Archive, Ellipsis, LogOut, Star, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProjectSettingButton({
  isOwner,
  isTeamProject,
  isFavorite,
  isArchived,
}: {
  isOwner: boolean;
  isTeamProject: boolean;
  isFavorite: boolean;
  isArchived: boolean;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const [toggleArchive, { isLoading }] = useToggleArchiveMutation();
  const [toggleFavorite, { isLoading: isFavoriteLoading }] = useToggleFavoriteMutation();

  const handleToggleArchive = async () => {
    const res = await toggleArchive({ id: params.projectId, isTeamProject });
    if (res.error) {
      toast.error(`Failed to ${isArchived ? "unarchive" : "archive"} project`);
      return;
    }
  };

  const handleToggleFavorite = async () => {
    const res = await toggleFavorite({ id: params.projectId, isTeamProject });
    if (res.error) {
      toast.error(`Failed to ${isFavorite ? "unfavorite" : "favorite"} project`);
      return;
    }
  };

  return (
    <>
      <Button
        className={cn(
          "text-sm font-medium rounded-lg border border-[#E0E5EB]",
          (isFavoriteLoading && isFavorite) || (!isFavoriteLoading && !isFavorite)
            ? "bg-white text-black hover:bg-white hover:text-black"
            : "bg-yellow-300 text-white hover:bg-yellow-300 hover:text-white"
        )}
        variant="ghost"
        onClick={handleToggleFavorite}
      >
        <Star
          strokeWidth={2}
          className={cn(
            (isFavoriteLoading && isFavorite) || (!isFavoriteLoading && !isFavorite)
              ? "fill-transparent"
              : "fill-white"
          )}
        />
      </Button>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleToggleArchive}
              isLoading={isLoading}
            >
              <Archive />
              <span>Move {isArchived ? "from" : "to"} archive</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="mt-1 w-full bg-red-100 hover:!bg-red-500 text-red-500 hover:!text-white focus-visible:ring-0"
              onClick={() => {
                setIsDropdownOpen(false);
                modals.open("/app/projects/confirm-leave-project", {
                  state: { isOwner, isTeamProject },
                });
              }}
            >
              {isOwner ? (
                <>
                  <Trash />
                  <span>Delete project</span>
                </>
              ) : (
                <>
                  <LogOut />
                  <span>Leave project</span>
                </>
              )}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
