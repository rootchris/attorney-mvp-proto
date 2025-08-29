import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "@/components/StatusBadge";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { AttorneyPerformanceChart } from "@/components/charts/AttorneyPerformanceChart";
import { PipelineFunnelChart } from "@/components/charts/PipelineFunnelChart";
import { AdminFilters, AdminFilterState } from "@/components/admin/AdminFilters";
import { mockClients, mockTasks, mockMatters, mockAttorneys } from "@/data/mockData";
import { 
  BarChart3, 
  Users, 
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Download,
  Eye,
  Calendar,
  Target,
  Activity,
  Plus,
  Filter,
  Bell,
  Clock,
  FileText,
  Settings
} from "lucide-react";

export function CleanAdminDashboard() {
  const [filters, setFilters] = useState<AdminFilterState>({
    search: '',
    attorney: '',
    dateRange: '',
    status: '',
    priority: ''
  });

  // Calculate key metrics
  const totalRevenue = mockMatters.reduce((sum, matter) => sum + (matter.revenue || 0), 0);
  const totalClients = mockClients.length;
  const signedClients = mockClients.filter(c => c.pipelineStage === 'signed').length;
  const conversionRate = Math.round((signedClients / totalClients) * 100);
  const overdueTasks = mockTasks.filter(t => t.status === 'overdue').length;
  const unsignedPlans = mockClients.filter(c => c.pipelineStage === 'complete').length;
  const avgDealSize = totalRevenue / signedClients || 0;
  const pipelineValue = unsignedPlans * avgDealSize;

  const criticalIssues = overdueTasks + unsignedPlans;
  const recentActivity = mockClients.slice(0, 5);

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-legal-heading">Admin Dashboard</h1>
                <p className="text-legal-body mt-1">Strategic command center for firm operations</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Quick Action
                </Button>
              </div>
            </div>

            {/* Key Metrics - Hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-legal-caption">Total Revenue</p>
                      <p className="text-2xl font-semibold">${totalRevenue.toLocaleString()}</p>
                      <p className="text-xs text-primary mt-1">+12% vs last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
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

              <Card className={`border-l-4 ${criticalIssues > 0 ? 'border-l-destructive' : 'border-l-success'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${criticalIssues > 0 ? 'bg-destructive/10' : 'bg-success/10'}`}>
                      <AlertTriangle className={`w-5 h-5 ${criticalIssues > 0 ? 'text-destructive' : 'text-success'}`} />
                    </div>
                    <div>
                      <p className="text-legal-caption">Critical Issues</p>
                      <p className="text-2xl font-semibold">{criticalIssues}</p>
                      <p className={`text-xs mt-1 ${criticalIssues > 0 ? 'text-destructive' : 'text-success'}`}>
                        {criticalIssues > 0 ? 'Needs attention' : 'All clear'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
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

            {/* Critical Alerts - Integrated */}
            {criticalIssues > 0 && (
              <Card className="border-l-4 border-l-destructive bg-destructive/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <Bell className="w-5 h-5" />
                      Critical Alerts
                    </CardTitle>
                    <Badge variant="destructive">{criticalIssues} Issues</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {overdueTasks > 0 && (
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-destructive" />
                          <div>
                            <p className="font-medium text-sm">Overdue Tasks</p>
                            <p className="text-xs text-muted-foreground">{overdueTasks} tasks past due</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    )}
                    {unsignedPlans > 0 && (
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-warning" />
                          <div>
                            <p className="font-medium text-sm">Unsigned Plans</p>
                            <p className="text-xs text-muted-foreground">{unsignedPlans} awaiting signature</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Review</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    New Matter
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Reports
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Charts */}
            <div className="space-y-6">
              <h2 className="text-legal-subheading">Performance Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart />
                <AttorneyPerformanceChart />
              </div>
              <PipelineFunnelChart />
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-medium text-sm">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.assignedAttorney}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={client.pipelineStage} type="pipeline" />
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar - Independently Scrollable */}
      <div className="w-80 border-l border-border bg-muted/30">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {/* Quick Filters */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4" />
                  Quick Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AdminFilters onFiltersChange={setFilters} />
              </CardContent>
            </Card>

            {/* Firm Health */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Firm Health Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Active Matters</span>
                  <span className="text-sm font-medium">{mockMatters.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Team Utilization</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Client Satisfaction</span>
                  <span className="text-sm font-medium">4.8/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Avg Response Time</span>
                  <span className="text-sm font-medium">2.3 hrs</span>
                </div>
              </CardContent>
            </Card>

            {/* Attorney Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Attorney Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAttorneys.slice(0, 3).map((attorney) => (
                    <div key={attorney.id} className="p-2 border border-border rounded">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium">{attorney.name}</p>
                        <Badge variant="outline" className="text-xs">{attorney.conversionRate}%</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <span>${attorney.revenue.toLocaleString()}</span>
                        <span>{attorney.activeMatters} matters</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    View All Attorneys
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pipeline Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Pipeline Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Scheduled</span>
                    <Badge variant="secondary" className="text-xs">
                      {mockClients.filter(c => c.pipelineStage === 'scheduled').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Complete</span>
                    <Badge variant="secondary" className="text-xs">
                      {mockClients.filter(c => c.pipelineStage === 'complete').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Signed</span>
                    <Badge variant="default" className="text-xs">
                      {mockClients.filter(c => c.pipelineStage === 'signed').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Lost</span>
                    <Badge variant="outline" className="text-xs">
                      {mockClients.filter(c => c.pipelineStage === 'lost').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {overdueTasks > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded text-xs">
                      <AlertTriangle className="w-3 h-3 text-destructive" />
                      <span>{overdueTasks} overdue tasks</span>
                    </div>
                  )}
                  {unsignedPlans > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-warning/10 rounded text-xs">
                      <Clock className="w-3 h-3 text-warning" />
                      <span>{unsignedPlans} unsigned plans</span>
                    </div>
                  )}
                  {criticalIssues === 0 && (
                    <div className="flex items-center gap-2 p-2 bg-success/10 rounded text-xs">
                      <span className="text-success">All systems operational</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Settings className="w-4 h-4" />
                  Quick Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    <Users className="w-3 h-3 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    <BarChart3 className="w-3 h-3 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    <Settings className="w-3 h-3 mr-2" />
                    System Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}