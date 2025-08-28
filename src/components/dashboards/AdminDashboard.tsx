import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { mockClients, mockTasks, mockMatters, mockAttorneys } from "@/data/mockData";
import { 
  BarChart3, 
  Users, 
  DollarSign,
  AlertTriangle,
  TrendingUp,
  FileText,
  Download,
  Eye,
  Calendar,
  Target
} from "lucide-react";

export function AdminDashboard() {
  const totalRevenue = mockMatters.reduce((sum, matter) => sum + (matter.revenue || 0), 0);
  const totalClients = mockClients.length;
  const signedClients = mockClients.filter(c => c.pipelineStage === 'signed').length;
  const conversionRate = Math.round((signedClients / totalClients) * 100);
  const overdueTasks = mockTasks.filter(t => t.status === 'overdue').length;
  const unsignedPlans = mockClients.filter(c => c.pipelineStage === 'complete').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-legal-heading">Global Admin Dashboard</h1>
          <p className="text-legal-body mt-1">Firm-wide oversight and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-primary hover:bg-primary-hover">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-legal-caption">Total Revenue</p>
                <p className="text-2xl font-semibold">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-legal-caption">Conversion Rate</p>
                <p className="text-2xl font-semibold">{conversionRate}%</p>
                <p className="text-xs text-blue-600 mt-1">{signedClients}/{totalClients} signed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-legal-caption">Overdue Tasks</p>
                <p className="text-2xl font-semibold">{overdueTasks}</p>
                <p className="text-xs text-red-600 mt-1">Needs attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-legal-caption">Unsigned Plans</p>
                <p className="text-2xl font-semibold">{unsignedPlans}</p>
                <p className="text-xs text-orange-600 mt-1">Ready to sign</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attorney Performance */}
        <Card className="legal-card">
          <CardHeader className="legal-card-header">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Attorney Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="legal-card-content">
            <div className="space-y-4">
              {mockAttorneys.map((attorney) => (
                <div key={attorney.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{attorney.name}</p>
                      <p className="text-legal-body">{attorney.email}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-legal-caption">Consults</p>
                      <p className="font-medium">{attorney.consultCount}</p>
                    </div>
                    <div>
                      <p className="text-legal-caption">Conversion</p>
                      <p className="font-medium">{attorney.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-legal-caption">Revenue</p>
                      <p className="font-medium">${attorney.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-legal-caption">Active Matters</p>
                      <p className="font-medium">{attorney.activeMatters}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Firm Pipeline Overview */}
        <Card className="legal-card">
          <CardHeader className="legal-card-header">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Firm Pipeline Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="legal-card-content">
            <div className="space-y-4">
              {/* Pipeline Stage Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-semibold text-blue-600">
                    {mockClients.filter(c => c.pipelineStage === 'scheduled').length}
                  </p>
                  <p className="text-legal-caption text-blue-600">Scheduled</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-semibold text-green-600">
                    {mockClients.filter(c => c.pipelineStage === 'complete').length}
                  </p>
                  <p className="text-legal-caption text-green-600">Complete</p>
                </div>
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-semibold text-emerald-600">
                    {mockClients.filter(c => c.pipelineStage === 'signed').length}
                  </p>
                  <p className="text-legal-caption text-emerald-600">Signed</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-semibold text-gray-600">
                    {mockClients.filter(c => c.pipelineStage === 'lost').length}
                  </p>
                  <p className="text-legal-caption text-gray-600">Lost</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <p className="text-legal-subheading">Recent Activity</p>
                {mockClients.slice(0, 3).map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-2 border border-border rounded">
                    <div>
                      <p className="font-medium text-sm">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.assignedAttorney}</p>
                    </div>
                    <StatusBadge status={client.pipelineStage} type="pipeline" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 gap-6">
        {/* All Matters Overview */}
        <Card className="legal-card">
          <CardHeader className="legal-card-header">
            <CardTitle>All Firm Matters</CardTitle>
          </CardHeader>
          <CardContent className="legal-card-content">
            <div className="overflow-x-auto">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Matter</th>
                    <th>Client</th>
                    <th>Attorney</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Revenue</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMatters.map((matter) => {
                    const client = mockClients.find(c => c.id === matter.clientId);
                    return (
                      <tr key={matter.id}>
                        <td className="font-medium">{matter.title}</td>
                        <td>{client?.name}</td>
                        <td>{client?.assignedAttorney}</td>
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
                        <td>
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Task Overview */}
        <Card className="legal-card">
          <CardHeader className="legal-card-header">
            <CardTitle className="flex items-center justify-between">
              <span>All Firm Tasks</span>
              <Badge variant="destructive" className="text-xs">
                {overdueTasks} Overdue
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="legal-card-content">
            <div className="overflow-x-auto">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Client</th>
                    <th>Assigned To</th>
                    <th>Assigned By</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTasks
                    .sort((a, b) => {
                      if (a.status === 'overdue' && b.status !== 'overdue') return -1;
                      if (b.status === 'overdue' && a.status !== 'overdue') return 1;
                      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                    })
                    .map((task) => (
                      <tr key={task.id}>
                        <td className="font-medium">{task.title}</td>
                        <td>{task.clientName}</td>
                        <td>{task.assignedTo}</td>
                        <td>{task.assignedBy}</td>
                        <td>
                          <Badge 
                            variant={task.priority === 'high' ? 'destructive' : 'outline'}
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                        </td>
                        <td>
                          <StatusBadge status={task.status} type="task" />
                        </td>
                        <td>
                          <span className={task.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}