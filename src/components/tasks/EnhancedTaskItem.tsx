import { useState } from "react";
import { MoreVertical, Calendar, Trash2, Edit, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Task } from "@/types/legal";
import { cn } from "@/lib/utils";

interface EnhancedTaskItemProps {
  task: Task;
  onComplete?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onClick?: (taskId: string) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-orange-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-muted";
  }
};

const getDueDateDisplay = (dueDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      text: `${Math.abs(diffDays)}d overdue`,
      className: "text-red-600 font-medium",
    };
  } else if (diffDays === 0) {
    return {
      text: "Due today",
      className: "text-orange-600 font-medium",
    };
  } else if (diffDays === 1) {
    return {
      text: "Due tomorrow",
      className: "text-orange-500",
    };
  } else if (diffDays <= 3) {
    return {
      text: `${diffDays}d left`,
      className: "text-orange-500",
    };
  } else {
    return {
      text: `${diffDays}d left`,
      className: "text-muted-foreground",
    };
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function EnhancedTaskItem({
  task,
  onComplete,
  onEdit,
  onDelete,
  onClick,
}: EnhancedTaskItemProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const dueDateInfo = getDueDateDisplay(task.dueDate);
  const isCompleted = task.status === "completed";

  const handleComplete = async (checked: boolean) => {
    if (checked && onComplete) {
      setIsCompleting(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      onComplete(task.id);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-start gap-2 p-1.5 border rounded-lg transition-all hover:bg-muted/30 cursor-pointer",
        isCompleting && "animate-fade-out opacity-0",
        isCompleted && "opacity-60"
      )}
      onClick={() => onClick?.(task.id)}
    >
      {/* Priority Bar */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 rounded-l-lg",
          getPriorityColor(task.priority)
        )}
      />

      {/* Checkbox */}
      <div className="flex-shrink-0 mt-0.5 ml-2" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={isCompleted}
          onCheckedChange={handleComplete}
          className="h-3.5 w-3.5"
        />
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-medium text-sm truncate",
            isCompleted && "line-through"
          )}
        >
          {task.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {task.clientName}
        </p>

        {/* Bottom Row - Avatar and Due Date */}
        <div className="flex items-center gap-2 mt-1">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-4 w-4 cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-[10px] bg-primary/10">
                    {getInitials(task.assignedTo)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {task.assignedTo}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className={cn("text-xs", dueDateInfo.className)}>
              {dueDateInfo.text}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Menu */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onEdit?.(task.id)}>
              <Edit className="w-3.5 h-3.5 mr-2" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onComplete?.(task.id)}
              disabled={isCompleted}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
              Mark Complete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(task.id)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="w-3.5 h-3.5 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
