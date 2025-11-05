import { Badge } from "@/components/ui/badge";
import { PipelineStage, WorkflowStage, TaskStatus } from '@/types/legal';

interface StatusBadgeProps {
  status: PipelineStage | WorkflowStage | TaskStatus;
  type: 'pipeline' | 'workflow' | 'task';
}

const getStatusConfig = (status: string, type: string) => {
  const configs = {
    pipeline: {
      new_lead: { label: 'New Lead', variant: 'status-badge-scheduled' },
      contacted: { label: 'Contacted', variant: 'status-badge-complete' },
      scheduled: { label: 'Consult Scheduled', variant: 'status-badge-scheduled' },
      complete: { label: 'Consult Complete', variant: 'status-badge-complete' },
      signed: { label: 'Retainer Signed', variant: 'status-badge-signed' },
      lost: { label: 'Lost', variant: 'status-badge-lost' },
      ready_for_review: { label: 'Ready for Review', variant: 'status-badge-review' }
    },
    workflow: {
      intake: { label: 'Intake', variant: 'status-badge-scheduled' },
      drafting: { label: 'Drafting', variant: 'status-badge-complete' },
      review: { label: 'Review', variant: 'status-badge-complete' },
      signing: { label: 'Signing', variant: 'status-badge-signed' },
      funding: { label: 'Funding', variant: 'status-badge-signed' }
    },
    task: {
      pending: { label: 'Pending', variant: 'status-badge-scheduled' },
      in_progress: { label: 'In Progress', variant: 'status-badge-complete' },
      completed: { label: 'Completed', variant: 'status-badge-signed' },
      overdue: { label: 'Overdue', variant: 'status-badge-overdue' }
    }
  };

  return configs[type as keyof typeof configs]?.[status] || 
         { label: status, variant: 'status-badge-scheduled' };
};

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const config = getStatusConfig(status, type);
  
  return (
    <span className={`status-badge ${config.variant}`}>
      {config.label}
    </span>
  );
}