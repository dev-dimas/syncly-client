import { Archive, ChevronRight, FolderClosed, Hash, Star } from "lucide-react";
import React from "react";

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

const data = {
  navMain: [
    {
      title: "Favorite Projects",
      url: "#",
      icon: <Star strokeWidth={3.5} size={14} />,
      items: [
        {
          title: "Fav 1",
          url: "#",
        },
        {
          title: "Fav 2",
          url: "#",
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
          url: "#",
        },
        {
          title: "Project 2",
          url: "#",
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
          url: "#",
        },
        {
          title: "Archive 2",
          url: "#",
        },
      ],
    },
  ],
};

export default function ProjectList({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar {...props}>
        <SidebarContent>
          <SidebarGroup className="p-0 mt-4">
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
                          {item.title}
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
                                  isActive={false}
                                  className="font-medium text-xs text-[#7B849E]"
                                >
                                  <a href={item.url}>
                                    <Hash color="#7B849E" />
                                    {item.title}
                                  </a>
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
