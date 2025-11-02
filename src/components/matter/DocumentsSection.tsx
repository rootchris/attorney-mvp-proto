import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Eye, 
  EyeOff, 
  FileText, 
  Folder as FolderIcon, 
  FolderPlus, 
  ChevronRight, 
  ChevronDown,
  MoreVertical,
  Tag,
  Filter,
  X,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Document, Folder } from '@/types/legal';
import { cn } from '@/lib/utils';

interface DocumentsSectionProps {
  documents: Document[];
  folders: Folder[];
}

export function DocumentsSection({ documents, folders }: DocumentsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderParent, setNewFolderParent] = useState<string>('');

  // Get all unique tags from documents
  const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags || [])));

  // Get all unique document types
  const allTypes = Array.from(new Set(documents.map(doc => doc.type)));

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const filterDocuments = (docs: Document[]) => {
    return docs.filter(doc => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        (doc.tags && doc.tags.some(tag => selectedTags.includes(tag)));

      // Type filter
      const matchesType = typeFilter === 'all' || doc.type === typeFilter;

      // Date filter
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const docDate = new Date(doc.uploadedAt);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - docDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case 'today':
            matchesDate = daysDiff === 0;
            break;
          case 'week':
            matchesDate = daysDiff <= 7;
            break;
          case 'month':
            matchesDate = daysDiff <= 30;
            break;
        }
      }

      return matchesSearch && matchesTags && matchesType && matchesDate;
    });
  };

  const getChildFolders = (parentId?: string) => {
    return folders.filter(f => f.parentFolderId === parentId);
  };

  const getDocumentsInFolder = (folderId?: string) => {
    return filterDocuments(documents.filter(doc => doc.folderId === folderId));
  };

  const renderDocument = (doc: Document) => (
    <Card key={doc.id} className="hover:shadow-sm transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          {/* Document Icon */}
          <div className="flex-shrink-0 w-9 h-9 rounded bg-muted flex items-center justify-center">
            <FileText className="w-4 h-4 text-muted-foreground" />
          </div>
          
          {/* Document Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold leading-tight">{doc.name}</h4>
              {doc.isWealthCounselDoc && (
                <div className="flex items-center gap-1">
                  <img 
                    src="/lovable-uploads/14b38707-140d-4b73-a1ec-440ea4ca4120.png" 
                    alt="Wealth Counsel" 
                    className="w-4 h-4 object-contain"
                  />
                  <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-800">
                    WC
                  </Badge>
                </div>
              )}
              {doc.tags && doc.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {doc.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              <span>{doc.type}</span>
              <span>•</span>
              <span>{formatFileSize(doc.size)}</span>
              <span>•</span>
              <span>{doc.uploadedBy}</span>
              <span>•</span>
              <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Document Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  {doc.clientVisible ? (
                    <Eye className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>
                  {doc.clientVisible 
                    ? "Visible to client" 
                    : "Not visible to client"
                  }
                </p>
              </TooltipContent>
            </Tooltip>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Download">
              <Download className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderFolder = (folder: Folder, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.id);
    const childFolders = getChildFolders(folder.id);
    const folderDocs = getDocumentsInFolder(folder.id);
    const hasContent = childFolders.length > 0 || folderDocs.length > 0;

    return (
      <div key={folder.id}>
        <Collapsible open={isExpanded} onOpenChange={() => toggleFolder(folder.id)}>
          <div 
            className={cn(
              "flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent/50 transition-colors group",
              level > 0 && "ml-6"
            )}
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                disabled={!hasContent}
              >
                {hasContent && (
                  isExpanded ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <FolderIcon className={cn("w-5 h-5", folder.color || "text-yellow-600")} />
            <span className="font-medium text-sm flex-1">{folder.name}</span>
            <span className="text-xs text-muted-foreground">
              {folderDocs.length + childFolders.length}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </Button>
          </div>
          
          <CollapsibleContent>
            <div className="space-y-1 mt-1">
              {/* Render child folders */}
              {childFolders.map(childFolder => renderFolder(childFolder, level + 1))}
              
              {/* Render documents in folder */}
              <div className={cn("space-y-2", level > 0 && "ml-6")}>
                {folderDocs.map(doc => renderDocument(doc))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  const rootFolders = getChildFolders(undefined);
  const rootDocuments = getDocumentsInFolder(undefined);
  const activeFilters = selectedTags.length + (dateFilter !== 'all' ? 1 : 0) + (typeFilter !== 'all' ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-semibold">Documents</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FolderPlus className="w-4 h-4 mr-2" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Folder Name</label>
                  <Input 
                    placeholder="Enter folder name..." 
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Parent Folder (Optional)</label>
                  <Select value={newFolderParent} onValueChange={setNewFolderParent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Root folder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="root">Root (No parent)</SelectItem>
                      {folders.map(folder => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Create Folder</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFilters > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1.5">
                {activeFilters}
              </Badge>
            )}
          </Button>
        </div>

        {showFilters && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium mb-2 block">Date</label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium mb-2 block">Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {allTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-medium mb-2 block">Tags</label>
                  <Select
                    value={selectedTags[0] || ''}
                    onValueChange={(value) => {
                      if (value && !selectedTags.includes(value)) {
                        setSelectedTags([...selectedTags, value]);
                      }
                    }}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select tags..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allTags.map(tag => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedTags.length > 0 || dateFilter !== 'all' || typeFilter !== 'all') && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                      />
                    </Badge>
                  ))}
                  {(dateFilter !== 'all' || typeFilter !== 'all') && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => {
                        setDateFilter('all');
                        setTypeFilter('all');
                        setSelectedTags([]);
                      }}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Folder Tree and Documents */}
      <ScrollArea className="h-[calc(100vh-32rem)]">
        <div className="space-y-2">
          {/* Render root folders */}
          {rootFolders.map(folder => renderFolder(folder))}
          
          {/* Render root documents */}
          {rootDocuments.map(doc => renderDocument(doc))}
          
          {/* Empty state */}
          {rootFolders.length === 0 && rootDocuments.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No documents found</p>
              <p className="text-sm mt-1">Upload your first document to get started</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
