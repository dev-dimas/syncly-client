import logo from "@/assets/nft-3.jpg?lqip";
import { Button } from "@/components/ui/button";
import LqipImage from "@/components/ui/lqip-image";
import { Separator } from "@/components/ui/separator";
import useNotifQueryState from "@/hooks/useNotifQueryState";
import { cn } from "@/lib/utils";
import { ArrowLeft, Bell, FolderClosed, Hash } from "lucide-react";
import { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import SubSidebar from "./_sub-sidebar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useParams } from "@/router";

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
  const { isNotificationsOpen, setIsNotificationsOpen } = useNotifQueryState();
  const params = useParams("/app/projects/:projectId");

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
        <div className="min-h-dvh w-full flex relative">
          <div className="h-dvh pt-6 p-3 md:p-6 border-r border-border sticky top-0">
            <nav className="h-full w-8 md:w-12 flex flex-col gap-6">
              <LqipImage
                image={logo}
                className="w-full aspect-square rounded-lg"
              />
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
                    onClick={() =>
                      link.label === "Notifications"
                        ? setIsNotificationsOpen(true)
                        : setIsNotificationsOpen(null)
                    }
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
                      {link.label === "Notifications" && (
                        <div className="w-[10px] h-[10px] bg-[#EF4444] rounded-full absolute right-1 top-1"></div>
                      )}
                    </Link>
                  </Button>
                ))}
              </div>
              <Separator />
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="rounded-full h-8 md:h-12 w-full min-w-0 min-h-0 p-2">
                    AV
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit flex flex-col p-2 gap-2">
                  <Button className="text-xs">Edit Profile</Button>
                  <Button className="text-xs">Logout</Button>
                </PopoverContent>
              </Popover>
            </nav>
          </div>
          <SubSidebar />
        </div>
      </div>
      <div
        className={cn(
          "absolute z-20 top-0 bg-white shadow-2xl min-h-dvh transition-[left,opacity] duration-300 ease-in-out px-4 py-5 flex flex-col gap-4 md:relative md:h-full max-md:w-full md:w-[calc(100%-396.8px)] md:transition-none md:duration-0 md:shadow-none md:right-0 md:z-0",
          params.projectId
            ? "opacity-100 left-[0%]"
            : "opacity-0 left-full w-0 min-h-0 h-0 p-0",
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
