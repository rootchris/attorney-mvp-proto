import { Client, Matter, Task, Attorney, Document } from '@/types/legal';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    referralSource: 'Referral from existing client',
    pipelineStage: 'signed',
    consultDate: '2024-02-15',
    signingDate: '2024-02-28',
    intakeFormSent: true,
    intakeFormReceived: true,
    notes: 'Complex family trust with multiple beneficiaries. Owns significant real estate portfolio.',
    createdAt: '2024-02-10',
    assignedAttorney: 'Michael Chen'
  },
  {
    id: '2',
    name: 'Robert Martinez',
    email: 'robert.martinez@email.com',
    phone: '(555) 234-5678',
    referralSource: 'Google search',
    pipelineStage: 'complete',
    consultDate: '2024-03-01',
    intakeFormSent: false,
    intakeFormReceived: false,
    notes: 'Simple will and power of attorney. First-time client, very detail-oriented.',
    createdAt: '2024-02-25',
    assignedAttorney: 'Michael Chen'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 345-6789',
    referralSource: 'Attorney referral network',
    pipelineStage: 'scheduled',
    consultDate: '2024-03-15',
    intakeFormSent: false,
    intakeFormReceived: false,
    notes: 'High-net-worth individual seeking comprehensive estate planning.',
    createdAt: '2024-03-05',
    assignedAttorney: 'Michael Chen'
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '(555) 456-7890',
    referralSource: 'Previous client',
    pipelineStage: 'lost',
    consultDate: '2024-02-20',
    intakeFormSent: true,
    intakeFormReceived: false,
    notes: 'Decided to work with a different firm due to pricing concerns.',
    createdAt: '2024-02-15',
    assignedAttorney: 'Jennifer Liu'
  },
  {
    id: '5',
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '(555) 567-8901',
    referralSource: 'Website contact form',
    pipelineStage: 'complete',
    consultDate: '2024-03-05',
    intakeFormSent: true,
    intakeFormReceived: true,
    notes: 'Business succession planning for family-owned restaurant chain.',
    createdAt: '2024-02-28',
    assignedAttorney: 'Michael Chen'
  }
];

export const mockMatters: Matter[] = [
  {
    id: '1',
    clientId: '1',
    title: 'Johnson Family Trust',
    type: 'Trust',
    workflowStage: 'review',
    createdAt: '2024-02-28',
    dueDate: '2024-03-15',
    revenue: 8500,
    progress: 75,
    documents: []
  },
  {
    id: '2',
    clientId: '5',
    title: 'Chen Business Succession Plan',
    type: 'Business Planning',
    workflowStage: 'drafting',
    createdAt: '2024-03-05',
    dueDate: '2024-03-25',
    revenue: 12000,
    progress: 30,
    documents: []
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    matterId: '1',
    clientName: 'Sarah Johnson',
    title: 'Review trust documents',
    description: 'Complete final review of Johnson Family Trust documents before client signing',
    assignedTo: 'Lisa Park',
    assignedBy: 'Michael Chen',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-03-12',
    createdAt: '2024-03-05'
  },
  {
    id: '2',
    matterId: '2',
    clientName: 'Robert Martinez',
    title: 'Draft will document',
    description: 'Prepare will document based on client consultation notes',
    assignedTo: 'David Kim',
    assignedBy: 'Michael Chen',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-03-18',
    createdAt: '2024-03-08'
  },
  {
    id: '3',
    matterId: '1',
    clientName: 'Sarah Johnson',
    title: 'Prepare signing binder',
    description: 'Organize all documents for client signing appointment',
    assignedTo: 'Lisa Park',
    assignedBy: 'Michael Chen',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-03-10',
    createdAt: '2024-03-03',
    completedAt: '2024-03-09'
  },
  {
    id: '4',
    matterId: '2',
    clientName: 'Robert Martinez',
    title: 'Client intake review',
    description: 'Review and organize client intake documents',
    assignedTo: 'David Kim',
    assignedBy: 'Michael Chen',
    status: 'overdue',
    priority: 'high',
    dueDate: '2024-03-05',
    createdAt: '2024-03-01'
  }
];

export const mockAttorneys: Attorney[] = [
  {
    id: '1',
    name: 'Michael Chen',
    email: 'mchen@firm.com',
    consultCount: 24,
    conversionRate: 75,
    revenue: 145000,
    activeMatters: 8
  },
  {
    id: '2',
    name: 'Jennifer Liu',
    email: 'jliu@firm.com',
    consultCount: 18,
    conversionRate: 83,
    revenue: 98000,
    activeMatters: 6
  },
  {
    id: '3',
    name: 'Robert Anderson',
    email: 'randerson@firm.com',
    consultCount: 31,
    conversionRate: 68,
    revenue: 187000,
    activeMatters: 12
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    matterId: '1',
    name: 'Johnson Family Trust - Draft v2.pdf',
    type: 'Trust Document',
    uploadedBy: 'Lisa Park',
    uploadedAt: '2024-03-08',
    size: 245760,
    url: '#'
  },
  {
    id: '2',
    matterId: '1',
    name: 'Property Deed Transfer.pdf',
    type: 'Real Estate Document',
    uploadedBy: 'Michael Chen',
    uploadedAt: '2024-03-06',
    size: 156890,
    url: '#'
  }
];