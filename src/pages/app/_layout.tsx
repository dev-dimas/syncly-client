import { useGetUserQuery } from "@/api/user/userApi";
import { RootState } from "@/app/store";
import logo from "@/assets/logo.jpg?lqip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LqipImage from "@/components/ui/lqip-image";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useAccessToken from "@/hooks/useAccessToken";
import useSSE from "@/hooks/useNotification";
import useNotifQueryState from "@/hooks/useNotifQueryState";
import { cn, getInitials } from "@/lib/utils";
import { Navigate, useModals, useParams } from "@/router";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { ArrowLeft, Bell, FolderClosed, Hash, LockIcon, LogOut, UserPenIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import SubSidebar from "./_sub-sidebar";

const MENU_LIST: { label: string; icon: ReactNode }[] = [
  {
    label: "Dashboard",
    icon: <FolderClosed />,
  },
  {
    label: "Notifications",
    icon: <Bell />,
  },
];

export default function Layout() {
  useSSE(import.meta.env.VITE_API_URL + "/api/notifications/sse");
  const { accessToken, clearAccessToken } = useAccessToken();
  const { data: user, isLoading } = useGetUserQuery(undefined, {
    skip: !accessToken,
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const { isNotificationsOpen, setIsNotificationsOpen } = useNotifQueryState();
  const modals = useModals();
  const params = useParams("/app/projects/:projectId");
  const hasNewMessage = useSelector((state: RootState) => state.notification.hasNewMessage);

  if (!user && isLoading && accessToken) return null;

  if (!isLoading && !user?.data.email) {
    if (accessToken) {
      clearAccessToken();
    }
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex w-full">
      <div
        className={cn(
          "flex min-h-dvh w-full transition-transform duration-300 ease-in-out md:transition-none md:duration-0 md:w-fit md:fixed md:top-0 md:left-0 md:z-10",
          params.projectId
            ? "scale-90 overflow-hidden md:scale-100 md:overflow-visible"
            : "scale-100"
        )}
      >
        <div
          className={cn(
            "min-h-dvh w-full flex relative transition-[height] delay-300 duration-0",
            params.projectId && "max-md:h-0"
          )}
        >
          <div className="h-dvh pt-6 p-3 md:p-6 border-r border-border sticky top-0">
            <nav className="h-full w-8 md:w-12 flex flex-col gap-6">
              <LqipImage image={logo} className="w-full aspect-square rounded-lg" />
              <Separator />
              <div className="flex flex-col gap-4">
                {MENU_LIST.map((link) => (
                  <Button
                    key={link.label}
                    className={cn(
                      "h-8 md:h-12 aspect-square w-full min-w-0 min-h-0 p-1.5 [&_svg]:size-5 md:[&_svg]:size-6 rounded-[8px] bg-transparent hover:bg-[#175CEA] text-[#7B849E] hover:text-white relative shadow-none",
                      link.label === "Dashboard" &&
                        !isNotificationsOpen &&
                        "bg-[#175CEA] text-white",
                      link.label === "Notifications" &&
                        isNotificationsOpen &&
                        "bg-[#175CEA] text-white"
                    )}
                    title={link.label}
                    onClick={() => {
                      if (link.label === "Notifications") {
                        setIsNotificationsOpen(true);
                      } else {
                        setIsNotificationsOpen(null);
                      }
                    }}
                    asChild
                  >
                    <Link
                      to={
                        link.label === "Dashboard"
                          ? isNotificationsOpen
                            ? { search: "" }
                            : "/app"
                          : { search: `?notifications=true` }
                      }
                    >
                      {link.icon}
                      {link.label === "Notifications" && hasNewMessage && (
                        <div className="w-[10px] h-[10px] bg-[#EF4444] rounded-full absolute right-1 top-1"></div>
                      )}
                    </Link>
                  </Button>
                ))}
              </div>
              <Separator />
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild disabled={isLoading}>
                  <Avatar className="rounded-full h-8 md:h-12 w-full min-w-0 min-h-0" role="button">
                    {!isLoading && user && user.data.avatar && (
                      <AvatarImage src={`${import.meta.env.VITE_API_URL}${user.data.avatar}`} />
                    )}
                    <AvatarFallback
                      className={cn(
                        "w-full flex items-center justify-center",
                        !isLoading && "bg-blue-100 text-blue-500 font-bold text-xs "
                      )}
                      asChild={isLoading}
                    >
                      {isLoading ? (
                        <Skeleton className="w-full h-full" />
                      ) : (
                        getInitials(user?.data.name ?? "")
                      )}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-fit flex flex-col p-2 gap-2">
                  <Button
                    className="text-xs"
                    onClick={() => {
                      setIsPopoverOpen(false);
                      modals.open("/app/edit-profile");
                    }}
                  >
                    <UserPenIcon />
                    Edit Profile
                  </Button>
                  <Button
                    className="text-xs"
                    onClick={() => {
                      setIsPopoverOpen(false);
                      modals.open("/app/change-password");
                    }}
                  >
                    <LockIcon />
                    Change Password
                  </Button>
                  <Button
                    className="text-xs bg-transparent text-red-500 border-2 border-red-500 hover:text-white"
                    variant="destructive"
                    onClick={() => {
                      setIsPopoverOpen(false);
                      modals.open("/app/confirm-logout");
                    }}
                  >
                    <LogOut />
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </nav>
          </div>
          <SubSidebar />
        </div>
      </div>
      <div
        className={cn(
          "absolute z-20 top-0 bg-white min-h-dvh transition-[left,opacity] duration-300 ease-in-out px-4 py-5 flex flex-col gap-4 md:relative md:h-full max-md:w-full md:w-[calc(100%-396.8px)] md:transition-none md:duration-0 md:right-0 md:z-0",
          params.projectId ? "opacity-100 left-[0%]" : "opacity-0 left-full w-0 min-h-0 h-0 p-0",
          "md:opacity-100 md:left-[396.8px]"
        )}
      >
        {params.projectId ? (
          <Link to="/app" className="md:hidden">
            <ArrowLeft />
          </Link>
        ) : (
          <div className="bg-[#F6F6F9] w-full min-h-dvh h-full hidden md:flex md:flex-col md:items-center md:justify-center text-gray-300 relative -top-12">
            <Hash size={100} />
            <span className="text-2xl font-medium">Choose a project</span>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}
