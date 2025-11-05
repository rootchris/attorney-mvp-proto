import { Task } from "@/types/legal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, AlertCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

interface TaskDetailDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "secondary";
    default:
      return "outline";
  }
};

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
}: TaskDetailDialogProps) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center gap-3">
            <StatusBadge status={task.status} type="task" />
            <Badge variant={getPriorityVariant(task.priority)}>
              {task.priority} priority
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Description
            </h3>
            <p className="text-sm text-muted-foreground">
              {task.description}
            </p>
          </div>

          {/* Client Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Client</h3>
              <p className="text-sm text-muted-foreground">{task.clientName}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Assigned To
              </h3>
              <p className="text-sm text-muted-foreground">{task.assignedTo}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Due Date
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Created</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Assigned By */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Delegated By</h3>
            <p className="text-sm text-muted-foreground">{task.assignedBy}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
