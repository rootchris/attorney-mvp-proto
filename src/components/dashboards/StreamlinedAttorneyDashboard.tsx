import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
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
  Filter,
  DollarSign,
  TrendingUp,
  Target
} from "lucide-react";

export function StreamlinedAttorneyDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [matterFilter, setMatterFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [matterPage, setMatterPage] = useState(1);
  const [taskPage, setTaskPage] = useState(1);
  const [reviewClientPage, setReviewClientPage] = useState(1);
  
  const mattersPerPage = 4;
  const tasksPerPage = 3;
  const reviewClientsPerPage = 3;

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
      clientEmail: client?.email || '',
      clientPhone: client?.phone || '',
      assignedAttorney: client?.assignedAttorney || 'Michael Chen'
    };
  });

  // Clients ready for review (using the new pipeline stage)
  const clientsReadyForReview = myClients.filter(client => {
    return client.pipelineStage === 'ready_for_review';
  });

  // Filter and sort matters
  const filteredMatters = enrichedMatters
    .filter(matter => {
      const matchesSearch = matter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          matter.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          matter.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = matterFilter === "all" || matter.workflowStage === matterFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "clientName":
          return a.clientName.localeCompare(b.clientName);
        case "workflowStage":
          return a.workflowStage.localeCompare(b.workflowStage);
        case "revenue":
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
    conversionRate: Math.round((myClients.filter(c => c.pipelineStage === 'signed').length / myClients.length) * 100)
  };

  const pendingTasks = myTasks.filter(t => t.status !== 'completed');
  const overdueTasks = myTasks.filter(t => t.status === 'overdue');

  // Pagination calculations
  const totalMatterPages = Math.ceil(filteredMatters.length / mattersPerPage);
  const totalTaskPages = Math.ceil(pendingTasks.length / tasksPerPage);
  const totalReviewPages = Math.ceil(clientsReadyForReview.length / reviewClientsPerPage);
  
  const paginatedMatters = filteredMatters.slice(
    (matterPage - 1) * mattersPerPage,
    matterPage * mattersPerPage
  );

  const paginatedTasks = pendingTasks.slice(
    (taskPage - 1) * tasksPerPage,
    taskPage * tasksPerPage
  );

  const paginatedReviewClients = clientsReadyForReview.slice(
    (reviewClientPage - 1) * reviewClientsPerPage,
    reviewClientPage * reviewClientsPerPage
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-legal-heading">Matter Management</h1>
          <p className="text-legal-body mt-1">Manage active matters and client re-engagement</p>
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

      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Main Matter List - 2/3 */}
        <div className="col-span-2 flex flex-col h-full min-h-0">
          {/* Search and Filter Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search matters, clients, tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <select 
                    value={matterFilter}
                    onChange={(e) => setMatterFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-background"
                  >
                    <option value="all">All Stages</option>
                    <option value="prospect">Prospect</option>
                    <option value="consult">Consultation</option>
                    <option value="client_ready_for_draft">Ready for Draft</option>
                    <option value="drafting">Drafting</option>
                    <option value="binder_creation">Binder Creation</option>
                    <option value="sign_ready">Ready to Sign</option>
                  </select>
                  
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-background"
                  >
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="clientName">Sort by Client</option>
                    <option value="workflowStage">Sort by Stage</option>
                    <option value="revenue">Sort by Revenue</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Matters List */}
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Active Matters ({filteredMatters.length})</span>
                <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
              <div className="space-y-3 pr-2 flex-1 overflow-y-auto">
                {paginatedMatters.map(matter => (
                  <div 
                    key={matter.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => navigate(`/matter/${matter.id}`)}
                  >
                    <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                      <div>
                        <p className="font-medium">{matter.title}</p>
                        <p className="text-sm text-muted-foreground">{matter.clientName}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">{matter.type}</p>
                        <StatusBadge status={matter.workflowStage} type="workflow" />
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">
                          Due: {matter.dueDate ? new Date(matter.dueDate).toLocaleDateString() : 'No due date'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(matter.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">${(matter.revenue || 0).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Matter Value</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/client/${matter.clientId}`);
                        }}
                      >
                        View Client
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/matter/${matter.id}`);
                        }}
                      >
                        View Matter
                      </Button>
                    </div>
                  </div>
                ))}
                
                 {filteredMatters.length === 0 && (
                   <div className="text-center py-8">
                     <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                     <p className="text-muted-foreground">No active matters match your current filters</p>
                   </div>
                 )}
               </div>
               
               {/* Matter Pagination */}
               {totalMatterPages > 1 && (
                 <div className="flex-shrink-0 border-t pt-4">
                   <Pagination>
                     <PaginationContent>
                       <PaginationItem>
                         <PaginationPrevious 
                           href="#"
                           onClick={(e) => {
                             e.preventDefault();
                             if (matterPage > 1) setMatterPage(matterPage - 1);
                           }}
                           className={matterPage === 1 ? "pointer-events-none opacity-50" : ""}
                         />
                       </PaginationItem>
                       {Array.from({ length: totalMatterPages }, (_, i) => i + 1).map((page) => (
                         <PaginationItem key={page}>
                           <PaginationLink
                             href="#"
                             onClick={(e) => {
                               e.preventDefault();
                               setMatterPage(page);
                             }}
                             isActive={page === matterPage}
                           >
                             {page}
                           </PaginationLink>
                         </PaginationItem>
                       ))}
                       <PaginationItem>
                         <PaginationNext
                           href="#"
                           onClick={(e) => {
                             e.preventDefault();
                             if (matterPage < totalMatterPages) setMatterPage(matterPage + 1);
                           }}
                           className={matterPage === totalMatterPages ? "pointer-events-none opacity-50" : ""}
                         />
                       </PaginationItem>
                     </PaginationContent>
                   </Pagination>
                 </div>
               )}
             </CardContent>
           </Card>
         </div>

         {/* Right Sidebar */}
         <div className="w-80 space-y-6">
           {/* Clients Ready for Review */}
           <Card className="flex flex-col">
             <CardHeader>
               <CardTitle className="text-base flex items-center justify-between">
                 <span className="flex items-center gap-2">
                   <UserPlus className="w-4 h-4" />
                   Clients Ready for Review
                 </span>
                 <div className="flex items-center gap-2">
                   <Badge variant="secondary" className="text-xs">
                     {clientsReadyForReview.length}
                   </Badge>
                   <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                     View All
                   </Button>
                 </div>
               </CardTitle>
             </CardHeader>
             <CardContent className="flex-1 flex flex-col">
               <div className="space-y-3 flex-1">
                 {paginatedReviewClients.map(client => (
                   <div 
                     key={client.id} 
                     className="p-3 border rounded-lg hover:bg-muted/30 cursor-pointer"
                     onClick={() => navigate(`/client/${client.id}`)}
                   >
                     <div className="flex items-start justify-between">
                       <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusBadge status={client.pipelineStage} type="pipeline" />
                            <span className="text-xs text-muted-foreground">
                              Signed: {client.signingDate ? new Date(client.signingDate).toLocaleDateString() : 'Unknown'}
                            </span>
                          </div>
                       </div>
                       <Button 
                         size="sm" 
                         variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/matter/${client.id}`);
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
               
               {/* Review Client Pagination */}
               {totalReviewPages > 1 && (
                 <div className="flex-shrink-0 border-t pt-4 mt-4">
                   <Pagination>
                     <PaginationContent>
                       <PaginationItem>
                         <PaginationPrevious 
                           href="#"
                           onClick={(e) => {
                             e.preventDefault();
                             if (reviewClientPage > 1) setReviewClientPage(reviewClientPage - 1);
                           }}
                           className={reviewClientPage === 1 ? "pointer-events-none opacity-50" : ""}
                         />
                       </PaginationItem>
                       {Array.from({ length: totalReviewPages }, (_, i) => i + 1).map((page) => (
                         <PaginationItem key={page}>
                           <PaginationLink
                             href="#"
                             onClick={(e) => {
                               e.preventDefault();
                               setReviewClientPage(page);
                             }}
                             isActive={page === reviewClientPage}
                           >
                             {page}
                           </PaginationLink>
                         </PaginationItem>
                       ))}
                       <PaginationItem>
                         <PaginationNext
                           href="#"
                           onClick={(e) => {
                             e.preventDefault();
                             if (reviewClientPage < totalReviewPages) setReviewClientPage(reviewClientPage + 1);
                           }}
                           className={reviewClientPage === totalReviewPages ? "pointer-events-none opacity-50" : ""}
                         />
                       </PaginationItem>
                     </PaginationContent>
                   </Pagination>
                 </div>
               )}
             </CardContent>
           </Card>

           {/* Performance Metrics */}
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
                     <FileText className="w-4 h-4 text-primary" />
                   </div>
                   <p className="text-2xl font-bold">{stats.activeMatters}</p>
                   <p className="text-xs text-muted-foreground">Active Matters</p>
                 </div>
                 
                 <div className="text-center p-3 bg-muted/30 rounded-lg">
                   <div className="flex items-center justify-center gap-1 mb-1">
                     <UserPlus className="w-4 h-4 text-orange-600" />
                   </div>
                   <p className="text-2xl font-bold">{stats.clientsForReview}</p>
                   <p className="text-xs text-muted-foreground">For Review</p>
                 </div>
                 
                 <div className="text-center p-3 bg-muted/30 rounded-lg">
                   <div className="flex items-center justify-center gap-1 mb-1">
                     <DollarSign className="w-4 h-4 text-green-600" />
                   </div>
                   <p className="text-2xl font-bold">${(stats.totalRevenue / 1000).toFixed(0)}K</p>
                   <p className="text-xs text-muted-foreground">Total Revenue</p>
                 </div>
                 
                 <div className="text-center p-3 bg-muted/30 rounded-lg">
                   <div className="flex items-center justify-center gap-1 mb-1">
                     <Target className="w-4 h-4 text-blue-600" />
                   </div>
                   <p className="text-2xl font-bold">${(stats.avgMatterValue / 1000).toFixed(0)}K</p>
                   <p className="text-xs text-muted-foreground">Avg Matter</p>
                 </div>
               </div>
             </CardContent>
           </Card>

            {/* Tasks */}
            <Card className="flex flex-col">
             <CardHeader>
               <CardTitle className="text-base flex items-center justify-between">
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
               <CardContent className="flex-1 flex flex-col">
                 <div className="space-y-3 flex-1">
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
                 
                 {paginatedTasks
                   .filter(t => t.status !== 'overdue')
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
                 </div>
                 
                 {/* Task Pagination */}
                 {totalTaskPages > 1 && (
                   <div className="flex-shrink-0 border-t pt-4 mt-4">
                     <Pagination>
                       <PaginationContent>
                         <PaginationItem>
                           <PaginationPrevious 
                             href="#"
                             onClick={(e) => {
                               e.preventDefault();
                               if (taskPage > 1) setTaskPage(taskPage - 1);
                             }}
                             className={taskPage === 1 ? "pointer-events-none opacity-50" : ""}
                           />
                         </PaginationItem>
                         {Array.from({ length: totalTaskPages }, (_, i) => i + 1).map((page) => (
                           <PaginationItem key={page}>
                             <PaginationLink
                               href="#"
                               onClick={(e) => {
                                 e.preventDefault();
                                 setTaskPage(page);
                               }}
                               isActive={page === taskPage}
                             >
                               {page}
                             </PaginationLink>
                           </PaginationItem>
                         ))}
                         <PaginationItem>
                           <PaginationNext
                             href="#"
                             onClick={(e) => {
                               e.preventDefault();
                               if (taskPage < totalTaskPages) setTaskPage(taskPage + 1);
                             }}
                             className={taskPage === totalTaskPages ? "pointer-events-none opacity-50" : ""}
                           />
                         </PaginationItem>
                       </PaginationContent>
                     </Pagination>
                   </div>
                 )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    );
}