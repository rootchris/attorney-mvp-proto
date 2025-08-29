import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const currentConfig = roleConfig[currentRole];
  const CurrentIcon = currentConfig.icon;

  return (
    <Select value={currentRole} onValueChange={onRoleChange}>
      <SelectTrigger className="w-full min-w-[200px]">
        <SelectValue>
          <div className="flex items-center gap-2">
            <CurrentIcon className="h-4 w-4" />
            <span>{currentConfig.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(roleConfig).map(([role, config]) => {
          const Icon = config.icon;
          return (
            <SelectItem key={role} value={role}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span>{config.label}</span>
                  <span className="text-xs text-muted-foreground">{config.description}</span>
                </div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}