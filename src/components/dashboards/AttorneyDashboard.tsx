import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { mockClients, mockTasks, mockMatters } from "@/data/mockData";
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  FileText,
  Clock,
  DollarSign,
  TrendingUp
} from "lucide-react";

export function AttorneyDashboard() {
  const myClients = mockClients.filter(client => client.assignedAttorney === 'Michael Chen');
  const myTasks = mockTasks.filter(task => task.assignedBy === 'Michael Chen');
  const myMatters = mockMatters.filter(matter => 
    myClients.some(client => client.id === matter.clientId)
  );

  const stats = {
    totalClients: myClients.length,
    signedClients: myClients.filter(c => c.pipelineStage === 'signed').length,
    pendingTasks: myTasks.filter(t => t.status !== 'completed').length,
    totalRevenue: myMatters.reduce((sum, matter) => sum + (matter.revenue || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-legal-heading">Attorney Dashboard</h1>
          <p className="text-legal-body mt-1">Manage your client pipeline and matters</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Consult
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-light rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-legal-caption">Total Clients</p>
                <p className="text-2xl font-semibold">{stats.totalClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-legal-caption">Signed Clients</p>
                <p className="text-2xl font-semibold">{stats.signedClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-legal-caption">Pending Tasks</p>
                <p className="text-2xl font-semibold">{stats.pendingTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-legal-caption">Total Revenue</p>
                <p className="text-2xl font-semibold">${stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Pipeline */}
        <Card className="legal-card">
          <CardHeader className="legal-card-header">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Client Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="legal-card-content">
            <div className="space-y-4">
              {myClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{client.name}</p>
                    <p className="text-legal-body">{client.referralSource}</p>
                    {client.consultDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Consult: {new Date(client.consultDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <StatusBadge status={client.pipelineStage} type="pipeline" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Tasks */}
        <Card className="legal-card">
          <CardHeader className="legal-card-header">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              My Tasks & Delegated Work
            </CardTitle>
          </CardHeader>
          <CardContent className="legal-card-content">
            <div className="space-y-4">
              {myTasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-legal-body">{task.clientName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        Assigned to: {task.assignedTo}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={task.status} type="task" />
                    {task.priority === 'high' && (
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Matters Overview */}
      <Card className="legal-card">
        <CardHeader className="legal-card-header">
          <CardTitle>Active Matters</CardTitle>
        </CardHeader>
        <CardContent className="legal-card-content">
          <div className="overflow-x-auto">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Matter</th>
                  <th>Client</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {myMatters.map((matter) => {
                  const client = myClients.find(c => c.id === matter.clientId);
                  return (
                    <tr key={matter.id}>
                      <td className="font-medium">{matter.title}</td>
                      <td>{client?.name}</td>
                      <td>{matter.type}</td>
                      <td>
                        <StatusBadge status={matter.workflowStage} type="workflow" />
                      </td>
                      <td>
                        {matter.dueDate ? new Date(matter.dueDate).toLocaleDateString() : 'TBD'}
                      </td>
                      <td className="font-medium">
                        ${matter.revenue?.toLocaleString() || 'TBD'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}