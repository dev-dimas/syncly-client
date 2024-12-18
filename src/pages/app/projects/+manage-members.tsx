import {
  projectApi,
  useAddProjectMemberMutation,
  useGetProjectMembersQuery,
} from "@/api/projects/projectApi";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useModals, useParams } from "@/router";
import { ApiError } from "@/types/api";
import { ChevronLeft, ChevronRight, Info, LoaderCircle, User, UserPlus, UserX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const LIMIT = 10;

export default function ManageMember() {
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const location = useLocation();
  const {
    isOwner,
    ownerId,
    totalMembers,
  }: { isOwner: boolean; ownerId: string; totalMembers: number } = location.state;
  const [page, setPage] = useState(1);
  const { data } = useGetProjectMembersQuery({ projectId: params.projectId, page, limit: LIMIT });
  const totalPage = Math.ceil((data?.data.total_members || totalMembers) / LIMIT);
  const dispatch = useDispatch();

  const handleInvalidate = () => {
    dispatch(
      projectApi.util.invalidateTags([{ type: "Project", id: `${params.projectId}-page-${page}` }])
    );
  };

  const handleNextPage = () => {
    if (page >= totalPage) return;
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <AlertDialog open={true}>
      <AlertDialogContent className="w-full h-full max-md:w-[90%] md:max-w-3xl max-h-[90%] md:max-h-[80%] flex flex-col rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{isOwner ? "Manage" : "View"} Members</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 flex-1 overflow-auto">
          {isOwner && <AddMemberForm invalidateQuery={handleInvalidate} />}
          <Table className="flex-1">
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className={"max-md:hidden"}>Email</TableHead>
                <TableHead className={cn(!isOwner && "hidden")}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.members.map(({ user }, index) => (
                <TableRow key={index + 1 + (page - 1) * LIMIT}>
                  <TableCell className="font-medium">{index + 1 + (page - 1) * LIMIT}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="max-md:hidden">{user.email}</TableCell>
                  <TableCell className={cn(!isOwner && "hidden")}>
                    {user.id === ownerId ? (
                      "Owner"
                    ) : (
                      <Button
                        variant="destructive"
                        onClick={() =>
                          modals.open("/app/projects/confirm-remove-member", {
                            state: {
                              memberName: user.name,
                              userId: user.id,
                              page,
                            },
                            viewTransition: true,
                          })
                        }
                      >
                        <UserX />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full justify-end items-center gap-2 my-2 text-xs">
            <Button
              variant={"outline"}
              className="min-w-0 min-h-0 p-0 m-0 rounded-full w-6 h-6"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              <ChevronLeft />
            </Button>
            <span>{page}</span>
            <Button
              variant={"outline"}
              className="min-w-0 min-h-0 p-0 m-0 rounded-full w-6 h-6"
              onClick={handleNextPage}
              disabled={page >= totalPage}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              modals.close({
                at: "/app/projects/:projectId",
                replace: true,
                params,
                viewTransition: true,
              })
            }
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function AddMemberForm({ invalidateQuery }: { invalidateQuery: () => void }) {
  const [isInputShow, setIsInputShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [addProjectMember, { isLoading }] = useAddProjectMemberMutation();
  const params = useParams("/app/projects/:projectId");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(inputValue);
      if (!isValidEmail) {
        toast.error("Invalid email format");
        return;
      }

      const res = await addProjectMember({ projectId: params.projectId, email: inputValue });

      if (res.error) {
        if ((res.error as ApiError).status === 404) {
          toast.error("User not found");
          return;
        }
        toast.error("Failed to add member");
        return;
      }

      invalidateQuery();
      setInputValue("");
      toast.success("Member added");
    }
  };

  useEffect(() => {
    if (isInputShow) {
      inputRef.current?.focus();
    }
  }, [isInputShow]);

  return (
    <>
      <div className={cn("relative", !isInputShow && "hidden")}>
        <Input
          className="focus-visible:ring-0 focus-visible:bg-gray-100 pl-10"
          placeholder="Input user email to add"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          type="email"
          ref={inputRef}
          disabled={isLoading}
        />
        {isLoading ? (
          <LoaderCircle
            className={cn("absolute top-1.5 left-2 text-muted-foreground animate-spin")}
          />
        ) : (
          <User
            className={cn(
              "absolute top-1.5 left-2 text-muted-foreground",
              inputValue && "text-black"
            )}
          />
        )}
        {inputValue !== "" ? (
          <span className="text-xs text-muted-foreground flex items-center gap-2 mt-3">
            <Info size={18} />
            Hit enter to add
          </span>
        ) : (
          <Button className="mt-3" onClick={() => setIsInputShow(false)}>
            Cancel
          </Button>
        )}
      </div>
      {!isInputShow && (
        <Button onClick={() => setIsInputShow(true)}>
          <UserPlus /> Add Member
        </Button>
      )}
    </>
  );
}
