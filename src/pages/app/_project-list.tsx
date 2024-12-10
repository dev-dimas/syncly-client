import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useParams } from "@/router";
import {
  Archive,
  Check,
  ChevronRight,
  FolderClosed,
  Hash,
  Star,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Favorite Projects",
      url: "#",
      icon: <Star strokeWidth={3.5} size={14} />,
      items: [
        {
          title: "Fav 1",
          url: "1",
        },
        {
          title: "Fav 2",
          url: "2",
        },
      ],
    },
    {
      title: "Projects",
      url: "#",
      icon: <FolderClosed strokeWidth={3.5} size={14} />,
      items: [
        {
          title: "Project 1",
          url: "3",
        },
        {
          title: "Project 2",
          url: "4",
        },
      ],
    },
    {
      title: "Archive Project",
      url: "#",
      icon: <Archive strokeWidth={3.5} size={14} />,
      items: [
        {
          title: "Archive 1",
          url: "5",
        },
        {
          title: "Archive 2",
          url: "6",
        },
      ],
    },
  ],
};

export default function ProjectList({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const params = useParams("/app/projects/:projectId");

  return (
    <SidebarProvider>
      <Sidebar {...props}>
        <SidebarContent>
          <SidebarGroup className="p-0 mt-4 mb-6">
            <SidebarMenu>
              {data.navMain.map((item, index) => (
                <>
                  <Collapsible
                    key={item.title}
                    defaultOpen={
                      item.title === "Archive Project" ? false : true
                    }
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild className="pb-3">
                        <SidebarMenuButton className="font-bold text-base">
                          {item.icon}
                          <span className="truncate">{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {item.items?.length ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={
                                    item.url === params.projectId ? true : false
                                  }
                                  className="font-medium  text-xs text-[#7B849E]"
                                >
                                  <Link to={`/app/projects/${item.url}`}>
                                    <Hash />
                                    <span className="truncate">
                                      {item.title}
                                    </span>
                                    {item.url === params.projectId && (
                                      <Check
                                        strokeWidth={3.5}
                                        className="absolute right-2"
                                      />
                                    )}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                  {index !== data.navMain.length - 1 && (
                    <SidebarSeparator className="my-4" />
                  )}
                </>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
