import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Tag, Calendar, DollarSign, Clock, ChevronDown, X, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { mockMatters, mockClients } from "@/data/mockData";
import { BulkActionToolbar } from "@/components/clients/BulkActionToolbar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { formatDistanceToNow, differenceInDays } from "date-fns";

const MattersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMatters, setSelectedMatters] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    workflowStage: "all",
    type: "all",
    sortBy: "dueDate"
  });

  const getClientForMatter = (clientId: string) => {
    return mockClients.find(c => c.id === clientId);
  };

  const getWorkflowStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      prospect: "bg-gray-500",
      consult: "bg-blue-500",
      client_ready_for_draft: "bg-yellow-500",
      drafting: "bg-orange-500",
      binder_creation: "bg-purple-500",
      sign_ready: "bg-green-500",
      signed: "bg-emerald-500",
      funding: "bg-teal-500",
      reengage: "bg-pink-500"
    };
    return colors[stage] || "bg-gray-500";
  };

  const getWorkflowStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      prospect: "Prospect",
      consult: "Consultation",
      client_ready_for_draft: "Ready for Draft",
      drafting: "Drafting",
      binder_creation: "Binder Creation",
      sign_ready: "Sign Ready",
      signed: "Signed",
      funding: "Funding",
      reengage: "Re-engage"
    };
    return labels[stage] || stage;
  };

  const getDaysUntilDue = (dueDate?: string) => {
    if (!dueDate) return null;
    const days = differenceInDays(new Date(dueDate), new Date());
    return days;
  };

  const getDueDateColor = (dueDate?: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days === null) return "text-muted-foreground";
    if (days < 0) return "text-destructive";
    if (days <= 3) return "text-orange-500";
    if (days <= 7) return "text-yellow-600";
    return "text-muted-foreground";
  };

  const formatDueDate = (dueDate?: string) => {
    if (!dueDate) return "No due date";
    const days = getDaysUntilDue(dueDate);
    if (days === null) return "No due date";
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days left`;
  };

  const filteredMatters = mockMatters.filter(matter => {
    const matchesSearch = matter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         matter.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = filters.workflowStage === "all" || matter.workflowStage === filters.workflowStage;
    const matchesType = filters.type === "all" || matter.type === filters.type;
    return matchesSearch && matchesStage && matchesType;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMatters(new Set(filteredMatters.map(m => m.id)));
    } else {
      setSelectedMatters(new Set());
    }
  };

  const handleSelectMatter = (matterId: string, checked: boolean) => {
    const newSelected = new Set(selectedMatters);
    if (checked) {
      newSelected.add(matterId);
    } else {
      newSelected.delete(matterId);
    }
    setSelectedMatters(newSelected);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== "all" && v !== "dueDate").length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Matters</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and track all legal matters
            </p>
          </div>
          <Button asChild>
            <Link to="/client-intake">
              <Plus className="w-4 h-4 mr-2" />
              New Matter
            </Link>
          </Button>
        </div>

        {/* Search and View Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search matters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1">
                    {activeFiltersCount}
                  </Badge>
                )}
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>

          <div className="flex items-center gap-1 border rounded-md">
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-r-none"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "card" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("card")}
              className="rounded-l-none"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Collapsible Filters */}
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CollapsibleContent className="mt-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Select value={filters.workflowStage} onValueChange={(value) => setFilters(prev => ({ ...prev, workflowStage: value }))}>
                <SelectTrigger className="w-[200px] bg-background">
                  <SelectValue placeholder="Workflow Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="consult">Consultation</SelectItem>
                  <SelectItem value="client_ready_for_draft">Ready for Draft</SelectItem>
                  <SelectItem value="drafting">Drafting</SelectItem>
                  <SelectItem value="binder_creation">Binder Creation</SelectItem>
                  <SelectItem value="sign_ready">Sign Ready</SelectItem>
                  <SelectItem value="signed">Signed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="w-[200px] bg-background">
                  <SelectValue placeholder="Matter Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Trust">Trust</SelectItem>
                  <SelectItem value="Will">Will</SelectItem>
                  <SelectItem value="Estate Planning">Estate Planning</SelectItem>
                  <SelectItem value="Business Planning">Business Planning</SelectItem>
                  <SelectItem value="Asset Protection">Asset Protection</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                <SelectTrigger className="w-[200px] bg-background">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="title">Matter Name</SelectItem>
                </SelectContent>
              </Select>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({ workflowStage: "all", type: "all", sortBy: "dueDate" })}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear filters
                </Button>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {viewMode === "table" ? (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedMatters.size === filteredMatters.length && filteredMatters.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[280px]">Matter</TableHead>
                  <TableHead className="w-[200px]">Client</TableHead>
                  <TableHead className="w-[140px]">Type</TableHead>
                  <TableHead className="w-[160px]">Status</TableHead>
                  <TableHead className="w-[120px]">Revenue</TableHead>
                  <TableHead className="w-[140px]">Created</TableHead>
                  <TableHead className="w-[140px]">Due Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatters.map((matter) => {
                  const client = getClientForMatter(matter.clientId);
                  const isSelected = selectedMatters.has(matter.id);
                  return (
                    <TableRow
                      key={matter.id}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-primary/5 border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectMatter(matter.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/matter/${matter.id}`} className="hover:underline font-medium">
                          {matter.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {client && (
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src="" />
                              <AvatarFallback className="text-xs">
                                {client.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{client.name}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{matter.type}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gap-2">
                          <div className={`w-2 h-2 rounded-full ${getWorkflowStageColor(matter.workflowStage)}`}></div>
                          {getWorkflowStageLabel(matter.workflowStage)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <DollarSign className="w-3 h-3" />
                          {matter.revenue?.toLocaleString() || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(matter.createdAt), { addSuffix: true })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 text-sm font-medium ${getDueDateColor(matter.dueDate)}`}>
                          <Clock className="w-3 h-3" />
                          {formatDueDate(matter.dueDate)}
                        </div>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/matter/${matter.id}`} className="flex items-center">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Matter
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Tag className="w-4 h-4 mr-2" />
                              Add Tag
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatters.map((matter) => {
              const client = getClientForMatter(matter.clientId);
              const isSelected = selectedMatters.has(matter.id);
              return (
                <Card
                  key={matter.id}
                  className={`transition-all hover:shadow-md ${
                    isSelected ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectMatter(matter.id, checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/matter/${matter.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Matter
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <Link to={`/matter/${matter.id}`}>
                      <h3 className="font-semibold mb-1 hover:underline">{matter.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{matter.type}</p>
                    </Link>

                    {client && (
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-xs">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{client.name}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Badge variant="secondary" className="gap-2">
                        <div className={`w-2 h-2 rounded-full ${getWorkflowStageColor(matter.workflowStage)}`}></div>
                        {getWorkflowStageLabel(matter.workflowStage)}
                      </Badge>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 font-medium">
                          <DollarSign className="w-3 h-3" />
                          {matter.revenue?.toLocaleString() || "—"}
                        </div>
                        <div className={`flex items-center gap-1 ${getDueDateColor(matter.dueDate)}`}>
                          <Clock className="w-3 h-3" />
                          {formatDueDate(matter.dueDate)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedMatters.size > 0 && (
        <BulkActionToolbar
          selectedCount={selectedMatters.size}
          onClearSelection={() => setSelectedMatters(new Set())}
          onAddToList={() => console.log("Add to list")}
          onAddTags={() => console.log("Add tags")}
          onChangeStatus={() => console.log("Change status")}
          onExport={() => console.log("Export")}
          onDelete={() => console.log("Delete")}
        />
      )}
    </div>
  );
};

export default MattersList;
