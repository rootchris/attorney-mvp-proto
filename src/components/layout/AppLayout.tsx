import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { UserRole } from "@/components/RoleSelector";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function AppLayout({ children, currentRole, onRoleChange }: AppLayoutProps) {
  const location = useLocation();
  const isClientIntake = location.pathname === '/client-intake';

  if (isClientIntake) {
    return (
      <div className="min-h-screen w-full bg-background">
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentRole={currentRole} onRoleChange={onRoleChange} />
        <main className="flex-1 min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}