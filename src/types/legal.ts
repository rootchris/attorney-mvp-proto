export type PipelineStage = 'scheduled' | 'complete' | 'signed' | 'lost';
export type WorkflowStage = 'prospect' | 'consult' | 'client_ready_for_draft' | 'drafting' | 'binder_creation' | 'sign_ready' | 'signed' | 'funding' | 'reengage';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralSource: string;
  pipelineStage: PipelineStage;
  consultDate?: string;
  signingDate?: string;
  intakeFormSent?: boolean;
  intakeFormReceived?: boolean;
  notes: string;
  createdAt: string;
  assignedAttorney: string;
}

export interface Matter {
  id: string;
  clientId: string;
  title: string;
  type: string;
  workflowStage: WorkflowStage;
  createdAt: string;
  dueDate?: string;
  revenue?: number;
  progress?: number;
  documents: Document[];
}

export interface Task {
  id: string;
  matterId: string;
  clientName: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

export interface Document {
  id: string;
  matterId: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
  url: string;
  isWealthCounselDoc?: boolean;
  clientVisible?: boolean;
}

export interface Note {
  id: string;
  matterId: string;
  content: string;
  createdBy: string;
  createdAt: string;
  taggedColleagues?: string[];
}

export interface Attorney {
  id: string;
  name: string;
  email: string;
  consultCount: number;
  conversionRate: number;
  revenue: number;
  activeMatters: number;
}