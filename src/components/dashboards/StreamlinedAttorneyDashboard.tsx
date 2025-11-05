import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockClients, mockTasks, mockMatters } from "@/data/mockData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { EnhancedTaskItem } from "@/components/tasks/EnhancedTaskItem";
import { TaskDetailDialog } from "@/components/tasks/TaskDetailDialog";
import { Task } from "@/types/legal";
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
  BarChart3,
  Mail,
  Phone,
  User
} from "lucide-react";

export function StreamlinedAttorneyDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewClientPage, setReviewClientPage] = useState(1);
  
  // Prospects filters
  const [prospectSearch, setProspectSearch] = useState("");
  const [prospectStageFilter, setProspectStageFilter] = useState("all");
  const [prospectSortBy, setProspectSortBy] = useState("lastAction");
  const [prospectViewMode, setProspectViewMode] = useState<"list" | "grouped">("list");
  const [expandedProspects, setExpandedProspects] = useState<Set<string>>(new Set());
  
  // Performance period filter
  const [performancePeriod, setPerformancePeriod] = useState<"week" | "month" | "year">("month");
  
  // Task filters and state
  const [taskFilter, setTaskFilter] = useState<'all' | 'today' | 'overdue' | 'high'>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [taskPage, setTaskPage] = useState(1);
  
  const itemsPerPage = 6;
  const reviewClientsPerPage = 4;

  const myClients = mockClients.filter(client => client.assignedAttorney === 'Michael Chen');
  const myTasks = mockTasks.filter(task => task.assignedTo === 'Michael Chen' && task.status !== 'completed');
  const myMatters = mockMatters.filter(matter => 
    myClients.some(client => client.id === matter.clientId)
  );

  // Active matters (ongoing work)
  const activeMatters = myMatters.filter(matter => 
    !['signed', 'funding', 'reengage'].includes(matter.workflowStage)
  );

  // Prospects (potential clients not yet signed)
  const prospects = myClients.filter(client => 
    ['new_lead', 'contacted', 'scheduled', 'complete', 'ready_for_review'].includes(client.pipelineStage)
  );

  // Task filtering helpers
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayTasks = myTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  });

  const overdueTasks = myTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() < today.getTime();
  });

  const highPriorityTasks = myTasks.filter(task => task.priority === 'high');

  const filteredTasksByFilter = (() => {
    switch (taskFilter) {
      case 'today':
        return todayTasks;
      case 'overdue':
        return overdueTasks;
      case 'high':
        return highPriorityTasks;
      default:
        return myTasks;
    }
  })();

  // Task handlers
  const handleTaskComplete = (taskId: string) => {
    toast({
      title: "Task completed",
      description: "Task has been marked as complete.",
    });
  };

  const handleTaskEdit = (taskId: string) => {
    const task = myTasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setTaskDialogOpen(true);
    }
  };

  const handleTaskDelete = (taskId: string) => {
    toast({
      title: "Task deleted",
      description: "Task has been removed.",
      variant: "destructive",
    });
  };

  const handleTaskClick = (taskId: string) => {
    const task = myTasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setTaskDialogOpen(true);
    }
  };

  // Task pagination
  const tasksPerPage = 6;
  const totalTaskPages = Math.ceil(filteredTasksByFilter.length / tasksPerPage);
  const paginatedTasks = filteredTasksByFilter.slice(
    (taskPage - 1) * tasksPerPage,
    taskPage * tasksPerPage
  );

  // Reset to page 1 when filter changes
  const handleTaskFilterChange = (newFilter: 'all' | 'today' | 'overdue' | 'high') => {
    setTaskFilter(newFilter);
    setTaskPage(1);
  };

  // Helper function to calculate days since last action
  const getDaysSinceLastAction = (client: typeof prospects[0]) => {
    const lastActionDate = client.lastActionDate ? new Date(client.lastActionDate) : new Date(client.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastActionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Helper function to get urgency level
  const getUrgencyLevel = (client: typeof prospects[0]) => {
    const days = getDaysSinceLastAction(client);
    if (client.pipelineStage === 'scheduled' && days <= 2) return 'hot';
    if (days > 7) return 'attention';
    return 'normal';
  };

  // Calculate performance metrics based on period
  const getPerformanceMetrics = () => {
    const now = new Date();
    const periodStart = new Date();
    
    switch (performancePeriod) {
      case "week":
        periodStart.setDate(now.getDate() - 7);
        break;
      case "month":
        periodStart.setMonth(now.getMonth() - 1);
        break;
      case "year":
        periodStart.setFullYear(now.getFullYear() - 1);
        break;
    }

    // Filter matters and prospects by period
    const periodMatters = myMatters.filter(matter => 
      new Date(matter.createdAt) >= periodStart
    );
    const periodProspects = prospects.filter(prospect => 
      new Date(prospect.createdAt) >= periodStart
    );

    // Client Metrics
    const activeMattersCount = activeMatters.length;
    const mattersReadyForReview = activeMatters.filter(m => 
      m.workflowStage === 'sign_ready' || m.workflowStage === 'binder_creation'
    ).length;
    const totalRevenue = myMatters.reduce((sum, m) => sum + (m.revenue || 0), 0);
    const avgMatterRevenue = totalRevenue / (myMatters.length || 1);

    // Prospect Metrics
    const prospectCount = prospects.length;
    const pipelineRevenue = prospects.reduce((sum, p) => sum + (p.estimatedRevenue || 0), 0);
    const newProspectsThisPeriod = periodProspects.length;
    const conversionRate = myClients.filter(c => c.pipelineStage === 'signed').length / (myClients.length || 1) * 100;
    const hotLeads = prospects.filter(p => getUrgencyLevel(p) === 'hot').length;

    return {
      clients: {
        activeMatters: activeMattersCount,
        readyForReview: mattersReadyForReview,
        totalRevenue,
        avgRevenue: avgMatterRevenue
      },
      prospects: {
        total: prospectCount,
        pipelineRevenue,
        newThisPeriod: newProspectsThisPeriod,
        conversionRate,
        hotLeads
      }
    };
  };

  const performanceMetrics = getPerformanceMetrics();

  // Filter and sort prospects
  const filteredProspects = prospects
    .filter(prospect => {
      const matchesSearch = prospect.name.toLowerCase().includes(prospectSearch.toLowerCase()) ||
                          prospect.email.toLowerCase().includes(prospectSearch.toLowerCase());
      const matchesStage = prospectStageFilter === "all" || prospect.pipelineStage === prospectStageFilter;
      return matchesSearch && matchesStage;
    })
    .sort((a, b) => {
      switch (prospectSortBy) {
        case "lastAction":
          return getDaysSinceLastAction(b) - getDaysSinceLastAction(a);
        case "name":
          return a.name.localeCompare(b.name);
        case "stage":
          return a.pipelineStage.localeCompare(b.pipelineStage);
        default:
          return 0;
      }
    });

  // Group prospects by stage if in grouped mode
  const groupedProspects = {
    new_lead: filteredProspects.filter(p => p.pipelineStage === 'new_lead'),
    contacted: filteredProspects.filter(p => p.pipelineStage === 'contacted'),
    scheduled: filteredProspects.filter(p => p.pipelineStage === 'scheduled'),
    complete: filteredProspects.filter(p => p.pipelineStage === 'complete'),
    ready_for_review: filteredProspects.filter(p => p.pipelineStage === 'ready_for_review'),
  };

  const toggleProspectExpand = (id: string) => {
    setExpandedProspects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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
    <div className="flex flex-col h-full min-h-0">
      {/* Header with Quick Actions */}
      <div className="flex-shrink-0 sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Happy Tuesday, Crosby!</h1>
            <p className="text-sm text-muted-foreground">Manage active matters and client engagement</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Create </span>Client
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
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden px-4 sm:px-6 py-4 gap-6">
        {/* Main Content - Matters and Clients */}
        <div className="flex-1 lg:flex-[2] basis-0 min-h-0 overflow-y-auto space-y-6">
          
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

            {/* Matters & Prospects Card with Integrated Tabs */}
            <Card className="flex-shrink-0 max-h-[40rem] flex flex-col overflow-hidden">
              <Tabs defaultValue="matters" className="flex-1 flex flex-col min-h-0">
                {/* Card Header with Integrated Tabs */}
                <div className="border-b bg-muted/20">
                  <div className="px-4 sm:px-6 pt-4 pb-2">
                    <TabsList className="grid w-full grid-cols-2 bg-background/60 h-12 p-1 border border-border/50">
                      <TabsTrigger 
                        value="matters" 
                        className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=inactive]:hover:bg-muted/50 transition-all duration-200"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="font-medium">Active Matters</span>
                        <Badge variant="secondary" className="ml-1 text-xs data-[state=active]:bg-primary-foreground/20 data-[state=active]:text-primary-foreground">{filteredMatters.length}</Badge>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="prospects" 
                        className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=inactive]:hover:bg-muted/50 transition-all duration-200"
                      >
                        <Users className="w-4 h-4" />
                        <span className="font-medium">Prospects</span>
                        <Badge variant="secondary" className="ml-1 text-xs data-[state=active]:bg-primary-foreground/20 data-[state=active]:text-primary-foreground">{filteredProspects.length}</Badge>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                {/* Card Content with Tab Content */}
                <TabsContent value="matters" className="flex-1 flex flex-col min-h-0 mt-0">
                  <CardContent className="flex-1 flex flex-col min-h-0 p-0 overflow-hidden">
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
                </TabsContent>

                <TabsContent value="prospects" className="flex-1 flex flex-col min-h-0 mt-0">
                  <CardContent className="flex-1 flex flex-col min-h-0 p-0 overflow-hidden">
                    {/* Search and Filter Bar for Prospects */}
                    <div className="flex-shrink-0 border-b bg-muted/20 p-3 sm:p-4">
                      <div className="flex flex-col gap-3">
                        {/* Search and Filters Row */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              placeholder="Search prospects by name or email..."
                              value={prospectSearch}
                              onChange={(e) => setProspectSearch(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          
                          <div className="flex flex-col xs:flex-row gap-2">
                            <Select value={prospectStageFilter} onValueChange={setProspectStageFilter}>
                              <SelectTrigger className="w-full xs:w-36">
                                <SelectValue placeholder="All Stages" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Stages</SelectItem>
                                <SelectItem value="new_lead">New Lead</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="complete">Complete</SelectItem>
                                <SelectItem value="ready_for_review">Ready for Review</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select value={prospectSortBy} onValueChange={setProspectSortBy}>
                              <SelectTrigger className="w-full xs:w-36">
                                <SelectValue placeholder="Sort by" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lastAction">Last Action</SelectItem>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="stage">Stage</SelectItem>
                              </SelectContent>
                            </Select>

                            <div className="flex gap-1 border rounded-md p-1 bg-background">
                              <Button
                                variant={prospectViewMode === "list" ? "default" : "ghost"}
                                size="sm"
                                className="h-8 px-3"
                                onClick={() => setProspectViewMode("list")}
                              >
                                <ClipboardList className="w-4 h-4" />
                              </Button>
                              <Button
                                variant={prospectViewMode === "grouped" ? "default" : "ghost"}
                                size="sm"
                                className="h-8 px-3"
                                onClick={() => setProspectViewMode("grouped")}
                              >
                                <Target className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Prospects Content */}
                    <div className="flex-1 overflow-y-auto min-h-0">
                      {prospectViewMode === "list" ? (
                        // List View
                        <div className="space-y-2 p-3 sm:p-4 pr-2">
                          {filteredProspects.map(prospect => {
                            const urgency = getUrgencyLevel(prospect);
                            const daysSince = getDaysSinceLastAction(prospect);
                            const isExpanded = expandedProspects.has(prospect.id);
                            
                            const getEngagementType = (client: typeof prospect) => {
                              if (client.notes?.toLowerCase().includes('trust')) return 'Trust Planning';
                              if (client.notes?.toLowerCase().includes('will')) return 'Will & Estate';
                              if (client.notes?.toLowerCase().includes('business')) return 'Business Planning';
                              if (client.notes?.toLowerCase().includes('succession')) return 'Succession Planning';
                              return 'Estate Planning';
                            };

                            const getUrgencyStyles = () => {
                              if (urgency === 'hot') return 'border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20';
                              if (urgency === 'attention') return 'border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20';
                              return 'border-l-2 border-l-muted';
                            };

                            return (
                              <div 
                                key={prospect.id}
                                className={cn(
                                  "p-3 border rounded-lg hover:shadow-sm transition-all duration-200 bg-card cursor-pointer",
                                  getUrgencyStyles()
                                )}
                                onClick={() => toggleProspectExpand(prospect.id)}
                              >
                                {/* Compact Main Info */}
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    {/* Name and Stage Badge */}
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-sm truncate">{prospect.name}</h3>
                                      <StatusBadge status={prospect.pipelineStage} type="pipeline" />
                                      {urgency === 'hot' && (
                                        <Badge className="bg-orange-500 text-white text-xs px-1.5 py-0">
                                          🔥 Hot Lead
                                        </Badge>
                                      )}
                                      {urgency === 'attention' && (
                                        <Badge variant="destructive" className="text-xs px-1.5 py-0">
                                          Needs Attention
                                        </Badge>
                                      )}
                                    </div>

                                    {/* Key Info Row */}
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                      <div className="flex items-center gap-1 font-semibold text-foreground">
                                        <span>${prospect.estimatedRevenue?.toLocaleString() || '0'}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <FileText className="w-3 h-3" />
                                        <span>{getEngagementType(prospect)}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span className={daysSince > 7 ? 'text-red-600 font-medium' : ''}>
                                          {daysSince} {daysSince === 1 ? 'day' : 'days'} ago
                                        </span>
                                      </div>
                                    </div>

                                    {/* Expanded Contact Info */}
                                    {isExpanded && (
                                      <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <Mail className="w-3 h-3" />
                                          <a 
                                            href={`mailto:${prospect.email}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="hover:text-primary hover:underline"
                                          >
                                            {prospect.email}
                                          </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <Phone className="w-3 h-3" />
                                          <a 
                                            href={`tel:${prospect.phone}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="hover:text-primary hover:underline"
                                          >
                                            {prospect.phone}
                                          </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <Users className="w-3 h-3" />
                                          <span>Referred by: {prospect.referralSource}</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Quick Action Buttons */}
                                  <div className="flex gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 px-2"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(`/client/${prospect.id}`, '_blank');
                                      }}
                                      title="View Details"
                                    >
                                      <Eye className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 px-2"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = `mailto:${prospect.email}`;
                                      }}
                                      title="Send Email"
                                    >
                                      <Mail className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 px-2"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = `tel:${prospect.phone}`;
                                      }}
                                      title="Call"
                                    >
                                      <Phone className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="default"
                                      size="sm"
                                      className="h-7 px-2"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // TODO: Open schedule dialog
                                      }}
                                      title="Schedule"
                                    >
                                      <Calendar className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                         
                          {filteredProspects.length === 0 && (
                            <div className="text-center py-8">
                              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground font-medium mb-2">No prospects match your filters</p>
                              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Grouped View
                        <div className="p-3 sm:p-4 space-y-4">
                          {(['new_lead', 'contacted', 'scheduled', 'complete', 'ready_for_review'] as const).map(stage => {
                            const stageProspects = groupedProspects[stage];
                            const stageLabels = {
                              new_lead: 'New Leads',
                              contacted: 'Contacted',
                              scheduled: 'Consultation Scheduled',
                              complete: 'Consultation Complete',
                              ready_for_review: 'Ready for Review'
                            };

                            if (stageProspects.length === 0) return null;

                            return (
                              <div key={stage} className="space-y-2">
                                <div className="flex items-center gap-2 pb-2 border-b">
                                  <h3 className="font-semibold text-sm">{stageLabels[stage]}</h3>
                                  <Badge variant="secondary" className="text-xs">{stageProspects.length}</Badge>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                  {stageProspects.map(prospect => {
                                    const urgency = getUrgencyLevel(prospect);
                                    const daysSince = getDaysSinceLastAction(prospect);
                                    const isExpanded = expandedProspects.has(prospect.id);
                                    
                                    const getEngagementType = (client: typeof prospect) => {
                                      if (client.notes?.toLowerCase().includes('trust')) return 'Trust Planning';
                                      if (client.notes?.toLowerCase().includes('will')) return 'Will & Estate';
                                      if (client.notes?.toLowerCase().includes('business')) return 'Business Planning';
                                      return 'Estate Planning';
                                    };

                                    const getUrgencyStyles = () => {
                                      if (urgency === 'hot') return 'border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20';
                                      if (urgency === 'attention') return 'border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/20';
                                      return 'border-l-2 border-l-muted';
                                    };

                                    return (
                                      <div 
                                        key={prospect.id}
                                        className={cn(
                                          "p-2.5 border rounded-lg hover:shadow-sm transition-all duration-200 bg-card cursor-pointer text-xs",
                                          getUrgencyStyles()
                                        )}
                                        onClick={() => toggleProspectExpand(prospect.id)}
                                      >
                                        <div className="flex items-start justify-between gap-2 mb-1.5">
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                              <h4 className="font-semibold text-xs truncate">{prospect.name}</h4>
                                              {urgency === 'hot' && (
                                                <span className="text-orange-500 text-xs">🔥</span>
                                              )}
                                              {urgency === 'attention' && (
                                                <AlertTriangle className="w-3 h-3 text-red-500" />
                                              )}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                              <span className="font-semibold text-foreground">${prospect.estimatedRevenue?.toLocaleString() || '0'}</span>
                                              <span>•</span>
                                              <span>{getEngagementType(prospect)}</span>
                                              <span>•</span>
                                              <span className={daysSince > 7 ? 'text-red-600 font-medium' : ''}>
                                                {daysSince}d ago
                                              </span>
                                            </div>
                                            
                                            {isExpanded && (
                                              <div className="mt-1.5 pt-1.5 border-t border-border/50 space-y-0.5">
                                                <div className="flex items-center gap-1.5">
                                                  <Mail className="w-3 h-3" />
                                                  <a 
                                                    href={`mailto:${prospect.email}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="hover:text-primary hover:underline truncate"
                                                  >
                                                    {prospect.email}
                                                  </a>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                  <Phone className="w-3 h-3" />
                                                  <a 
                                                    href={`tel:${prospect.phone}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="hover:text-primary hover:underline"
                                                  >
                                                    {prospect.phone}
                                                  </a>
                                                </div>
                                              </div>
                                            )}
                                          </div>

                                          <div className="flex gap-0.5">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="h-6 px-1.5"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(`/client/${prospect.id}`, '_blank');
                                              }}
                                              title="View"
                                            >
                                              <Eye className="w-3 h-3" />
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="h-6 px-1.5"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                window.location.href = `mailto:${prospect.email}`;
                                              }}
                                              title="Email"
                                            >
                                              <Mail className="w-3 h-3" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}

                          {filteredProspects.length === 0 && (
                            <div className="text-center py-8">
                              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground font-medium mb-2">No prospects match your filters</p>
                              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
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
        <div className="flex-1 lg:w-80 basis-0 flex flex-col gap-4 sm:gap-6 min-h-0 overflow-y-auto">
          {/* Performance Metrics - Fixed Height */}
          <div className="flex-shrink-0">
            <Card>
              <CardHeader className="flex-shrink-0 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>Performance</span>
                  </CardTitle>
                </div>
                {/* Period Toggle */}
                <div className="flex gap-1 bg-muted/30 p-1 rounded-lg">
                  <Button
                    variant={performancePeriod === "week" ? "default" : "ghost"}
                    size="sm"
                    className="flex-1 h-7 text-xs"
                    onClick={() => setPerformancePeriod("week")}
                  >
                    Week
                  </Button>
                  <Button
                    variant={performancePeriod === "month" ? "default" : "ghost"}
                    size="sm"
                    className="flex-1 h-7 text-xs"
                    onClick={() => setPerformancePeriod("month")}
                  >
                    Month
                  </Button>
                  <Button
                    variant={performancePeriod === "year" ? "default" : "ghost"}
                    size="sm"
                    className="flex-1 h-7 text-xs"
                    onClick={() => setPerformancePeriod("year")}
                  >
                    Year
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-3 space-y-4">
                {/* Clients Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 mb-2">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Clients</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-blue-600">
                        {performanceMetrics.clients.activeMatters}
                      </div>
                      <div className="text-xs text-muted-foreground">Active Matters</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-orange-600">
                        {performanceMetrics.clients.readyForReview}
                      </div>
                      <div className="text-xs text-muted-foreground">For Review</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-green-600">
                        ${(performanceMetrics.clients.totalRevenue / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Total Revenue</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-purple-600">
                        ${(performanceMetrics.clients.avgRevenue / 1000).toFixed(1)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Matter</div>
                    </div>
                  </div>
                </div>

                {/* Prospects Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prospects</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-blue-600">
                        {performanceMetrics.prospects.total}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Prospects</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-cyan-600">
                        {performanceMetrics.prospects.hotLeads}
                      </div>
                      <div className="text-xs text-muted-foreground">Hot Leads</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-green-600">
                        ${(performanceMetrics.prospects.pipelineRevenue / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Pipeline Value</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <div className="text-lg sm:text-xl font-bold text-purple-600">
                        {performanceMetrics.prospects.conversionRate.toFixed(0)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Conversion</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks - Expanded Height */}
          <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <CardHeader className="flex-shrink-0 pb-2">
              <CardTitle className="text-sm sm:text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  My Tasks
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {myTasks.length}
                  </Badge>
                </div>
              </CardTitle>
              
              {/* Filter Tabs */}
              <div className="flex gap-1 bg-muted/30 p-1 rounded-lg mt-2">
                <Button
                  variant={taskFilter === "all" ? "default" : "ghost"}
                  size="sm"
                  className="flex-1 h-7 text-xs"
                  onClick={() => handleTaskFilterChange("all")}
                >
                  All
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">
                    {myTasks.length}
                  </Badge>
                </Button>
                <Button
                  variant={taskFilter === "today" ? "default" : "ghost"}
                  size="sm"
                  className="flex-1 h-7 text-xs"
                  onClick={() => handleTaskFilterChange("today")}
                >
                  Today
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">
                    {todayTasks.length}
                  </Badge>
                </Button>
                <Button
                  variant={taskFilter === "overdue" ? "default" : "ghost"}
                  size="sm"
                  className="flex-1 h-7 text-xs"
                  onClick={() => handleTaskFilterChange("overdue")}
                >
                  Overdue
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">
                    {overdueTasks.length}
                  </Badge>
                </Button>
                <Button
                  variant={taskFilter === "high" ? "default" : "ghost"}
                  size="sm"
                  className="flex-1 h-7 text-xs"
                  onClick={() => handleTaskFilterChange("high")}
                >
                  High
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">
                    {highPriorityTasks.length}
                  </Badge>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col min-h-0 p-0 overflow-hidden">
              <div className="">
                <div className="space-y-1.5 p-2 pr-2">
                  {filteredTasksByFilter.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        {taskFilter === "all" && "No tasks yet!"}
                        {taskFilter === "today" && "No tasks for today"}
                        {taskFilter === "overdue" && "No overdue tasks - you're all caught up!"}
                        {taskFilter === "high" && "No high priority tasks"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {taskFilter === "overdue" && "Great job staying on top of everything!"}
                        {taskFilter === "today" && "Check back tomorrow for upcoming tasks"}
                      </p>
                    </div>
                  ) : (
                    paginatedTasks.map(task => (
                      <EnhancedTaskItem
                        key={task.id}
                        task={task}
                        onComplete={handleTaskComplete}
                        onEdit={handleTaskEdit}
                        onDelete={handleTaskDelete}
                        onClick={handleTaskClick}
                      />
                    ))
                  )}
                </div>
              </div>
              
              {/* Pagination */}
              {filteredTasksByFilter.length > tasksPerPage && (
                <div className="flex-shrink-0 border-t p-3 flex items-center justify-between bg-background">
                  <div className="text-xs text-muted-foreground">
                    Showing {((taskPage - 1) * tasksPerPage) + 1}-{Math.min(taskPage * tasksPerPage, filteredTasksByFilter.length)} of {filteredTasksByFilter.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTaskPage(p => Math.max(1, p - 1))}
                      disabled={taskPage === 1}
                      className="h-7 w-7 p-0"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <div className="text-xs px-2">
                      {taskPage} / {totalTaskPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTaskPage(p => Math.min(totalTaskPages, p + 1))}
                      disabled={taskPage === totalTaskPages}
                      className="h-7 w-7 p-0"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Task Detail Dialog */}
          <TaskDetailDialog
            task={selectedTask}
            open={taskDialogOpen}
            onOpenChange={setTaskDialogOpen}
          />
        </div>
      </div>
    </div>
  );
}