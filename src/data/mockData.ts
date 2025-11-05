import { Client, Matter, Task, Attorney, Document } from '@/types/legal';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    referralSource: 'Referral from existing client',
    pipelineStage: 'ready_for_review',
    consultDate: '2024-02-15',
    intakeFormSent: true,
    intakeFormReceived: true,
    notes: 'Complex family trust with multiple beneficiaries. Owns significant real estate portfolio.',
    createdAt: '2024-02-10',
    lastActionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 4500
  },
  {
    id: '22',
    name: 'Angela Thompson',
    email: 'angela.thompson@email.com',
    phone: '(555) 234-9876',
    referralSource: 'Facebook',
    pipelineStage: 'new_lead',
    intakeFormSent: false,
    intakeFormReceived: false,
    notes: 'Interested in basic will. Just filled out contact form today.',
    createdAt: new Date(Date.now()).toISOString().split('T')[0],
    lastActionDate: new Date(Date.now()).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 1800
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 345-6789',
    referralSource: 'Attorney referral network',
    pipelineStage: 'scheduled',
    consultDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    intakeFormSent: false,
    intakeFormReceived: false,
    notes: 'High-net-worth individual seeking comprehensive estate planning.',
    createdAt: '2024-03-05',
    lastActionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 5000
  },
  {
    id: '23',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@email.com',
    phone: '(555) 345-8765',
    referralSource: 'Google Ads',
    pipelineStage: 'contacted',
    intakeFormSent: false,
    intakeFormReceived: false,
    notes: 'Called to discuss trust options. Follow-up scheduled for next week.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastActionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 3200
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '(555) 678-9012',
    referralSource: 'LinkedIn',
    pipelineStage: 'signed',
    consultDate: '2024-03-10',
    signingDate: '2024-03-22',
    intakeFormSent: true,
    intakeFormReceived: true,
    notes: 'Revocable living trust with healthcare directives.',
    createdAt: '2024-03-08',
    lastActionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 3800
  },
  {
    id: '25',
    name: 'Gregory Walsh',
    email: 'gregory.walsh@email.com',
    phone: '(555) 567-6543',
    referralSource: 'LinkedIn',
    pipelineStage: 'complete',
    consultDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    intakeFormSent: true,
    intakeFormReceived: true,
    notes: 'Complex trust for high-net-worth individual. Waiting on financial documents from client.',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastActionDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 4800
  },
  {
    id: '27',
    name: 'Benjamin Carter',
    email: 'benjamin.carter@email.com',
    phone: '(555) 789-4321',
    referralSource: 'Website contact form',
    pipelineStage: 'contacted',
    intakeFormSent: false,
    intakeFormReceived: false,
    notes: 'Initial contact made. Requested information packet. Waiting for response.',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastActionDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 2500
  },
  {
    id: '28',
    name: 'Olivia Henderson',
    email: 'olivia.henderson@email.com',
    phone: '(555) 890-3210',
    referralSource: 'Google search',
    pipelineStage: 'new_lead',
    intakeFormSent: false,
    intakeFormReceived: false,
    notes: 'Website inquiry about guardianship planning. Needs initial contact.',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    lastActionDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 1500
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
    lastActionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Jennifer Liu',
    estimatedRevenue: 2200
  },
  {
    id: '29',
    name: 'William Foster',
    email: 'william.foster@email.com',
    phone: '(555) 901-2109',
    referralSource: 'Word of mouth',
    pipelineStage: 'scheduled',
    consultDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    intakeFormSent: true,
    intakeFormReceived: true,
    notes: 'Hot lead - consultation in 2 days. All intake forms completed. Ready to discuss revocable trust.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastActionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 4200
  },
  {
    id: '30',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@email.com',
    phone: '(555) 012-1098',
    referralSource: 'Referral from existing client',
    pipelineStage: 'complete',
    consultDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    intakeFormSent: true,
    intakeFormReceived: false,
    notes: 'Consultation complete but no follow-up from client in 4 weeks. Needs attention - may be losing interest.',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastActionDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedAttorney: 'Michael Chen',
    estimatedRevenue: 3600
  }
];

export const mockMatters: Matter[] = [
  {
    id: '1',
    clientId: '1',
    title: 'Johnson Family Trust',
    type: 'Trust',
    workflowStage: 'drafting',
    createdAt: '2025-09-15',
    dueDate: '2025-10-25',
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
    createdAt: '2025-09-20',
    dueDate: '2025-11-05',
    revenue: 12000,
    progress: 30,
    documents: []
  },
  {
    id: '3',
    clientId: '7',
    title: 'Rodriguez Asset Protection Trust',
    type: 'Asset Protection',
    workflowStage: 'client_ready_for_draft',
    createdAt: '2025-10-01',
    dueDate: '2025-11-15',
    revenue: 15000,
    progress: 20,
    documents: []
  },
  {
    id: '4',
    clientId: '9',
    title: 'Parker Charitable Remainder Trust',
    type: 'Charitable Trust',
    workflowStage: 'binder_creation',
    createdAt: '2025-09-25',
    dueDate: '2025-11-08',
    revenue: 18000,
    progress: 85,
    documents: []
  },
  {
    id: '5',
    clientId: '11',
    title: 'Wilson Guardianship Planning',
    type: 'Estate Planning',
    workflowStage: 'drafting',
    createdAt: '2025-10-05',
    dueDate: '2025-11-20',
    revenue: 6500,
    progress: 40,
    documents: []
  },
  {
    id: '6',
    clientId: '13',
    title: 'Green Blended Family Trust',
    type: 'Trust',
    workflowStage: 'sign_ready',
    createdAt: '2025-09-18',
    dueDate: '2025-10-26',
    revenue: 9500,
    progress: 90,
    documents: []
  },
  {
    id: '7',
    clientId: '15',
    title: 'White Special Needs Trust',
    type: 'Special Needs Trust',
    workflowStage: 'drafting',
    createdAt: '2025-10-10',
    dueDate: '2025-11-25',
    revenue: 11000,
    progress: 55,
    documents: []
  },
  {
    id: '8',
    clientId: '17',
    title: 'Miller Estate Plan Update',
    type: 'Estate Planning',
    workflowStage: 'client_ready_for_draft',
    createdAt: '2025-10-12',
    dueDate: '2025-12-01',
    revenue: 7200,
    progress: 25,
    documents: []
  },
  {
    id: '9',
    clientId: '19',
    title: 'Taylor Charitable Lead Trust',
    type: 'Charitable Trust',
    workflowStage: 'binder_creation',
    createdAt: '2025-09-28',
    dueDate: '2025-11-10',
    revenue: 16500,
    progress: 80,
    documents: []
  },
  {
    id: '10',
    clientId: '1',
    title: 'Johnson Pour-Over Will',
    type: 'Will',
    workflowStage: 'drafting',
    createdAt: '2025-10-08',
    dueDate: '2025-11-18',
    revenue: 3500,
    progress: 60,
    documents: []
  },
  {
    id: '11',
    clientId: '7',
    title: 'Rodriguez ILIT Setup',
    type: 'Insurance Trust',
    workflowStage: 'client_ready_for_draft',
    createdAt: '2025-10-15',
    dueDate: '2025-11-30',
    revenue: 8800,
    progress: 15,
    documents: []
  },
  {
    id: '12',
    clientId: '11',
    title: 'Wilson Healthcare Directives',
    type: 'Healthcare Planning',
    workflowStage: 'sign_ready',
    createdAt: '2025-10-01',
    dueDate: '2025-11-12',
    revenue: 2200,
    progress: 95,
    documents: []
  }
];

export const mockTasks: Task[] = [
  // Overdue tasks
  {
    id: '1',
    matterId: '1',
    clientName: 'Sarah Johnson',
    title: 'Review trust documents',
    description: 'Complete final review of Johnson Family Trust documents before client signing',
    assignedTo: 'Michael Chen',
    assignedBy: 'Jennifer Liu',
    status: 'in_progress',
    priority: 'high',
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-05'
  },
  {
    id: '4',
    matterId: '2',
    clientName: 'Robert Martinez',
    title: 'Client intake review',
    description: 'Review and organize client intake documents - urgent follow-up needed',
    assignedTo: 'Michael Chen',
    assignedBy: 'Jennifer Liu',
    status: 'pending',
    priority: 'high',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-01'
  },
  {
    id: '10',
    matterId: '6',
    clientName: 'James Wilson',
    title: 'File trust with county recorder',
    description: 'Submit trust documentation to county recorder office',
    assignedTo: 'Michael Chen',
    assignedBy: 'Robert Anderson',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-10'
  },
  
  // Due today
  {
    id: '5',
    matterId: '3',
    clientName: 'Emily Davis',
    title: 'Prepare consultation materials',
    description: 'Gather all necessary materials and documents for upcoming client consultation',
    assignedTo: 'Michael Chen',
    assignedBy: 'Michael Chen',
    status: 'in_progress',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: '2024-03-12'
  },
  {
    id: '11',
    matterId: '1',
    clientName: 'Sarah Johnson',
    title: 'Schedule signing appointment',
    description: 'Coordinate with client for final document signing',
    assignedTo: 'Michael Chen',
    assignedBy: 'Jennifer Liu',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: '2024-03-11'
  },
  
  // Due in 1-3 days
  {
    id: '6',
    matterId: '4',
    clientName: 'Angela Thompson',
    title: 'Draft asset protection plan',
    description: 'Create comprehensive asset protection strategy document',
    assignedTo: 'Michael Chen',
    assignedBy: 'Robert Anderson',
    status: 'pending',
    priority: 'high',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-08'
  },
  {
    id: '7',
    matterId: '5',
    clientName: 'Marcus Johnson',
    title: 'Review beneficiary designations',
    description: 'Verify all beneficiary designations match client wishes',
    assignedTo: 'Michael Chen',
    assignedBy: 'Jennifer Liu',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-09'
  },
  {
    id: '8',
    matterId: '3',
    clientName: 'Emily Davis',
    title: 'Update healthcare directives',
    description: 'Revise healthcare directive documents based on recent changes',
    assignedTo: 'Michael Chen',
    assignedBy: 'Michael Chen',
    status: 'in_progress',
    priority: 'low',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-07'
  },
  
  // Due in 4-7 days
  {
    id: '9',
    matterId: '2',
    clientName: 'Robert Martinez',
    title: 'Prepare estate tax analysis',
    description: 'Complete comprehensive estate tax planning analysis',
    assignedTo: 'Michael Chen',
    assignedBy: 'Robert Anderson',
    status: 'pending',
    priority: 'high',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-06'
  },
  {
    id: '12',
    matterId: '7',
    clientName: 'Gregory Walsh',
    title: 'Research charitable trust options',
    description: 'Investigate best charitable remainder trust structures for client',
    assignedTo: 'Michael Chen',
    assignedBy: 'Jennifer Liu',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-11'
  },
  {
    id: '13',
    matterId: '8',
    clientName: 'Benjamin Carter',
    title: 'Coordinate with financial advisor',
    description: 'Schedule meeting with client financial advisor to align estate plan',
    assignedTo: 'Michael Chen',
    assignedBy: 'Michael Chen',
    status: 'pending',
    priority: 'low',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-10'
  },
  
  // Due in 8+ days
  {
    id: '14',
    matterId: '9',
    clientName: 'Olivia Henderson',
    title: 'Draft power of attorney documents',
    description: 'Prepare durable power of attorney for healthcare and finances',
    assignedTo: 'Michael Chen',
    assignedBy: 'Robert Anderson',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-09'
  },
  {
    id: '15',
    matterId: '10',
    clientName: 'William Foster',
    title: 'Review business succession plan',
    description: 'Analyze current business succession strategy and recommend updates',
    assignedTo: 'Michael Chen',
    assignedBy: 'Jennifer Liu',
    status: 'pending',
    priority: 'high',
    dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-08'
  },
  {
    id: '16',
    matterId: '1',
    clientName: 'Sarah Johnson',
    title: 'Finalize trust funding checklist',
    description: 'Create comprehensive checklist for transferring assets into trust',
    assignedTo: 'Michael Chen',
    assignedBy: 'Michael Chen',
    status: 'pending',
    priority: 'low',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: '2024-03-11'
  },
  
  // Completed tasks (should be filtered out)
  {
    id: '3',
    matterId: '1',
    clientName: 'Sarah Johnson',
    title: 'Prepare signing binder',
    description: 'Organize all documents for client signing appointment',
    assignedTo: 'Michael Chen',
    assignedBy: 'Jennifer Liu',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-03-10',
    createdAt: '2024-03-03',
    completedAt: '2024-03-09'
  },
  {
    id: '2',
    matterId: '2',
    clientName: 'Robert Martinez',
    title: 'Draft will document',
    description: 'Prepare will document based on client consultation notes',
    assignedTo: 'Michael Chen',
    assignedBy: 'Jennifer Liu',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-03-18',
    createdAt: '2024-03-08',
    completedAt: '2024-03-17'
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