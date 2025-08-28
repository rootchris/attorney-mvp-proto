import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminFilters, AdminFilterState } from "@/components/admin/AdminFilters";
import { AlertsPanel } from "@/components/admin/AlertsPanel";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { AttorneyPerformanceChart } from "@/components/charts/AttorneyPerformanceChart";
import { PipelineFunnelChart } from "@/components/charts/PipelineFunnelChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Target,
  Activity,
  PieChart,
  Filter
} from "lucide-react";

export function EnhancedAdminDashboard() {
  const [filters, setFilters] = useState<AdminFilterState>({
    search: '',
    attorney: '',
    dateRange: '',
    status: '',
    priority: ''
  });

  // Calculate metrics
  const totalRevenue = mockMatters.reduce((sum, matter) => sum + (matter.revenue || 0), 0);
  const totalClients = mockClients.length;
  const signedClients = mockClients.filter(c => c.pipelineStage === 'signed').length;
  const conversionRate = Math.round((signedClients / totalClients) * 100);
  const overdueTasks = mockTasks.filter(t => t.status === 'overdue').length;
  const unsignedPlans = mockClients.filter(c => c.pipelineStage === 'complete').length;
  const avgDealSize = totalRevenue / signedClients || 0;
  const pipelineValue = unsignedPlans * avgDealSize;

  // Filter data based on current filters
  const filteredMatters = mockMatters.filter(matter => {
    const client = mockClients.find(c => c.id === matter.clientId);
    if (filters.search && !matter.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !client?.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.attorney && client?.assignedAttorney !== filters.attorney) return false;
    if (filters.status && matter.workflowStage !== filters.status) return false;
    return true;
  });

  const filteredTasks = mockTasks.filter(task => {
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !task.clientName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.status && task.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-legal-heading">Enhanced Admin Dashboard</h1>
          <p className="text-legal-body mt-1">Comprehensive firm oversight and performance analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-primary hover:bg-primary-hover">
            <BarChart3 className="w-4 h-4 mr-2" />
            Advanced Analytics
          </Button>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-legal-caption">Total Revenue</p>
                <p className="text-2xl font-semibold">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-primary mt-1">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-legal-caption">Conversion Rate</p>
                <p className="text-2xl font-semibold">{conversionRate}%</p>
                <p className="text-xs text-primary mt-1">{signedClients}/{totalClients} signed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-legal-caption">Critical Issues</p>
                <p className="text-2xl font-semibold">{overdueTasks + unsignedPlans}</p>
                <p className="text-xs text-destructive mt-1">{overdueTasks} overdue, {unsignedPlans} unsigned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-legal-caption">Pipeline Value</p>
                <p className="text-2xl font-semibold">${Math.round(pipelineValue).toLocaleString()}</p>
                <p className="text-xs text-primary mt-1">Potential revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      <AlertsPanel />

      {/* Filters */}
      <AdminFilters onFiltersChange={setFilters} />

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full lg:w-fit grid-cols-4 lg:grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="matters" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Matters
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Tasks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-semibold text-primary">
                        {mockClients.filter(c => c.pipelineStage === 'scheduled').length}
                      </p>
                      <p className="text-legal-caption text-primary">Scheduled</p>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-semibold text-primary">
                        {mockClients.filter(c => c.pipelineStage === 'complete').length}
                      </p>
                      <p className="text-legal-caption text-primary">Complete</p>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-semibold text-primary">
                        {mockClients.filter(c => c.pipelineStage === 'signed').length}
                      </p>
                      <p className="text-legal-caption text-primary">Signed</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-semibold text-muted-foreground">
                        {mockClients.filter(c => c.pipelineStage === 'lost').length}
                      </p>
                      <p className="text-legal-caption text-muted-foreground">Lost</p>
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <AttorneyPerformanceChart />
          </div>
          <PipelineFunnelChart />
        </TabsContent>

        <TabsContent value="matters" className="space-y-6">
          <Card className="legal-card">
            <CardHeader className="legal-card-header">
              <div className="flex items-center justify-between">
                <CardTitle>All Firm Matters</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {filteredMatters.length} of {mockMatters.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="legal-card-content">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matter</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Attorney</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMatters.map((matter) => {
                      const client = mockClients.find(c => c.id === matter.clientId);
                      return (
                        <TableRow key={matter.id}>
                          <TableCell className="font-medium">{matter.title}</TableCell>
                          <TableCell>{client?.name}</TableCell>
                          <TableCell>{client?.assignedAttorney}</TableCell>
                          <TableCell>{matter.type}</TableCell>
                          <TableCell>
                            <StatusBadge status={matter.workflowStage} type="workflow" />
                          </TableCell>
                          <TableCell>
                            {matter.dueDate ? new Date(matter.dueDate).toLocaleDateString() : 'TBD'}
                          </TableCell>
                          <TableCell className="font-medium">
                            ${matter.revenue?.toLocaleString() || 'TBD'}
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card className="legal-card">
            <CardHeader className="legal-card-header">
              <div className="flex items-center justify-between">
                <CardTitle>All Firm Tasks</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">
                    {filteredTasks.filter(t => t.status === 'overdue').length} Overdue
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {filteredTasks.length} of {mockTasks.length}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="legal-card-content">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Assigned By</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks
                      .sort((a, b) => {
                        if (a.status === 'overdue' && b.status !== 'overdue') return -1;
                        if (b.status === 'overdue' && a.status !== 'overdue') return 1;
                        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                      })
                      .map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.title}</TableCell>
                          <TableCell>{task.clientName}</TableCell>
                          <TableCell>{task.assignedTo}</TableCell>
                          <TableCell>{task.assignedBy}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={task.priority === 'high' ? 'destructive' : 'outline'}
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={task.status} type="task" />
                          </TableCell>
                          <TableCell>
                            <span className={task.status === 'overdue' ? 'text-destructive font-medium' : ''}>
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}