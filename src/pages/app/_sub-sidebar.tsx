import { Separator } from "@/components/ui/separator";
import useNotifQueryState from "@/hooks/useNotifQueryState";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ProjectList from "./_project-list";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default function SubSidebar() {
  const { isNotificationsOpen } = useNotifQueryState();

  return (
    <div className="flex-1 min-h-dvh">
      {isNotificationsOpen ? <NotificationsSidebar /> : <ProjectSidebar />}
    </div>
  );
}

function ProjectSidebar() {
  const [isTeamTabSelected, setIsTeamTabSelected] = useState<boolean>(true);

  return (
    <div className="w-full px-6 flex flex-col">
      <h1 className="text-2xl py-4 font-bold sticky top-0 bg-white z-10">
        All Projects
      </h1>
      <div className="flex flex-col w-full">
        {/* Project Tabs */}
        <div className="flex flex-col w-full">
          {/* Project Tabs Item */}
          <div className="flex w-full sticky top-[64px] z-10 bg-white">
            <button
              className={cn(
                "flex-1 font-bold text-sm py-4 text-[#7B849E]",
                isTeamTabSelected &&
                  "relative text-black after:absolute after:w-full after:h-[1px] after:bg-black after:-bottom-[1px] after:left-0 after:z-10"
              )}
              onClick={() => setIsTeamTabSelected(true)}
            >
              Team
            </button>
            <button
              className={cn(
                "flex-1 font-bold text-sm py-4 text-[#7B849E]",
                !isTeamTabSelected &&
                  "relative text-black after:absolute after:w-full after:h-[1px] after:bg-black after:-bottom-[1px] after:left-0 after:z-10"
              )}
              onClick={() => setIsTeamTabSelected(false)}
            >
              Personal
            </button>
          </div>
          <Separator className="-mx-6 w-[calc(100%+48px)] sticky top-[116px] z-[1]" />
          <ProjectList />
        </div>
      </div>
    </div>
  );
}

const NOTIFICATIONS = [
  {
    from: "Project 1",
    message: "Project 1 has been updated",
    time: "3 hours ago",
  },
  {
    from: "Project 1",
    message: "Project 1 has been updated",
    time: "3 hours ago",
  },
  {
    from: "Project 1",
    message: "Project 1 has been updated",
    time: "3 hours ago",
  },
  {
    from: "Project 1",
    message: "Project 1 has been updated",
    time: "3 hours ago",
  },
];

function NotificationsSidebar() {
  return (
    <>
      <Helmet>
        <title>Notifications – Syncly</title>
      </Helmet>
      <div className="w-full px-6 flex flex-col">
        <h1 className="text-2xl py-4 font-bold sticky top-0 bg-white z-10">
          Notifications
        </h1>
        <div className="flex flex-col w-full mt-4">
          {[
            ...NOTIFICATIONS,
            ...NOTIFICATIONS,
            ...NOTIFICATIONS,
            ...NOTIFICATIONS,
            ...NOTIFICATIONS,
          ].map((notif, index, notifications) => (
            <>
              <div className="flex items-start gap-4">
                <Avatar className="bg-blue-500 flex items-center justify-center">
                  <AvatarFallback>P1</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex flex-col">
                  <p className="font-bold text-base">{notif.from}</p>
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-gray-400">{notif.time}</p>
                </div>
              </div>
              {index !== notifications.length - 1 && (
                <Separator className="my-4" />
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
