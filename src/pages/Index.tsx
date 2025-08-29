import { useState } from 'react';
import { RoleSelector, UserRole } from '@/components/RoleSelector';
import { StreamlinedAttorneyDashboard } from '@/components/dashboards/StreamlinedAttorneyDashboard';
import { ClerkDashboard } from '@/components/dashboards/ClerkDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { EnhancedAdminDashboard } from '@/components/dashboards/EnhancedAdminDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Building2 } from 'lucide-react';

interface IndexProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Index = ({ currentRole, onRoleChange }: IndexProps) => {

  const renderDashboard = () => {
    switch (currentRole) {
      case 'attorney':
        return <StreamlinedAttorneyDashboard />;
      case 'clerk':
        return <ClerkDashboard />;
      case 'admin':
        return <EnhancedAdminDashboard />;
      default:
        return <StreamlinedAttorneyDashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Dashboard Content */}
      <div className="flex-1 overflow-hidden">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Index;
