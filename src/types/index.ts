export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed_won' | 'closed_lost';

export type AgentStatus = 'idle' | 'running' | 'completed' | 'error';

export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  source: 'website' | 'email' | 'linkedin' | 'referral' | 'ads';
  status: LeadStatus;
  assignedTo: string;
  value: number;
  createdAt: string;
  lastContact: string;
  industry: string;
  region: string;
  score: number;
  tags: string[];
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  status: 'customer' | 'prospect' | 'churned';
  lastInteraction: string;
  totalDeals: number;
  avatarColor: string;
}

export interface AgentRun {
  id: string;
  agentName: string;
  agentType: 'lead_assignment' | 'auto_response' | 'follow_up' | 'data_org' | 'pipeline_tracking';
  status: AgentStatus;
  startedAt: string;
  completedAt?: string;
  message: string;
  affectedRecords: number;
  details: string[];
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: TaskStatus;
  lead: string;
  assignedTo: string;
  agentGenerated: boolean;
}

export interface PipelineStage {
  id: string;
  name: string;
  count: number;
  value: number;
  color: string;
}

export interface SalesRep {
  id: string;
  name: string;
  avatar: string;
  leads: number;
  closed: number;
  revenue: number;
  region: string;
}
