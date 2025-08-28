import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { mockTasks, mockDocuments } from "@/data/mockData";
import { 
  FileText, 
  Upload, 
  Clock,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Calendar,
  ArrowRight
} from "lucide-react";

export function ClerkDashboard() {
  // Filter tasks assigned to current clerk (Lisa Park)
  const myTasks = mockTasks.filter(task => task.assignedTo === 'Lisa Park');
  const myDocuments = mockDocuments.filter(doc => doc.uploadedBy === 'Lisa Park');

  const stats = {
    totalTasks: myTasks.length,
    completedTasks: myTasks.filter(t => t.status === 'completed').length,
    overdueTasks: myTasks.filter(t => t.status === 'overdue').length,
    uploadedDocs: myDocuments.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-legal-heading">Paralegal Dashboard</h1>
          <p className="text-legal-body mt-1">Manage your assigned tasks and document workflow</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-light rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-legal-caption">Total Tasks</p>
                <p className="text-2xl font-semibold">{stats.totalTasks}</p>
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
                <p className="text-legal-caption">Completed</p>
                <p className="text-2xl font-semibold">{stats.completedTasks}</p>
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
                <p className="text-legal-caption">Overdue</p>
                <p className="text-2xl font-semibold">{stats.overdueTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-legal-caption">Documents</p>
                <p className="text-2xl font-semibold">{stats.uploadedDocs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Queue */}
        <Card className="legal-card">
          <CardHeader className="legal-card-header">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              My Task Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="legal-card-content">
            <div className="space-y-4">
              {myTasks
                .sort((a, b) => {
                  // Sort by priority: overdue first, then by due date
                  if (a.status === 'overdue' && b.status !== 'overdue') return -1;
                  if (b.status === 'overdue' && a.status !== 'overdue') return 1;
                  return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                })
                .map((task) => (
                  <div key={task.id} className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium">{task.title}</p>
                        {task.priority === 'high' && (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <p className="text-legal-body mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Client: {task.clientName}</span>
                        <span>Assigned by: {task.assignedBy}</span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={task.status} type="task" />
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Reassign
                        </Button>
                        {task.status !== 'completed' && (
                          <Button size="sm" className="text-xs">
                            {task.status === 'pending' ? 'Start' : 'Complete'}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Document Uploads */}
        <Card className="legal-card">
          <CardHeader className="legal-card-header">
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Recent Document Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="legal-card-content">
            <div className="space-y-4">
              {myDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-legal-body">{doc.type}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {Math.round(doc.size / 1024)} KB
                    </Badge>
                  </div>
                </div>
              ))}
              
              {/* Upload new document section */}
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-muted-foreground">Upload New Document</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Drag and drop or click to select files
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="legal-card">
        <CardHeader className="legal-card-header">
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="legal-card-content">
          <div className="flex gap-4 flex-wrap">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              View Calendar
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Document Templates
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Reassign Tasks
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Mark Complete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}