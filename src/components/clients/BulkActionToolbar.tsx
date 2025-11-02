import { Button } from "@/components/ui/button";
import { X, Tag, List, TrendingUp, Download, Trash2 } from "lucide-react";

interface BulkActionToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onAddToList: () => void;
  onAddTags: () => void;
  onChangeStatus: () => void;
  onExport: () => void;
  onDelete: () => void;
}

export function BulkActionToolbar({
  selectedCount,
  onClearSelection,
  onAddToList,
  onAddTags,
  onChangeStatus,
  onExport,
  onDelete,
}: BulkActionToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-primary text-primary-foreground rounded-lg shadow-lg border px-6 py-3 flex items-center gap-4">
        <span className="font-medium">
          {selectedCount} client{selectedCount > 1 ? "s" : ""} selected
        </span>
        
        <div className="h-6 w-px bg-primary-foreground/20" />
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddToList}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <List className="h-4 w-4" />
            Add to List
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddTags}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Tag className="h-4 w-4" />
            Tag
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onChangeStatus}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <TrendingUp className="h-4 w-4" />
            Status
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onExport}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
        
        <div className="h-6 w-px bg-primary-foreground/20" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
