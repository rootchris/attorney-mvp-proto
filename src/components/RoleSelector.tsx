import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Users, Shield } from "lucide-react";

export type UserRole = 'attorney' | 'clerk' | 'admin';

interface RoleSelectorProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleConfig = {
  attorney: {
    label: 'Attorney',
    icon: UserCheck,
    description: 'Manage prospects, client matters, and assign tasks'
  },
  clerk: {
    label: 'Paralegal/Clerk',
    icon: Users,
    description: 'Complete assigned tasks and manage documents'
  },
  admin: {
    label: 'Global Admin',
    icon: Shield,
    description: 'Firm-wide oversight and performance metrics'
  }
};

export function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  return (
    <div className="flex items-center gap-3 p-1 bg-secondary rounded-lg">
      {Object.entries(roleConfig).map(([role, config]) => {
        const Icon = config.icon;
        const isActive = currentRole === role;
        
        return (
          <Button
            key={role}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => onRoleChange(role as UserRole)}
            className={`flex items-center gap-2 transition-all ${
              isActive 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "hover:bg-secondary-hover"
            }`}
          >
            <Icon className="h-4 w-4" />
            {config.label}
            {isActive && (
              <Badge variant="secondary" className="bg-primary-light text-primary text-xs">
                Active
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
}