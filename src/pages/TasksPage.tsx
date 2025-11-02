import { useState } from 'react';
import { Plus, MoreVertical, List as ListIcon, LayoutGrid, Filter, Search, Calendar, User, MessageSquare, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockTasks } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { differenceInDays } from 'date-fns';

type ViewMode = 'kanban' | 'list';
type FilterMode = 'all' | 'client' | 'matter';

interface TaskStage {
  id: string;
  title: string;
  color: string;
}

const defaultStages: TaskStage[] = [
  { id: 'pending', title: 'Backlog', color: 'bg-gray-200' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-blue-200' },
  { id: 'overdue', title: 'Needs Attention', color: 'bg-red-200' },
  { id: 'completed', title: 'Completed', color: 'bg-green-200' }
];

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stages, setStages] = useState<TaskStage[]>(defaultStages);
  const [newStageName, setNewStageName] = useState('');

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
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    return differenceInDays(new Date(dueDate), new Date());
  };

  const getDueDateColor = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return 'text-red-600';
    if (days <= 3) return 'text-orange-600';
    return 'text-muted-foreground';
  };

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter mode logic would be implemented based on actual data structure
    return matchesSearch;
  });

  const getTasksByStage = (stageId: string) => {
    return filteredTasks.filter(task => task.status === stageId);
  };

  const TaskCard = ({ task }: { task: typeof mockTasks[0] }) => {
    const daysUntil = getDaysUntilDue(task.dueDate);
    
    return (
      <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer group">
        <CardContent className="p-3">
          <div className="space-y-2">
            {/* Priority indicator */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className={cn("w-1 h-8 rounded-full", getPriorityColor(task.priority))} />
                <h4 className="text-sm font-medium leading-tight flex-1">{task.title}</h4>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Client name */}
            <p className="text-xs text-muted-foreground">{task.clientName}</p>

            {/* Task metadata */}
            <div className="flex items-center justify-between text-xs">
              <div className={cn("flex items-center gap-1", getDueDateColor(task.dueDate))}>
                <Calendar className="w-3 h-3" />
                <span>
                  {daysUntil < 0 ? `${Math.abs(daysUntil)}d overdue` : 
                   daysUntil === 0 ? 'Due today' :
                   `${daysUntil}d left`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageSquare className="w-3 h-3" />
                  <span>0</span>
                </div>
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="text-[10px]">
                    {task.assignedTo.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Priority badge */}
            <Badge className={cn("text-xs capitalize", getTaskStatusColor(task.priority))}>
              {task.priority}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  const KanbanColumn = ({ stage }: { stage: TaskStage }) => {
    const tasks = getTasksByStage(stage.id);
    
    return (
      <div className="flex-shrink-0 w-80">
        <div className={cn("rounded-lg p-3", stage.color)}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm">{stage.title}</h3>
              <Badge variant="secondary" className="h-5 min-w-5 px-1.5">
                {tasks.length}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="w-3.5 h-3.5 mr-2" />
                  Rename Stage
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete Stage</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)] mt-3">
          <div className="space-y-0 pr-3">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-muted-foreground hover:bg-accent/50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add a task
            </Button>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Tasks</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage all tasks across matters and clients
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={filterMode} onValueChange={(value: FilterMode) => setFilterMode(value)}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="client">Client Tasks</SelectItem>
              <SelectItem value="matter">Matter Tasks</SelectItem>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Stage
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Stage</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Stage Name</label>
                  <Input 
                    placeholder="Enter stage name..." 
                    value={newStageName}
                    onChange={(e) => setNewStageName(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      if (newStageName.trim()) {
                        setStages([...stages, {
                          id: newStageName.toLowerCase().replace(/\s+/g, '_'),
                          title: newStageName,
                          color: 'bg-gray-200'
                        }]);
                        setNewStageName('');
                      }
                    }}
                  >
                    Add Stage
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-1 border rounded-md">
            <Button
              variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="rounded-r-none"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <ListIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'kanban' ? (
          <ScrollArea className="h-full">
            <div className="flex gap-4 p-6">
              {stages.map(stage => (
                <KanbanColumn key={stage.id} stage={stage} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="p-6">
            <div className="space-y-2">
              {filteredTasks.map(task => (
                <Card key={task.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-1 h-12 rounded-full", getPriorityColor(task.priority))} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <Badge className={getTaskStatusColor(task.status)}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span>{task.clientName}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {task.assignedTo}
                          </div>
                        </div>
                      </div>

                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {task.assignedTo.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
