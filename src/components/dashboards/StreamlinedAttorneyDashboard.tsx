import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";
import { mockClients, mockTasks, mockMatters } from "@/data/mockData";
import { 
  Calendar, 
  Send, 
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Users,
  UserPlus,
  Plus,
  ClipboardList
} from "lucide-react";

export function StreamlinedAttorneyDashboard() {
  const myClients = mockClients.filter(client => client.assignedAttorney === 'Michael Chen');
  const myTasks = mockTasks.filter(task => task.assignedBy === 'Michael Chen');
  const myMatters = mockMatters.filter(matter => 
    myClients.some(client => client.id === matter.clientId)
  );

  // Workflow-based organization
  const needsIntakeForm = myClients.filter(c => 
    c.pipelineStage === 'scheduled' && !c.intakeFormSent
  );
  
  const waitingOnIntake = myClients.filter(c => 
    c.pipelineStage === 'complete' && !c.intakeFormReceived
  );
  
  const readyToDraft = myClients.filter(c => 
    c.pipelineStage === 'complete' && c.intakeFormReceived && 
    !myMatters.some(m => m.clientId === c.id)
  );

  const activeDrafting = myMatters.filter(m => 
    ['intake', 'drafting', 'review'].includes(m.workflowStage)
  );

  const overdueItems = myTasks.filter(t => t.status === 'overdue').length;
  const urgentItems = needsIntakeForm.length + waitingOnIntake.length + readyToDraft.length + overdueItems;

  return (
    <div className="space-y-4">
      {/* Compact Header with Key Metrics */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-legal-heading">My Workflow</h1>
          <p className="text-legal-body mt-1">Focus on what needs action today</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="font-medium">{urgentItems}</span>
              <span className="text-muted-foreground">urgent</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-medium">{myClients.length}</span>
              <span className="text-muted-foreground">clients</span>
            </div>
          </div>
          <Button size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Consult
          </Button>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">Quick actions:</span>
          <Button variant="ghost" size="sm" className="h-8">
            <UserPlus className="w-3 h-3 mr-1" />
            Create Prospect
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <FileText className="w-3 h-3 mr-1" />
            Create Matter
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <ClipboardList className="w-3 h-3 mr-1" />
            Create Task
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
          View All <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>

      {/* Priority Queue - Items Needing Immediate Action */}
      {urgentItems > 0 && (
        <Card className="border-orange-200 bg-orange-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-orange-700">
              <AlertTriangle className="w-4 h-4" />
              Priority Queue ({urgentItems} items)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {needsIntakeForm.map(client => (
              <div key={client.id} className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex-1">
                  <p className="font-medium text-sm">{client.name}</p>
                  <p className="text-xs text-muted-foreground">Send intake form</p>
                </div>
                <Button size="sm" variant="outline">
                  <Send className="w-3 h-3 mr-1" />
                  Send
                </Button>
              </div>
            ))}
            {readyToDraft.map(client => (
              <div key={client.id} className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex-1">
                  <p className="font-medium text-sm">{client.name}</p>
                  <p className="text-xs text-muted-foreground">Create matter & start drafting</p>
                </div>
                <Button size="sm" variant="outline">
                  <FileText className="w-3 h-3 mr-1" />
                  Draft
                </Button>
              </div>
            ))}
            {myTasks.filter(t => t.status === 'overdue').map(task => (
              <div key={task.id} className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex-1">
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-red-600">Overdue - {task.clientName}</p>
                </div>
                <StatusBadge status={task.status} type="task" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Prospect Pipeline */}
        <Card className="legal-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Prospect Pipeline</span>
              <Badge variant="secondary" className="text-xs">
                {myClients.filter(c => c.pipelineStage !== 'signed').length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Waiting on Intake */}
            {waitingOnIntake.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">WAITING ON INTAKE</h4>
                {waitingOnIntake.map(client => (
                  <div key={client.id} className="flex items-center justify-between p-2 border rounded hover:bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{client.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {client.consultDate && new Date(client.consultDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}

            {/* Upcoming Consultations */}
            {myClients.filter(c => c.pipelineStage === 'scheduled').map(client => (
              <div key={client.id} className="flex items-center justify-between p-2 border rounded hover:bg-muted/30">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{client.name}</p>
                  <p className="text-xs text-blue-600">
                    Consult: {client.consultDate && new Date(client.consultDate).toLocaleDateString()}
                  </p>
                </div>
                <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Drafting */}
        <Card className="legal-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Active Drafting</span>
              <Badge variant="secondary" className="text-xs">{activeDrafting.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeDrafting.map(matter => {
              const client = myClients.find(c => c.id === matter.clientId);
              return (
                <div key={matter.id} className="p-3 border rounded hover:bg-muted/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{client?.name}</p>
                      <p className="text-xs text-muted-foreground">{matter.type}</p>
                    </div>
                    <StatusBadge status={matter.workflowStage} type="workflow" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{matter.progress}%</span>
                    </div>
                    <Progress value={matter.progress} className="h-1" />
                  </div>
                  {matter.dueDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Due: {new Date(matter.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              );
            })}
            {activeDrafting.length === 0 && (
              <div className="text-center py-4">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">All caught up!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Tasks */}
        <Card className="legal-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Team Tasks</span>
              <Badge variant="secondary" className="text-xs">
                {myTasks.filter(t => t.status !== 'completed').length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myTasks
              .filter(t => t.status !== 'completed')
              .sort((a, b) => {
                if (a.status === 'overdue' && b.status !== 'overdue') return -1;
                if (b.status === 'overdue' && a.status !== 'overdue') return 1;
                if (a.priority === 'high' && b.priority !== 'high') return -1;
                if (b.priority === 'high' && a.priority !== 'high') return 1;
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
              })
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
                    <div className="flex flex-col items-end gap-1">
                      <StatusBadge status={task.status} type="task" />
                      {task.priority === 'high' && (
                        <AlertTriangle className="w-3 h-3 text-orange-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {myTasks.filter(t => t.status !== 'completed').length === 0 && (
              <div className="text-center py-4">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No pending tasks</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}