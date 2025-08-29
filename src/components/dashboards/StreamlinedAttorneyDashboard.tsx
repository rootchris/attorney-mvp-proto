import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockClients, mockTasks, mockMatters } from "@/data/mockData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  Users,
  UserPlus,
  ClipboardList,
  Search,
  DollarSign,
  TrendingUp,
  Target,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  BarChart3
} from "lucide-react";

export function StreamlinedAttorneyDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewClientPage, setReviewClientPage] = useState(1);
  
  const itemsPerPage = 6;
  const reviewClientsPerPage = 4;

  const myClients = mockClients.filter(client => client.assignedAttorney === 'Michael Chen');
  const myTasks = mockTasks.filter(task => task.assignedBy === 'Michael Chen');
  const myMatters = mockMatters.filter(matter => 
    myClients.some(client => client.id === matter.clientId)
  );

  // Active matters (ongoing work)
  const activeMatters = myMatters.filter(matter => 
    !['signed', 'funding', 'reengage'].includes(matter.workflowStage)
  );

  // Enhanced matter data with client info
  const enrichedMatters = activeMatters.map(matter => {
    const client = myClients.find(c => c.id === matter.clientId);
    return {
      ...matter,
      clientName: client?.name || 'Unknown Client',
    };
  });

  // Clients ready for review
  const clientsReadyForReview = myClients.filter(client => 
    client.pipelineStage === 'ready_for_review'
  );

  // Filter and sort matters
  const filteredMatters = enrichedMatters
    .filter(matter => {
      const matchesSearch = matter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          matter.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          matter.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = stageFilter === "all" || matter.workflowStage === stageFilter;
      return matchesSearch && matchesStage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "value":
          return (b.revenue || 0) - (a.revenue || 0);
        default:
          return 0;
      }
    });

  // Performance metrics
  const stats = {
    activeMatters: activeMatters.length,
    clientsForReview: clientsReadyForReview.length,
    totalRevenue: myMatters.reduce((sum, matter) => sum + (matter.revenue || 0), 0),
    avgMatterValue: myMatters.length > 0 ? myMatters.reduce((sum, matter) => sum + (matter.revenue || 0), 0) / myMatters.length : 0,
  };

  const pendingTasks = myTasks.filter(t => t.status !== 'completed');
  const overdueTasks = myTasks.filter(t => t.status === 'overdue');

  // Pagination calculations
  const totalPages = Math.ceil(filteredMatters.length / itemsPerPage);
  const totalReviewPages = Math.ceil(clientsReadyForReview.length / reviewClientsPerPage);
  
  const paginatedMatters = filteredMatters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginatedReviewClients = clientsReadyForReview.slice(
    (reviewClientPage - 1) * reviewClientsPerPage,
    reviewClientPage * reviewClientsPerPage
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header with Quick Actions */}
      <div className="flex-shrink-0 border-b bg-card px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Happy Tuesday, Crosby!</h1>
            <p className="text-sm text-muted-foreground">Manage active matters and client engagement</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Create </span>Prospect
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <FileText className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Create </span>Matter
            </Button>
            <Button size="sm" className="w-full sm:w-auto">
              <ClipboardList className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Create </span>Task
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden px-4 sm:px-6 py-4 gap-6">
        {/* Main Content - Matters and Clients */}
        <div className="flex-1 lg:flex-[2] overflow-y-auto space-y-6">
          
          {/* Active Matters Section */}
          <div className="flex-shrink-0">
            {/* Search and Filter Bar */}
            <Card className="flex-shrink-0">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search matters..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex flex-col xs:flex-row gap-2">
                    <Select value={stageFilter} onValueChange={setStageFilter}>
                      <SelectTrigger className="w-full xs:w-32">
                        <SelectValue placeholder="All Stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        <SelectItem value="drafting">Drafting</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="signed">Signed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full xs:w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dueDate">Due Date</SelectItem>
                        <SelectItem value="created">Created</SelectItem>
                        <SelectItem value="value">Value</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Matters List */}
            <Card className="flex-shrink-0 max-h-[32rem] flex flex-col overflow-hidden">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Active Matters ({filteredMatters.length})</span>
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0 p-0 overflow-hidden max-h-[28rem]">
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="space-y-2 p-3 sm:p-4 pr-2">
                    {paginatedMatters.map(matter => {
                      const client = myClients.find(c => c.id === matter.clientId);
                      return (
                        <div 
                          key={matter.id}
                          className="p-2 sm:p-3 border rounded-lg hover:shadow-sm transition-shadow bg-card cursor-pointer"
                          onClick={() => window.open(`/matter/${matter.id}`, '_blank')}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 mb-1">
                                <h3 className="font-semibold text-xs sm:text-sm truncate">{matter.title}</h3>
                                <div className="flex flex-wrap gap-1">
                                  <StatusBadge status={matter.workflowStage} type="workflow" />
                                  <Badge variant="outline" className="text-xs whitespace-nowrap">
                                    {matter.type}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1 truncate">
                                Client: {client?.name}
                              </p>
                              <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Due: {matter.dueDate ? new Date(matter.dueDate).toLocaleDateString() : 'No due date'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Created: {new Date(matter.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end text-right">
                              <span className="font-bold text-xs sm:text-sm">${matter.revenue?.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground">Value</span>
                              <div className="flex gap-1 mt-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-1 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(`/client/${client?.id}`, '_blank');
                                  }}
                                >
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="h-6 px-1 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(`/matter/${matter.id}`, '_blank');
                                  }}
                                >
                                  <FileText className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {filteredMatters.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No active matters match your current filters</p>
                      </div>
                    )}
                  </div>
                </div>
                  
                {/* Pagination */}
                <div className="flex-shrink-0 border-t p-3 sm:p-4">
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
                    <div className="text-xs sm:text-sm text-muted-foreground text-center xs:text-left">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredMatters.length)} of {filteredMatters.length} matters
                    </div>
                    
                    <div className="flex items-center gap-1 justify-center xs:justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline ml-1">Previous</span>
                      </Button>
                      
                      <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-muted rounded">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3"
                      >
                        <span className="hidden sm:inline mr-1">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clients To Engage Section */}
          <Card className="flex-shrink-0">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Clients To Engage (10)</span>
                <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myClients.slice(0, 10).map(client => (
                  <div 
                    key={client.id}
                    className="p-3 border rounded-lg hover:shadow-sm transition-shadow bg-card"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{client.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{client.email}</p>
                        <p className="text-xs text-muted-foreground">{client.phone}</p>
                        
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>Last Review: {client.createdAt ? new Date(new Date(client.createdAt).getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString() : "Never"}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>Birthday: {client.createdAt ? new Date(new Date(client.createdAt).getTime() - Math.random() * 365 * 5 * 24 * 60 * 60 * 1000).toLocaleDateString() : "Not set"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => window.open(`/client/${client.id}`, "_blank")}
                      >
                        <Eye className="w-3 h-3 sm:mr-1" />
                        <span className="hidden sm:inline">Profile</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Performance & Tasks */}
        <div className="flex-1 lg:max-w-80 flex flex-col gap-4 sm:gap-6 min-h-0 overflow-hidden">
          {/* Performance Metrics - Fixed Height */}
          <div className="flex-shrink-0">
            <Card>
              <CardHeader className="flex-shrink-0 pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="hidden sm:inline">Performance</span>
                    <span className="sm:hidden">Stats</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground hidden sm:inline">This Month</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-600">12</div>
                    <div className="text-xs text-muted-foreground">Active Matters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-orange-600">9</div>
                    <div className="text-xs text-muted-foreground">For Review</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-green-600">$119K</div>
                    <div className="text-xs text-muted-foreground">Total Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-purple-600">$10K</div>
                    <div className="text-xs text-muted-foreground">Avg Matter</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clients Ready for Review - Independent Scroll */}
          <Card className="flex-1 flex flex-col min-h-0 overflow-hidden max-h-80">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="text-sm sm:text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="hidden sm:inline">Ready for Review</span>
                  <span className="sm:hidden">Review</span>
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground hidden sm:inline">Priority</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-3 p-4 sm:p-6 pr-2 sm:pr-4">
                  {paginatedReviewClients.map(client => (
                    <div 
                      key={client.id} 
                      className="p-3 border rounded-lg hover:bg-muted/30 cursor-pointer"
                      onClick={() => navigate(`/client/${client.id}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{client.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{client.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusBadge status={client.pipelineStage} type="pipeline" />
                            <span className="text-xs text-muted-foreground">
                              Due: {client.signingDate ? new Date(client.signingDate).toLocaleDateString() : 'TBD'}
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/client/${client.id}`);
                          }}
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {clientsReadyForReview.length === 0 && (
                    <div className="text-center py-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No clients pending review</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks - Independent Scroll */}
          <Card className="flex-1 flex flex-col min-h-0 overflow-hidden max-h-80">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="text-sm sm:text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  My Tasks
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {pendingTasks.length}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                    View All
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-3 p-4 sm:p-6 pr-2 sm:pr-4">
                  {overdueTasks.length > 0 && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-700">Overdue (1)</span>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Client intake review</p>
                        <p className="text-xs text-red-600">Robert Martinez</p>
                      </div>
                    </div>
                  )}
                  
                  {pendingTasks.slice(0, 3).map(task => (
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}