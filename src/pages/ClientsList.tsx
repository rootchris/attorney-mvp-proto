import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Plus,
  MapPin,
  Building2,
  X
} from "lucide-react";

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
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [listFilter, setListFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");

  // Get unique lists and tags for filters
  const allLists = Array.from(new Set(mockClients.flatMap(c => c.lists)));
  const allTags = Array.from(new Set(mockClients.flatMap(c => c.tags)));

  // Filter and sort clients
  const filteredClients = mockClients.filter(client => {
    // Search filter
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    // List filter
    const matchesList = listFilter === "all" || client.lists.includes(listFilter);
    
    // Tag filter
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

  const activeFiltersCount = [
    statusFilter !== "all",
    listFilter !== "all",
    tagFilter !== "all"
  ].filter(Boolean).length;

  const clearFilters = () => {
    setStatusFilter("all");
    setListFilter("all");
    setTagFilter("all");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-card px-4 md:px-6 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Clients</h1>
            <Button onClick={() => navigate('/client-intake')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name, company, or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
              </SelectContent>
            </Select>

            <Select value={listFilter} onValueChange={setListFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
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
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
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
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
              </span>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-3 h-3 mr-1" />
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Clients List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredClients.length} of {mockClients.length} clients
        </div>

        <div className="grid gap-4">
          {filteredClients.map((client) => (
            <Card 
              key={client.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/client/${client.id}`)}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Avatar and Basic Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="w-12 h-12 md:w-16 md:h-16">
                      <AvatarImage src={client.avatar} alt={client.name} />
                      <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-semibold text-lg">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">{client.title}</p>
                        </div>
                        <Badge variant={client.status === "client" ? "default" : "secondary"}>
                          {client.status === "client" ? "Client" : "Prospect"}
                        </Badge>
                      </div>

                      <div className="space-y-2 mt-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span>{client.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{client.location}</span>
                        </div>
                      </div>

                      {/* Tags and Lists */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {client.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {client.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{client.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex md:flex-col gap-4 md:gap-2 text-sm pt-2 md:pt-0 md:text-right md:min-w-[120px]">
                    <div>
                      <div className="text-muted-foreground">Matters</div>
                      <div className="font-semibold">{client.mattersCount}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Added</div>
                      <div className="font-semibold">
                        {new Date(client.dateAdded).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No clients found matching your filters.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
