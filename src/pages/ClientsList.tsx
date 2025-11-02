import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  SlidersHorizontal,
  X,
  LayoutGrid,
  LayoutList,
  Eye,
  Edit,
  List as ListIcon,
  ArrowUpDown,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BulkActionToolbar } from "@/components/clients/BulkActionToolbar";
import { toast } from "sonner";

interface Client {
  id: string;
  name: string;
  title: string;
  avatar: string;
  company: string;
  location: string;
  email: string;
  status: "prospect" | "client";
  dateAdded: string;
  mattersCount: number;
  tags: string[];
  lists: string[];
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Spencer Dennis",
    title: "Strategist, Sports Tech",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "CoachNow",
    location: "Los Angeles, CA",
    email: "spencer@coachnow.com",
    status: "client",
    dateAdded: "2025-01-15",
    mattersCount: 2,
    tags: ["Founders", "Sports Tech", "SaaS"],
    lists: ["Founders", "Startups"]
  },
  {
    id: "2",
    name: "Jennifer Martinez",
    title: "CEO, FinTech Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    company: "PayFlow",
    location: "San Francisco, CA",
    email: "jennifer@payflow.com",
    status: "client",
    dateAdded: "2025-02-10",
    mattersCount: 3,
    tags: ["FinTech", "Series A"],
    lists: ["Founders", "High Priority"]
  },
  {
    id: "3",
    name: "Robert Chen",
    title: "Founder & CTO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    company: "DataViz Inc",
    location: "Seattle, WA",
    email: "robert@dataviz.com",
    status: "prospect",
    dateAdded: "2025-03-05",
    mattersCount: 1,
    tags: ["Tech", "Data"],
    lists: ["Prospects"]
  },
  {
    id: "4",
    name: "Sarah Thompson",
    title: "VP of Operations",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    company: "Healthcare Plus",
    location: "Boston, MA",
    email: "sarah@healthcareplus.com",
    status: "client",
    dateAdded: "2024-12-20",
    mattersCount: 4,
    tags: ["Healthcare", "Operations"],
    lists: ["Healthcare", "High Priority"]
  },
  {
    id: "5",
    name: "Michael Anderson",
    title: "Managing Partner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    company: "Anderson Ventures",
    location: "Austin, TX",
    email: "michael@andersonvc.com",
    status: "prospect",
    dateAdded: "2025-03-12",
    mattersCount: 0,
    tags: ["Venture Capital", "Investments"],
    lists: ["Prospects", "VCs"]
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    title: "Chief Marketing Officer",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    company: "BrandBoost",
    location: "New York, NY",
    email: "emily@brandboost.com",
    status: "client",
    dateAdded: "2025-01-28",
    mattersCount: 2,
    tags: ["Marketing", "Brand"],
    lists: ["Startups"]
  }
];

export default function ClientsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [listFilter, setListFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  const allLists = Array.from(new Set(mockClients.flatMap(c => c.lists)));
  const allTags = Array.from(new Set(mockClients.flatMap(c => c.tags)));

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesList = listFilter === "all" || client.lists.includes(listFilter);
    const matchesTag = tagFilter === "all" || client.tags.includes(tagFilter);
    
    return matchesSearch && matchesStatus && matchesList && matchesTag;
  }).sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case "date-asc":
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "matters-desc":
        return b.mattersCount - a.mattersCount;
      case "matters-asc":
        return a.mattersCount - b.mattersCount;
      default:
        return 0;
    }
  });

  const activeFiltersCount =
    (statusFilter !== "all" ? 1 : 0) +
    (listFilter !== "all" ? 1 : 0) +
    (tagFilter !== "all" ? 1 : 0);

  const clearFilters = () => {
    setStatusFilter("all");
    setListFilter("all");
    setTagFilter("all");
    setSearchQuery("");
  };

  const toggleSelectAll = () => {
    if (selectedClients.size === filteredClients.length) {
      setSelectedClients(new Set());
    } else {
      setSelectedClients(new Set(filteredClients.map((c) => c.id)));
    }
  };

  const toggleSelectClient = (clientId: string) => {
    const newSelected = new Set(selectedClients);
    if (newSelected.has(clientId)) {
      newSelected.delete(clientId);
    } else {
      newSelected.add(clientId);
    }
    setSelectedClients(newSelected);
  };

  const handleBulkAction = (action: string) => {
    toast.success(`${action} applied to ${selectedClients.size} client(s)`);
    setSelectedClients(new Set());
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none border-b bg-background p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground mt-1">
              {filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
            >
              {viewMode === "table" ? <LayoutGrid className="h-4 w-4" /> : <LayoutList className="h-4 w-4" />}
            </Button>
            <Button onClick={() => navigate('/client-intake')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="flex gap-2 items-center flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                </SelectContent>
              </Select>

              <Select value={listFilter} onValueChange={setListFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="List" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Lists</SelectItem>
                  {allLists.map(list => (
                    <SelectItem key={list} value={list}>{list}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="matters-desc">Most Matters</SelectItem>
                  <SelectItem value="matters-asc">Least Matters</SelectItem>
                </SelectContent>
              </Select>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {viewMode === "table" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedClients.size === filteredClients.length && filteredClients.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[250px]">
                  <Button variant="ghost" size="sm" className="h-8 -ml-3">
                    Client
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-center">Matters</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow
                  key={client.id}
                  className={`cursor-pointer group transition-colors ${
                    selectedClients.has(client.id) ? "bg-muted/50 border-l-4 border-l-primary" : ""
                  }`}
                  onClick={() => navigate(`/client/${client.id}`)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedClients.has(client.id)}
                      onCheckedChange={() => toggleSelectClient(client.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-xs text-muted-foreground">{client.title}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {client.company}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={client.status === "client" ? "default" : "secondary"}
                      className="rounded-full"
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {client.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {client.tags && client.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{client.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{client.mattersCount}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(client.dateAdded).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ListIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/client/${client.id}`)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Checkbox
                    checked={selectedClients.has(client.id)}
                    onCheckedChange={() => toggleSelectClient(client.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={client.avatar} />
                    <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">{client.company}</p>
                  </div>
                </div>
                <Badge
                  variant={client.status === "client" ? "default" : "secondary"}
                  className="mb-2"
                >
                  {client.status}
                </Badge>
                {client.tags && client.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {client.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No clients found</p>
          </div>
        )}
      </div>

      <BulkActionToolbar
        selectedCount={selectedClients.size}
        onClearSelection={() => setSelectedClients(new Set())}
        onAddToList={() => handleBulkAction("Add to List")}
        onAddTags={() => handleBulkAction("Add Tags")}
        onChangeStatus={() => handleBulkAction("Change Status")}
        onExport={() => handleBulkAction("Export")}
        onDelete={() => handleBulkAction("Delete")}
      />
    </div>
  );
}
