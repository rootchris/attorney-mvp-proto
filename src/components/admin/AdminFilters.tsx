import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Calendar, User, DollarSign } from "lucide-react";
import { useState } from "react";

interface AdminFiltersProps {
  onFiltersChange: (filters: AdminFilterState) => void;
}

export interface AdminFilterState {
  search: string;
  attorney: string;
  dateRange: string;
  status: string;
  priority: string;
}

export function AdminFilters({ onFiltersChange }: AdminFiltersProps) {
  const [filters, setFilters] = useState<AdminFilterState>({
    search: '',
    attorney: '',
    dateRange: '',
    status: '',
    priority: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof AdminFilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      attorney: '',
      dateRange: '',
      status: '',
      priority: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search clients, matters, tasks..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Attorney
                </label>
                <Select value={filters.attorney} onValueChange={(value) => updateFilter('attorney', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All attorneys" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All attorneys</SelectItem>
                    <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                    <SelectItem value="Jennifer Liu">Jennifer Liu</SelectItem>
                    <SelectItem value="Robert Anderson">Robert Anderson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date Range
                </label>
                <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All time</SelectItem>
                    <SelectItem value="last-7">Last 7 days</SelectItem>
                    <SelectItem value="last-30">Last 30 days</SelectItem>
                    <SelectItem value="last-90">Last 90 days</SelectItem>
                    <SelectItem value="this-year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="signed">Signed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={filters.priority} onValueChange={(value) => updateFilter('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <button onClick={() => updateFilter('search', '')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.attorney && (
            <Badge variant="secondary" className="gap-1">
              Attorney: {filters.attorney}
              <button onClick={() => updateFilter('attorney', '')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.dateRange && (
            <Badge variant="secondary" className="gap-1">
              Date: {filters.dateRange}
              <button onClick={() => updateFilter('dateRange', '')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <button onClick={() => updateFilter('status', '')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.priority && (
            <Badge variant="secondary" className="gap-1">
              Priority: {filters.priority}
              <button onClick={() => updateFilter('priority', '')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}