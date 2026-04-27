import type { Lead, Contact, AgentRun, Task, PipelineStage, SalesRep } from '../types';

export const salesReps: SalesRep[] = [
  { id: 'r1', name: 'Sarah Mitchell', avatar: 'SM', leads: 24, closed: 9, revenue: 142000, region: 'North America' },
  { id: 'r2', name: 'James Okafor', avatar: 'JO', leads: 18, closed: 7, revenue: 98000, region: 'Europe' },
  { id: 'r3', name: 'Priya Sharma', avatar: 'PS', leads: 31, closed: 12, revenue: 187000, region: 'APAC' },
  { id: 'r4', name: 'Carlos Vega', avatar: 'CV', leads: 15, closed: 5, revenue: 76000, region: 'LATAM' },
];

export const leads: Lead[] = [
  {
    id: 'l1', name: 'Michael Torres', email: 'mtorres@nexatech.com', company: 'NexaTech Inc.',
    title: 'VP of Operations', source: 'website', status: 'new', assignedTo: 'r1',
    value: 42000, createdAt: '2026-04-25', lastContact: '2026-04-25', industry: 'Technology',
    region: 'North America', score: 87, tags: ['enterprise', 'high-value'],
  },
  {
    id: 'l2', name: 'Anika Brennan', email: 'anika@cloudwave.io', company: 'CloudWave',
    title: 'CTO', source: 'linkedin', status: 'contacted', assignedTo: 'r2',
    value: 28000, createdAt: '2026-04-20', lastContact: '2026-04-24', industry: 'SaaS',
    region: 'Europe', score: 74, tags: ['mid-market'],
  },
  {
    id: 'l3', name: 'David Kim', email: 'dkim@precisionmfg.co', company: 'Precision MFG',
    title: 'Director of Procurement', source: 'referral', status: 'qualified', assignedTo: 'r3',
    value: 65000, createdAt: '2026-04-15', lastContact: '2026-04-23', industry: 'Manufacturing',
    region: 'APAC', score: 92, tags: ['enterprise', 'referral'],
  },
  {
    id: 'l4', name: 'Fatima Al-Rashid', email: 'fatima@greenlogi.com', company: 'GreenLogi',
    title: 'CEO', source: 'email', status: 'proposal', assignedTo: 'r1',
    value: 91000, createdAt: '2026-04-10', lastContact: '2026-04-22', industry: 'Logistics',
    region: 'Middle East', score: 95, tags: ['enterprise', 'high-value', 'decision-maker'],
  },
  {
    id: 'l5', name: 'Tom Lindqvist', email: 'tom@finvault.se', company: 'FinVault',
    title: 'Head of Finance', source: 'ads', status: 'new', assignedTo: 'r2',
    value: 19000, createdAt: '2026-04-26', lastContact: '2026-04-26', industry: 'FinTech',
    region: 'Europe', score: 61, tags: ['sme'],
  },
  {
    id: 'l6', name: 'Rosa Mendez', email: 'rmendez@urbanspace.mx', company: 'UrbanSpace',
    title: 'Marketing Director', source: 'website', status: 'contacted', assignedTo: 'r4',
    value: 34000, createdAt: '2026-04-18', lastContact: '2026-04-21', industry: 'Real Estate',
    region: 'LATAM', score: 68, tags: ['mid-market'],
  },
  {
    id: 'l7', name: 'Chen Wei', email: 'cwei@biotechhub.cn', company: 'BioTechHub',
    title: 'Research Lead', source: 'linkedin', status: 'qualified', assignedTo: 'r3',
    value: 53000, createdAt: '2026-04-12', lastContact: '2026-04-20', industry: 'Healthcare',
    region: 'APAC', score: 83, tags: ['enterprise'],
  },
  {
    id: 'l8', name: 'Oliver Grant', email: 'ogrant@retailmax.co.uk', company: 'RetailMax',
    title: 'Operations Manager', source: 'referral', status: 'closed_won', assignedTo: 'r2',
    value: 47000, createdAt: '2026-03-28', lastContact: '2026-04-15', industry: 'Retail',
    region: 'Europe', score: 100, tags: ['enterprise', 'closed'],
  },
  {
    id: 'l9', name: 'Nadia Kowalski', email: 'nkowalski@eduflex.pl', company: 'EduFlex',
    title: 'Product Manager', source: 'email', status: 'closed_lost', assignedTo: 'r1',
    value: 0, createdAt: '2026-03-20', lastContact: '2026-04-05', industry: 'EdTech',
    region: 'Europe', score: 30, tags: ['sme', 'lost'],
  },
  {
    id: 'l10', name: 'Samuel Adeyemi', email: 'sadeyemi@pangaeaai.com', company: 'PangaeaAI',
    title: 'Chief AI Officer', source: 'website', status: 'proposal', assignedTo: 'r3',
    value: 120000, createdAt: '2026-04-08', lastContact: '2026-04-25', industry: 'AI/ML',
    region: 'Africa', score: 97, tags: ['enterprise', 'high-value', 'strategic'],
  },
];

export const contacts: Contact[] = [
  { id: 'c1', name: 'Jennifer Walsh', email: 'jwalsh@acmecorp.com', phone: '+1 555-0142', company: 'Acme Corp', title: 'VP Sales', status: 'customer', lastInteraction: '2026-04-26', totalDeals: 3, avatarColor: 'bg-blue-500' },
  { id: 'c2', name: 'Marcus Liu', email: 'mliu@techbridge.io', phone: '+1 555-0198', company: 'TechBridge', title: 'CTO', status: 'prospect', lastInteraction: '2026-04-24', totalDeals: 0, avatarColor: 'bg-emerald-500' },
  { id: 'c3', name: 'Sara Osei', email: 'sosei@deltafin.com', phone: '+44 20 7946 0192', company: 'DeltaFin', title: 'CFO', status: 'customer', lastInteraction: '2026-04-22', totalDeals: 5, avatarColor: 'bg-amber-500' },
  { id: 'c4', name: 'Raj Patel', email: 'rpatel@skylogix.in', phone: '+91 98765 43210', company: 'SkyLogix', title: 'CEO', status: 'prospect', lastInteraction: '2026-04-20', totalDeals: 1, avatarColor: 'bg-rose-500' },
  { id: 'c5', name: 'Ingrid Larsen', email: 'ilarsen@nordware.no', phone: '+47 22 00 01 00', company: 'NordWare', title: 'Head of IT', status: 'churned', lastInteraction: '2026-03-15', totalDeals: 2, avatarColor: 'bg-slate-500' },
  { id: 'c6', name: 'Antonio Ferrari', email: 'aferrari@medialab.it', phone: '+39 02 1234 5678', company: 'MediaLab', title: 'Creative Director', status: 'customer', lastInteraction: '2026-04-27', totalDeals: 4, avatarColor: 'bg-cyan-500' },
];

export const agentRuns: AgentRun[] = [
  {
    id: 'ar1', agentName: 'Lead Assignment Agent', agentType: 'lead_assignment',
    status: 'completed', startedAt: '2026-04-27T08:12:00', completedAt: '2026-04-27T08:12:04',
    message: 'Assigned 3 new leads based on region and workload balancing',
    affectedRecords: 3,
    details: [
      'Michael Torres → Sarah Mitchell (North America, capacity 68%)',
      'Tom Lindqvist → James Okafor (Europe, capacity 54%)',
      'Evaluated 4 sales reps, selected optimal match using Claude scoring',
    ],
  },
  {
    id: 'ar2', agentName: 'Auto-Response Agent', agentType: 'auto_response',
    status: 'completed', startedAt: '2026-04-27T08:13:00', completedAt: '2026-04-27T08:13:09',
    message: 'Sent 3 personalized outreach emails to new leads',
    affectedRecords: 3,
    details: [
      '"Hi Michael, thank you for reaching out to us about enterprise solutions..."',
      '"Hi Tom, we noticed your interest in our FinTech optimization tools..."',
      'Average email personalization score: 94/100',
    ],
  },
  {
    id: 'ar3', agentName: 'Follow-Up Reminder Agent', agentType: 'follow_up',
    status: 'completed', startedAt: '2026-04-27T07:00:00', completedAt: '2026-04-27T07:00:06',
    message: 'Generated 5 follow-up tasks for stale leads',
    affectedRecords: 5,
    details: [
      'Anika Brennan: 3 days since last contact — high priority follow-up',
      'Rosa Mendez: 6 days since last contact — urgent follow-up',
      'Analyzed 28 leads, flagged 5 requiring immediate attention',
    ],
  },
  {
    id: 'ar4', agentName: 'Data Organization Agent', agentType: 'data_org',
    status: 'completed', startedAt: '2026-04-26T23:00:00', completedAt: '2026-04-26T23:00:14',
    message: 'Cleaned and normalized 12 contact records',
    affectedRecords: 12,
    details: [
      'Standardized 8 job titles (e.g., "VP Ops" → "VP of Operations")',
      'Merged 2 duplicate contact records',
      'Enriched 4 records with missing industry data',
    ],
  },
  {
    id: 'ar5', agentName: 'Pipeline Tracking Agent', agentType: 'pipeline_tracking',
    status: 'running', startedAt: '2026-04-27T09:00:00',
    message: 'Analyzing pipeline movements and updating lead stages...',
    affectedRecords: 0,
    details: [
      'Scanning 10 active leads for stage transition criteria...',
      'Evaluating engagement signals, last contact dates, and deal activity...',
    ],
  },
];

export const tasks: Task[] = [
  { id: 't1', title: 'Follow up with Anika Brennan on CloudWave demo', dueDate: '2026-04-28', priority: 'high', status: 'pending', lead: 'Anika Brennan', assignedTo: 'James Okafor', agentGenerated: true },
  { id: 't2', title: 'Send proposal to Fatima Al-Rashid at GreenLogi', dueDate: '2026-04-28', priority: 'high', status: 'in_progress', lead: 'Fatima Al-Rashid', assignedTo: 'Sarah Mitchell', agentGenerated: false },
  { id: 't3', title: 'Schedule product walkthrough for David Kim', dueDate: '2026-04-29', priority: 'medium', status: 'pending', lead: 'David Kim', assignedTo: 'Priya Sharma', agentGenerated: true },
  { id: 't4', title: 'Review and update PangaeaAI deal terms', dueDate: '2026-04-29', priority: 'high', status: 'pending', lead: 'Samuel Adeyemi', assignedTo: 'Priya Sharma', agentGenerated: false },
  { id: 't5', title: 'Send intro email to Tom Lindqvist', dueDate: '2026-04-27', priority: 'medium', status: 'done', lead: 'Tom Lindqvist', assignedTo: 'James Okafor', agentGenerated: true },
  { id: 't6', title: 'Follow up with Rosa Mendez — 6 days no contact', dueDate: '2026-04-27', priority: 'high', status: 'pending', lead: 'Rosa Mendez', assignedTo: 'Carlos Vega', agentGenerated: true },
  { id: 't7', title: 'Prepare ROI analysis for Chen Wei', dueDate: '2026-04-30', priority: 'medium', status: 'pending', lead: 'Chen Wei', assignedTo: 'Priya Sharma', agentGenerated: false },
];

export const pipelineStages: PipelineStage[] = [
  { id: 'new', name: 'New', count: 2, value: 61000, color: 'bg-slate-400' },
  { id: 'contacted', name: 'Contacted', count: 2, value: 62000, color: 'bg-blue-400' },
  { id: 'qualified', name: 'Qualified', count: 2, value: 118000, color: 'bg-cyan-500' },
  { id: 'proposal', name: 'Proposal', count: 2, value: 211000, color: 'bg-amber-400' },
  { id: 'closed_won', name: 'Closed Won', count: 1, value: 47000, color: 'bg-emerald-500' },
  { id: 'closed_lost', name: 'Closed Lost', count: 1, value: 0, color: 'bg-red-400' },
];

export const agentLogs = [
  { time: '09:00', event: 'Pipeline Tracking Agent started', type: 'info' },
  { time: '08:13', event: 'Auto-Response Agent sent 3 emails successfully', type: 'success' },
  { time: '08:12', event: 'Lead Assignment Agent assigned 3 leads', type: 'success' },
  { time: '08:00', event: 'New lead captured: Tom Lindqvist (FinVault)', type: 'info' },
  { time: '07:55', event: 'New lead captured: Michael Torres (NexaTech)', type: 'info' },
  { time: '07:00', event: 'Follow-Up Reminder Agent flagged 5 leads', type: 'warning' },
  { time: '00:00', event: 'Data Organization Agent cleaned 12 records', type: 'success' },
];
