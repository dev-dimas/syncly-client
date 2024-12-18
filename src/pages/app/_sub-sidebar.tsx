import { useReadAllMessageMutation } from "@/api/notification/notificationApi";
import { useGetAllProjectsQuery } from "@/api/projects/projectApi";
import { RootState } from "@/app/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useNotifQueryState from "@/hooks/useNotifQueryState";
import { cn, getInitials, getRelativeTime } from "@/lib/utils";
import { useModals } from "@/router";
import { clearRedDotNotification } from "@/slices/notificationSlice";
import { setIsTeamTabSelected } from "@/slices/tabProjectSlice";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import ProjectList from "./_project-list";

export default function SubSidebar() {
  const { isNotificationsOpen } = useNotifQueryState();

  return (
    <div className="flex-1 min-h-dvh md:flex-none md:w-full md:max-w-[300px] md:border-r md:border-border md:overflow-x-clip">
      {isNotificationsOpen ? <NotificationsSidebar /> : <ProjectSidebar />}
    </div>
  );
}

function ProjectSidebar() {
  const modals = useModals();
  const { data, isLoading } = useGetAllProjectsQuery();
  const dispatch = useDispatch();
  const isTeamTabSelected = useSelector((state: RootState) => state.tabProject.isTeamTabSelected);
  const handleChangeTab = (isTeamTab: boolean) => dispatch(setIsTeamTabSelected(isTeamTab));

  const teamProject = data?.data.team_projects ?? [];
  const personalProject = data?.data.personal_projects ?? [];

  return (
    <div className="w-full px-6 flex flex-col md:max-h-dvh md:h-full">
      <h1 className="text-2xl py-4 font-bold sticky top-0 bg-white z-10">All Projects</h1>
      <div className="flex-1 flex flex-col w-full">
        {/* Project Tabs */}
        <div className="flex flex-col relative md:h-full">
          {/* Project Tabs Item */}
          <div className="flex w-full sticky top-[64px] z-10 bg-white">
            <button
              className={cn(
                "flex-1 font-bold text-sm py-4 text-[#7B849E]",
                isTeamTabSelected &&
                  "relative text-black after:absolute after:w-full after:h-[1px] after:bg-black after:-bottom-[1px] after:left-0 after:z-10"
              )}
              onClick={() => handleChangeTab(true)}
            >
              Team
            </button>
            <button
              className={cn(
                "flex-1 font-bold text-sm py-4 text-[#7B849E]",
                !isTeamTabSelected &&
                  "relative text-black after:absolute after:w-full after:h-[1px] after:bg-black after:-bottom-[1px] after:left-0 after:z-10"
              )}
              onClick={() => handleChangeTab(false)}
            >
              Personal
            </button>
          </div>
          <Separator className="-mx-6 w-[calc(100%+48px)] sticky top-[116px] z-[1] md:w-dvw" />
          <Button
            className="mt-3 rounded-lg text-sm font-bold shadow-sm border-2"
            variant="outline"
            onClick={() => modals.open("/app/create-project")}
          >
            <Plus />
            New Projects
          </Button>
          <ProjectList
            projectList={teamProject}
            isLoading={isLoading}
            className={cn(!isTeamTabSelected && "hidden")}
            id="team-project-list"
          />
          <ProjectList
            projectList={personalProject}
            isLoading={isLoading}
            className={cn(isTeamTabSelected && "hidden")}
            id="personal-project-list"
          />
        </div>
      </div>
    </div>
  );
}

function NotificationsSidebar() {
  const messages = useSelector((state: RootState) => state.notification.messages);
  const dispatch = useDispatch();
  const [readAllMessage] = useReadAllMessageMutation();

  useEffect(() => {
    return () => {
      readAllMessage();
      dispatch(clearRedDotNotification());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Notifications – Syncly</title>
      </Helmet>
      <div className="w-full px-6 flex flex-col md:max-h-dvh md:h-full md:overflow-y-auto">
        <h1 className="text-2xl py-4 font-bold sticky top-0 bg-white z-10">Notifications</h1>
        <div className="flex flex-col w-full flex-1 mb-8 gap-1">
          {messages.length > 0 ? (
            messages.map((notif, index) => (
              <>
                <div
                  className={cn(
                    "flex items-start py-4 px-2 gap-4 rounded-lg",
                    !notif.seen && "bg-blue-100/80"
                  )}
                  key={notif.createdAt}
                >
                  <Avatar className="bg-blue-500 flex items-center justify-center">
                    <AvatarFallback className="bg-transparent text-white">
                      {getInitials(notif.title)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex flex-col">
                    <p className="font-bold text-base">{notif.title}</p>
                    <p className="text-sm">{notif.description}</p>
                    <p className="text-xs text-gray-400">{getRelativeTime(notif.createdAt)}</p>
                  </div>
                </div>
                {index !== messages.length - 1 && <Separator />}
              </>
            ))
          ) : (
            <p className="h-full flex items-center text-muted-foreground">
              You dont have any notification
            </p>
          )}
        </div>
      </div>
    </>
  );
}
