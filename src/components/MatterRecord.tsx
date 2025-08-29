import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Search, 
  CheckSquare, 
  List, 
  Users, 
  Activity, 
  Heart,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Download,
  Eye,
  EyeOff,
  FileText,
  Plus,
  Calendar,
  User,
  MessageSquare,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockClients, mockMatters } from '@/data/mockData';
import { WorkflowStage, Document, Note, Task } from '@/types/legal';

const mockMatterDocuments: Document[] = [
  {
    id: '1',
    matterId: '1',
    name: 'Johnson Family Trust - Draft v3.pdf',
    type: 'Trust Document',
    uploadedBy: 'Michael Chen',
    uploadedAt: '2024-03-08',
    size: 245760,
    url: '#',
    isWealthCounselDoc: true,
    clientVisible: false
  },
  {
    id: '2',
    matterId: '1',
    name: 'Property Deed Analysis.pdf',
    type: 'Real Estate Document',
    uploadedBy: 'Lisa Park',
    uploadedAt: '2024-03-06',
    size: 156890,
    url: '#',
    isWealthCounselDoc: false,
    clientVisible: true
  },
  {
    id: '3',
    matterId: '1',
    name: 'Tax Planning Worksheet.xlsx',
    type: 'Tax Document',
    uploadedBy: 'David Kim',
    uploadedAt: '2024-03-05',
    size: 89432,
    url: '#',
    isWealthCounselDoc: true,
    clientVisible: false
  },
  {
    id: '4',
    matterId: '1',
    name: 'Client Information Form.pdf',
    type: 'Intake Document',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-03-01',
    size: 567123,
    url: '#',
    isWealthCounselDoc: false,
    clientVisible: true
  }
];

const mockMatterNotes: Note[] = [
  {
    id: '1',
    matterId: '1',
    content: 'Client expressed concerns about the tax implications of the family trust structure. Need to schedule follow-up with tax specialist.',
    createdBy: 'Michael Chen',
    createdAt: '2024-03-08',
    taggedColleagues: ['Lisa Park', 'David Kim']
  },
  {
    id: '2',
    matterId: '1',
    content: 'Reviewed property valuations - everything looks accurate. Ready to proceed with trust funding phase.',
    createdBy: 'Lisa Park',
    createdAt: '2024-03-06',
    taggedColleagues: []
  }
];

const mockMatterTasks: Task[] = [
  {
    id: '1',
    matterId: '1',
    clientName: 'Sarah Johnson',
    title: 'Finalize trust document review',
    description: 'Complete final review of all trust documents before client presentation',
    assignedTo: 'Lisa Park',
    assignedBy: 'Michael Chen',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-03-15',
    createdAt: '2024-03-08'
  },
  {
    id: '2',
    matterId: '1',
    clientName: 'Sarah Johnson',
    title: 'Prepare signing binder',
    description: 'Organize all documents for client signing appointment',
    assignedTo: 'David Kim',
    assignedBy: 'Michael Chen',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-03-18',
    createdAt: '2024-03-10'
  },
  {
    id: '3',
    matterId: '1',
    clientName: 'Sarah Johnson',
    title: 'Schedule notary appointment',
    description: 'Coordinate notary services for trust signing',
    assignedTo: 'Lisa Park',
    assignedBy: 'Michael Chen',
    status: 'completed',
    priority: 'low',
    dueDate: '2024-03-12',
    createdAt: '2024-03-05',
    completedAt: '2024-03-11'
  }
];

const workflowStages: { stage: WorkflowStage; label: string; progress: number }[] = [
  { stage: 'prospect', label: 'Prospect', progress: 10 },
  { stage: 'consult', label: 'Consultation', progress: 20 },
  { stage: 'client_ready_for_draft', label: 'Ready for Draft', progress: 30 },
  { stage: 'drafting', label: 'Drafting', progress: 50 },
  { stage: 'binder_creation', label: 'Binder Creation', progress: 65 },
  { stage: 'sign_ready', label: 'Ready to Sign', progress: 80 },
  { stage: 'signed', label: 'Signed', progress: 90 },
  { stage: 'funding', label: 'Funding', progress: 95 },
  { stage: 'reengage', label: 'Re-engage', progress: 100 }
];

export function MatterRecord() {
  const { matterId } = useParams();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  
  // Mock data - in real app, fetch based on matterId
  const matter = mockMatters.find(m => m.id === matterId) || mockMatters[0];
  const client = mockClients.find(c => c.id === matter.clientId);
  
  const currentStage = workflowStages.find(s => s.stage === 'drafting') || workflowStages[3];

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="border-b bg-card px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search matters, clients, documents..."
                className="pl-10 w-64 lg:w-96"
              />
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="xl:hidden"
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          >
            <FileText className="w-4 h-4" />
            <span className="ml-2 hidden sm:inline">Details</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 lg:p-6">
            {/* Matter Header */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold">{matter.title}</h1>
                  <p className="text-muted-foreground">Matter Type: {matter.type}</p>
                </div>
              </div>

              {/* Workflow Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Matter Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="font-medium">Current Stage: {currentStage.label}</span>
                      <span className="text-sm text-muted-foreground">{currentStage.progress}% Complete</span>
                    </div>
                    <Progress value={currentStage.progress} className="h-2" />
                    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 text-xs">
                      {workflowStages.map((stage, index) => (
                        <div 
                          key={stage.stage}
                          className={`text-center p-2 rounded ${
                            stage.stage === 'drafting' 
                              ? 'bg-primary text-primary-foreground' 
                              : stage.progress < currentStage.progress 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <div className="break-words">{stage.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabbed Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="documents" className="flex flex-col h-full">
              <div className="border-b px-4 lg:px-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="documents" className="flex-1 mt-0 p-4 lg:p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Documents</h2>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
                <ScrollArea className="h-full">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {mockMatterDocuments.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-sm transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded bg-muted flex items-center justify-center">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-medium leading-tight break-words">{doc.name}</h4>
                                  {doc.isWealthCounselDoc && (
                                    <Badge variant="secondary" className="text-xs flex-shrink-0">WC</Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {doc.type} • {formatFileSize(doc.size)}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-xs text-muted-foreground min-w-0">
                                  <User className="w-3 h-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{doc.uploadedBy}</span>
                                  <span className="mx-2 flex-shrink-0">•</span>
                                  <span className="flex-shrink-0">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 w-7 p-0"
                                    title={doc.clientVisible ? "Visible to client" : "Hidden from client"}
                                  >
                                    {doc.clientVisible ? (
                                      <Eye className="w-3.5 h-3.5 text-green-600" />
                                    ) : (
                                      <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                                    )}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 w-7 p-0"
                                    title="Download document"
                                  >
                                    <Download className="w-3.5 h-3.5 text-muted-foreground" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="notes" className="flex-1 mt-0 p-4 lg:p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Matter Notes</h2>
                  <Button size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <Textarea 
                            placeholder="Add a note about this matter..."
                            className="min-h-[80px]"
                          />
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <Select>
                              <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Tag colleagues" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lisa">Lisa Park</SelectItem>
                                <SelectItem value="david">David Kim</SelectItem>
                                <SelectItem value="michael">Michael Chen</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" className="w-full sm:w-auto">Add Note</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="space-y-3">
                      {mockMatterNotes.map((note) => (
                        <Card key={note.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {note.createdBy.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm">{note.createdBy}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(note.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm mb-2">{note.content}</p>
                            {note.taggedColleagues && note.taggedColleagues.length > 0 && (
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <span className="text-xs text-muted-foreground">Tagged:</span>
                                <div className="flex flex-wrap gap-1">
                                  {note.taggedColleagues.map((colleague) => (
                                    <Badge key={colleague} variant="outline" className="text-xs">
                                      {colleague}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="tasks" className="flex-1 mt-0 p-4 lg:p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Matter Tasks</h2>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                  </Button>
                </div>
                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {mockMatterTasks.map((task) => (
                      <Card key={task.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-2">
                                <h4 className="font-medium flex-1">{task.title}</h4>
                                <div className="flex gap-2">
                                  <Badge className={getTaskStatusColor(task.status)}>
                                    {task.status.replace('_', ' ')}
                                  </Badge>
                                  <Badge className={getPriorityColor(task.priority)}>
                                    {task.priority}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  Assigned by: {task.assignedBy}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 self-start lg:self-center">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="text-xs">
                                  {task.assignedTo.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{task.assignedTo}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar - Matter Details */}
        <div className={`
          fixed xl:static inset-y-0 right-0 z-50 w-80 xl:w-72 border-l bg-card transform transition-transform duration-300 ease-in-out flex flex-col
          ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} xl:translate-x-0
        `}>
          <div className="flex justify-between items-center p-4 xl:hidden border-b">
            <h2 className="font-semibold">Matter Details</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setRightSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 h-0 p-6">
            <div className="space-y-6">
              {/* Client Information */}
              {client && (
                <div>
                  <h3 className="font-semibold mb-4">Client Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-sm">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{client.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {client.assignedAttorney}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="break-all text-xs">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{client.phone}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs">
                      <p><span className="text-muted-foreground">Referral:</span> {client.referralSource}</p>
                      <p><span className="text-muted-foreground">Client Since:</span> {new Date(client.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <Link to={`/client/${client.id}`} className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        View Full Profile
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-4">Matter Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Matter ID:</span>
                    <p className="font-medium">{matter.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Created:</span>
                    <p className="font-medium">{new Date(matter.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Due Date:</span>
                    <p className="font-medium">{matter.dueDate ? new Date(matter.dueDate).toLocaleDateString() : 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estimated Revenue:</span>
                    <p className="font-medium">${matter.revenue?.toLocaleString() || 'TBD'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Documents</span>
                    <span className="font-medium">{mockMatterDocuments.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Tasks</span>
                    <span className="font-medium">
                      {mockMatterTasks.filter(t => t.status !== 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Notes</span>
                    <span className="font-medium">{mockMatterNotes.length}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Team Members</h3>
                <div className="space-y-2">
                  {['Michael Chen', 'Lisa Park', 'David Kim'].map((member) => (
                    <div key={member} className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-xs">
                          {member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Mobile/Tablet overlay for right sidebar */}
        {rightSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden"
            onClick={() => setRightSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}