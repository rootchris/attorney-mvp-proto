import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { UserRole } from "@/components/RoleSelector";

interface AppLayoutProps {
  children: React.ReactNode;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function AppLayout({ children, currentRole, onRoleChange }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentRole={currentRole} onRoleChange={onRoleChange} />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}