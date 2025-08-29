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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Scale className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-xl font-semibold">The Folder</h1>
                  <p className="text-xs text-muted-foreground">Estate Planning Practice Management</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>Prototype Demo</span>
              </div>
              <RoleSelector currentRole={currentRole} onRoleChange={onRoleChange} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Role Context Banner */}
        <Card className="mb-6 bg-primary-light border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-primary">
                  Viewing as: {currentRole === 'attorney' ? 'Attorney' : currentRole === 'clerk' ? 'Paralegal/Clerk' : 'Global Admin'}
                </p>
                <p className="text-xs text-primary/80">
                  {currentRole === 'attorney' && 'Manage prospects, client matters, and assign tasks'}
                  {currentRole === 'clerk' && 'Complete assigned tasks and manage documents'}
                  {currentRole === 'admin' && 'Firm-wide oversight and performance metrics'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Index;
