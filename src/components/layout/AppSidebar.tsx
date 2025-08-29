import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  CheckSquare,
  BarChart3,
  Settings,
  UserCheck,
  Shield,
  Briefcase,
  Clock,
  TrendingUp,
  Database,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  ChevronDown,
  Building2
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { UserRole, RoleSelector } from "@/components/RoleSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AppSidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const navigationConfig = {
  attorney: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Matters",
      icon: Briefcase,
      items: [
        { title: "Active Matters", url: "/matters" },
        { title: "Draft Pipeline", url: "/matters/draft" },
        { title: "Ready to Sign", url: "/matters/sign" },
        { title: "Completed", url: "/matters/completed" }
      ]
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Documents",
      url: "/documents",
      icon: FileText,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    }
  ],
  clerk: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "My Tasks",
      url: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Documents",
      icon: FileText,
      items: [
        { title: "Client Documents", url: "/documents/client" },
        { title: "Templates", url: "/documents/templates" },
        { title: "WealthCounsel", url: "/documents/wealthcounsel" }
      ]
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users,
    }
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      icon: BarChart3,
      items: [
        { title: "Performance", url: "/analytics/performance" },
        { title: "Revenue", url: "/analytics/revenue" },
        { title: "Pipeline", url: "/analytics/pipeline" },
        { title: "Reports", url: "/analytics/reports" }
      ]
    },
    {
      title: "Team Management",
      icon: Users,
      items: [
        { title: "Attorneys", url: "/team/attorneys" },
        { title: "Support Staff", url: "/team/staff" },
        { title: "Permissions", url: "/team/permissions" }
      ]
    },
    {
      title: "Matters Overview",
      url: "/matters/overview",
      icon: Briefcase,
    },
    {
      title: "Client Database",
      url: "/clients/database",
      icon: Database,
    },
    {
      title: "System Settings",
      url: "/settings",
      icon: Settings,
    }
  ]
};

export function AppSidebar({ currentRole, onRoleChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  
  const navigation = navigationConfig[currentRole];
  const isCollapsed = state === "collapsed";

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  const isGroupActive = (items?: { url: string }[]) => {
    return items?.some(item => isActive(item.url)) || false;
  };

  return (
    <Sidebar variant="sidebar" className="border-r">
      {/* Collapse/Expand Tab - Always visible */}
      <div className="absolute top-4 -right-3 z-50">
        <SidebarTrigger className="w-6 h-8 bg-background border border-border rounded-r-md shadow-sm hover:bg-accent" />
      </div>
      
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center justify-center w-full">
          <img 
            src="/lovable-uploads/689355fb-d2ad-4bbc-ab39-21cab7a8edb2.png" 
            alt="TheFolder"
            className={`object-contain transition-all duration-200 ${
              isCollapsed ? 'w-4 h-4' : 'w-3/4 h-6'
            }`}
          />
        </div>
        
        {!isCollapsed && (
          <div className="mt-4">
            <RoleSelector currentRole={currentRole} onRoleChange={onRoleChange} />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const hasSubItems = item.items && item.items.length > 0;
                const isExpanded = expandedGroups.includes(item.title);
                const groupActive = hasSubItems ? isGroupActive(item.items) : isActive(item.url || "#");

                if (hasSubItems) {
                  return (
                    <Collapsible
                      key={item.title}
                      open={isExpanded || groupActive}
                      onOpenChange={() => toggleGroup(item.title)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={groupActive 
                              ? "relative bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-r-2 border-primary shadow-md shadow-primary/15 font-medium" 
                              : "hover:bg-accent/50 transition-all duration-200"
                            }
                            tooltip={item.title}
                          >
                            <item.icon className="w-4 h-4" />
                            {!isCollapsed && <span>{item.title}</span>}
                            {!isCollapsed && (
                              <ChevronRight 
                                className={`ml-auto w-4 h-4 transition-transform ${
                                  isExpanded || groupActive ? "rotate-90" : ""
                                }`} 
                              />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {!isCollapsed && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.url}>
                                   <SidebarMenuSubButton asChild>
                                     <NavLink 
                                       to={subItem.url}
                                       className={({ isActive }) => 
                                         isActive 
                                           ? "relative bg-gradient-to-r from-primary/25 to-primary/15 text-primary border-r-2 border-primary shadow-md shadow-primary/25 font-medium pl-6" 
                                           : "hover:bg-accent/30 transition-all duration-200 pl-6"
                                       }
                                     >
                                      {subItem.title}
                                    </NavLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink 
                        to={item.url || "#"}
                        className={({ isActive }) => 
                          isActive 
                            ? "relative bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-r-2 border-primary shadow-lg shadow-primary/20 font-medium" 
                            : "hover:bg-accent/50 transition-all duration-200"
                        }
                      >
                        <item.icon className={`w-4 h-4 transition-colors duration-200 ${
                          location.pathname === (item.url || "#") ? "text-primary" : ""
                        }`} />
                        {!isCollapsed && (
                          <span className={`transition-colors duration-200 ${
                            location.pathname === (item.url || "#") ? "text-primary font-semibold" : ""
                          }`}>
                            {item.title}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Search">
                  <Search className="w-4 h-4" />
                  {!isCollapsed && <span>Search</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Notifications">
                  <Bell className="w-4 h-4" />
                  {!isCollapsed && <span>Notifications</span>}
                  {!isCollapsed && (
                    <Badge variant="destructive" className="ml-auto text-xs px-1.5 py-0.5">
                      3
                    </Badge>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Senior Attorney</p>
                </div>
              )}
              <SidebarMenuAction asChild>
                <Button variant="ghost" size="sm" title="Sign out">
                  <LogOut className="w-4 h-4" />
                </Button>
              </SidebarMenuAction>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}