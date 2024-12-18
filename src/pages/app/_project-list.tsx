import { DashboardProjectType } from "@/api/projects/projectApi";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@/router";
import { Archive, Check, ChevronRight, FolderClosed, Hash, Star } from "lucide-react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

type ProjectList = {
  title: string;
  url: string;
  icon: React.ReactNode;
  projects: {
    name: string;
    id: string;
  }[];
}[];

const NAV_MAIN: ProjectList = [
  {
    title: "Favorite Projects",
    url: "#",
    icon: <Star strokeWidth={3.5} size={14} />,
    projects: [],
  },
  {
    title: "Projects",
    url: "#",
    icon: <FolderClosed strokeWidth={3.5} size={14} />,
    projects: [],
  },
  {
    title: "Archive Project",
    url: "#",
    icon: <Archive strokeWidth={3.5} size={14} />,
    projects: [],
  },
];

type Props = {
  projectList: DashboardProjectType[];
  isLoading?: boolean;
};
export default function ProjectList({
  projectList,
  isLoading = false,
  className,
  ...props
}: React.ComponentProps<typeof Sidebar> & Props) {
  const params = useParams("/app/projects/:projectId");

  const favoriteProjects = useMemo(
    () => projectList.filter((project) => project.is_favorite),
    [projectList]
  );
  const regularProjects = useMemo(
    () => projectList.filter((project) => !project.is_archived && !project.is_favorite),
    [projectList]
  );
  const archiveProjects = useMemo(
    () => projectList.filter((project) => project.is_archived),
    [projectList]
  );

  NAV_MAIN[0].projects = favoriteProjects;
  NAV_MAIN[1].projects = regularProjects;
  NAV_MAIN[2].projects = archiveProjects;

  return (
    <SidebarProvider className={className}>
      <Sidebar {...props}>
        <SidebarContent>
          <SidebarGroup className="p-0 mt-4 mb-6">
            <SidebarMenu>
              {NAV_MAIN.map((category, index) => (
                <>
                  <Collapsible
                    key={category.title}
                    defaultOpen={category.title === "Archive Project" ? false : true}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild className="pb-3">
                        <SidebarMenuButton className="font-bold text-base">
                          {category.icon}
                          <span className="truncate">{category.title}</span>
                          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {isLoading && <Skeleton className="h-7" />}
                          {category.projects?.length > 0 &&
                            category.projects.map((project) => (
                              <SidebarMenuSubItem key={project.id}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={project.id === params.projectId ? true : false}
                                  className="font-medium  text-xs text-[#7B849E]"
                                >
                                  <Link to={`/app/projects/${project.id}`}>
                                    <Hash />
                                    <span className="truncate">{project.name}</span>
                                    {project.id === params.projectId && (
                                      <Check strokeWidth={3.5} className="absolute right-2" />
                                    )}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          {category.projects?.length < 1 && !isLoading && (
                            <p className="text-xs font-bold italic h-7 flex items-center">
                              — {category.title} is empty
                            </p>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                  {index !== NAV_MAIN.length - 1 && <SidebarSeparator className="my-4" />}
                </>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
