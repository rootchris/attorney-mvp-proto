import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { mockClients, mockTasks, mockMatters } from "@/data/mockData";
import { useState } from "react";
import { 
  Calendar, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  Users,
  UserPlus,
  ClipboardList,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Target
} from "lucide-react";

export function StreamlinedAttorneyDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const myClients = mockClients.filter(client => client.assignedAttorney === 'Michael Chen');
  const myTasks = mockTasks.filter(task => task.assignedBy === 'Michael Chen');
  const myMatters = mockMatters.filter(matter => 
    myClients.some(client => client.id === matter.clientId)
  );

  // Enhanced client data with matter info
  const enrichedClients = myClients.map(client => {
    const matter = myMatters.find(m => m.clientId === client.id);
    return {
      ...client,
      matter: matter || null,
      revenue: matter?.revenue || 0,
      matterType: matter?.type || 'No Matter',
      workflowStage: matter?.workflowStage || null
    };
  });

  // Filter and sort clients
  const filteredClients = enrichedClients
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.matterType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || client.pipelineStage === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "revenue":
          return b.revenue - a.revenue;
        case "status":
          return a.pipelineStage.localeCompare(b.pipelineStage);
        case "matterType":
          return a.matterType.localeCompare(b.matterType);
        default:
          return 0;
      }
    });

  // Performance metrics
  const stats = {
    totalClients: myClients.length,
    signedClients: myClients.filter(c => c.pipelineStage === 'signed').length,
    totalRevenue: myMatters.reduce((sum, matter) => sum + (matter.revenue || 0), 0),
    conversionRate: Math.round((myClients.filter(c => c.pipelineStage === 'signed').length / myClients.length) * 100)
  };

  const pendingTasks = myTasks.filter(t => t.status !== 'completed');
  const overdueTasks = myTasks.filter(t => t.status === 'overdue');

  return (
    <div className="space-y-4">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-legal-heading">Client Management</h1>
          <p className="text-legal-body mt-1">Manage your client pipeline and workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Create Prospect
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Create Matter
          </Button>
          <Button variant="outline" size="sm">
            <ClipboardList className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Client List - 2/3 */}
        <div className="col-span-2 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients or matter types..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-background"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="complete">Complete</option>
                    <option value="signed">Signed</option>
                    <option value="lost">Lost</option>
                  </select>
                  
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-background"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="revenue">Sort by Revenue</option>
                    <option value="status">Sort by Status</option>
                    <option value="matterType">Sort by Matter Type</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Clients ({filteredClients.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredClients.map(client => (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.referralSource}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">{client.matterType}</p>
                        {client.workflowStage && (
                          <StatusBadge status={client.workflowStage} type="workflow" />
                        )}
                      </div>
                      
                      <div>
                        <StatusBadge status={client.pipelineStage} type="pipeline" />
                        {client.consultDate && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(client.consultDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">${client.revenue.toLocaleString()}</p>
                        {client.revenue > 0 && (
                          <p className="text-xs text-green-600">Active Revenue</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredClients.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No clients match your current filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1/3 */}
        <div className="space-y-4">
          {/* Performance Metrics - Top Half */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{stats.totalClients}</p>
                  <p className="text-xs text-muted-foreground">Total Clients</p>
                </div>
                
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold">{stats.signedClients}</p>
                  <p className="text-xs text-muted-foreground">Signed</p>
                </div>
                
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold">${(stats.totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
                
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks - Bottom Half */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  My Tasks
                </span>
                <Badge variant="secondary" className="text-xs">
                  {pendingTasks.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {overdueTasks.length > 0 && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Overdue ({overdueTasks.length})</span>
                  </div>
                  {overdueTasks.slice(0, 2).map(task => (
                    <div key={task.id} className="text-sm">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-red-600">{task.clientName}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {pendingTasks
                .filter(t => t.status !== 'overdue')
                .slice(0, 4)
                .map(task => (
                  <div key={task.id} className="p-2 border rounded hover:bg-muted/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.clientName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs px-1">
                            {task.assignedTo}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={task.status} type="task" />
                    </div>
                  </div>
                ))}
              
              {pendingTasks.length === 0 && (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">All tasks complete!</p>
                </div>
              )}
              
              {pendingTasks.length > 4 && (
                <Button variant="ghost" size="sm" className="w-full">
                  View All Tasks ({pendingTasks.length})
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}