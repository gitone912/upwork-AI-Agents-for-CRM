import { useState, useEffect } from 'react';
import { Bot, Play, CheckCircle, Loader2, AlertCircle, ChevronDown, ChevronUp, Zap, Users, Mail, Bell, Database, GitBranch } from 'lucide-react';
import { agentRuns } from '../data/staticData';
import type { AgentRun } from '../types';

const agentDefs = [
  {
    type: 'lead_assignment' as const,
    name: 'Lead Assignment Agent',
    description: 'Analyzes incoming leads and assigns them to the best-fit sales rep based on region, industry, and capacity.',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    simulatedLog: [
      'Fetching unassigned leads from CRM...',
      'Found 3 new leads requiring assignment',
      'Analyzing lead: Michael Torres (NexaTech) — Region: North America',
      'Evaluating sales rep capacity... Sarah Mitchell: 68%, James Okafor: 82%, Priya Sharma: 54%',
      'Best match: Sarah Mitchell (North America, capacity available)',
      'Assigning lead to Sarah Mitchell ✓',
      'Analyzing lead: Tom Lindqvist (FinVault) — Region: Europe',
      'Best match: James Okafor (Europe specialist)',
      'Assignment complete. 3/3 leads assigned.',
    ],
  },
  {
    type: 'auto_response' as const,
    name: 'Auto-Response Agent',
    description: 'Generates and sends personalized outreach emails to new leads using AI-crafted messaging tailored to their industry.',
    icon: Mail,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    simulatedLog: [
      'Scanning for leads with status: new...',
      'Found 3 leads without initial contact',
      'Composing email for Michael Torres (Technology sector)...',
      '"Hi Michael, thank you for your interest in our enterprise solutions. Given NexaTech\'s scale in operations..."',
      'Personalization score: 96/100. Sending... ✓',
      'Composing email for Tom Lindqvist (FinTech sector)...',
      '"Hi Tom, we noticed your interest in our FinTech optimization platform..."',
      'Personalization score: 91/100. Sending... ✓',
      'All 3 outreach emails sent. Average open-rate prediction: 62%',
    ],
  },
  {
    type: 'follow_up' as const,
    name: 'Follow-Up Reminder Agent',
    description: 'Monitors interaction history and automatically generates follow-up tasks for leads that have gone silent.',
    icon: Bell,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    simulatedLog: [
      'Scanning 10 active leads for engagement gaps...',
      'Checking last interaction dates against configured thresholds...',
      'ALERT: Anika Brennan — 3 days no contact (threshold: 2 days)',
      'Creating follow-up task for James Okafor: "Contact Anika Brennan"',
      'ALERT: Rosa Mendez — 6 days no contact (threshold: 3 days) — URGENT',
      'Creating URGENT follow-up for Carlos Vega: "Immediate outreach — Rosa Mendez"',
      'Scanning pipeline for stalled proposals...',
      'Flagged: Fatima Al-Rashid proposal — no update in 4 days',
      '5 follow-up tasks created and assigned.',
    ],
  },
  {
    type: 'data_org' as const,
    name: 'Data Organization Agent',
    description: 'Cleans CRM data by fixing duplicates, normalizing job titles, and enriching missing contact details.',
    icon: Database,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    simulatedLog: [
      'Running nightly CRM data audit...',
      'Scanning 48 contact records for anomalies...',
      'Found duplicate: "Jen Walsh" and "Jennifer Walsh" — same email',
      'Merging records, preserving most recent interaction data ✓',
      'Normalizing job titles: "VP Ops" → "VP of Operations" (8 records)',
      'Enriching missing industry data using company domain lookup...',
      'Updated 4 records with industry classification',
      'Flagging 2 records with stale phone numbers for manual review',
      'Audit complete. 12 records cleaned. Data quality score: 94%',
    ],
  },
  {
    type: 'pipeline_tracking' as const,
    name: 'Pipeline Tracking Agent',
    description: 'Monitors deal activity and automatically advances leads through pipeline stages based on engagement signals.',
    icon: GitBranch,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    simulatedLog: [
      'Analyzing pipeline movement signals...',
      'Checking email opens, meeting logs, and proposal views...',
      'David Kim: Opened proposal 3 times in 24h — strong buying signal',
      'Suggesting stage update: Qualified → Proposal ✓',
      'Samuel Adeyemi: Proposal viewed, follow-up call logged',
      'Deal health score: 97/100 — on track to close',
      'Chen Wei: No activity for 5 days — flagging for rep review',
      'Pipeline velocity: $18k/day average through funnel',
      'Report generated: 2 stage advances, 1 at-risk deal flagged.',
    ],
  },
];

type RunState = { log: string[]; status: 'idle' | 'running' | 'done'; index: number };

export default function Agents() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [runs, setRuns] = useState<Record<string, RunState>>({});

  function startAgent(type: string) {
    const def = agentDefs.find(d => d.type === type)!;
    setRuns(prev => ({ ...prev, [type]: { log: [], status: 'running', index: 0 } }));
    setExpanded(type);

    let i = 0;
    const interval = setInterval(() => {
      setRuns(prev => {
        const current = prev[type];
        if (!current || i >= def.simulatedLog.length) {
          clearInterval(interval);
          return { ...prev, [type]: { ...current, status: 'done', index: i } };
        }
        i++;
        return { ...prev, [type]: { ...current, log: def.simulatedLog.slice(0, i), index: i } };
      });
    }, 600);
  }

  const completedRuns = agentRuns.filter(r => r.status === 'completed');
  const totalAffected = agentRuns.reduce((s, r) => s + r.affectedRecords, 0);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Agents Configured" value="5" icon={<Bot size={16} className="text-blue-600" />} bg="bg-blue-50" />
        <StatCard label="Runs Today" value="5" icon={<Zap size={16} className="text-amber-600" />} bg="bg-amber-50" />
        <StatCard label="Records Updated" value={String(totalAffected)} icon={<Database size={16} className="text-emerald-600" />} bg="bg-emerald-50" />
        <StatCard label="Successful Runs" value={String(completedRuns.length)} icon={<CheckCircle size={16} className="text-cyan-600" />} bg="bg-cyan-50" />
      </div>

      {/* Agent Cards */}
      <div className="space-y-3">
        {agentDefs.map((agent) => {
          const Icon = agent.icon;
          const state = runs[agent.type];
          const pastRun = agentRuns.find(r => r.agentType === agent.type);
          const isExpanded = expanded === agent.type;

          return (
            <div key={agent.type} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${agent.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={agent.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{agent.name}</h3>
                      {state?.status === 'running' && (
                        <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          <Loader2 size={10} className="animate-spin" /> Running
                        </span>
                      )}
                      {state?.status === 'done' && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle size={10} /> Completed
                        </span>
                      )}
                      {!state && pastRun?.status === 'completed' && (
                        <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                          Last run: {pastRun.completedAt?.slice(11, 16)}
                        </span>
                      )}
                      {!state && pastRun?.status === 'running' && (
                        <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
                          <Loader2 size={10} className="animate-spin" /> Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{agent.description}</p>
                    {pastRun && !state && (
                      <p className="text-xs text-gray-400 mt-1.5">{pastRun.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : agent.type)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    <button
                      onClick={() => startAgent(agent.type)}
                      disabled={state?.status === 'running'}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        state?.status === 'running'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : `${agent.bg} ${agent.color} border ${agent.border} hover:opacity-80`
                      }`}
                    >
                      {state?.status === 'running' ? (
                        <><Loader2 size={12} className="animate-spin" /> Running...</>
                      ) : (
                        <><Play size={12} /> Run Agent</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Log */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-950 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-xs text-gray-400 font-mono">Agent Terminal</p>
                  </div>
                  <div className="font-mono text-xs space-y-1 min-h-[80px]">
                    {(state?.log || pastRun?.details || []).map((line, i) => (
                      <div key={i} className="flex gap-2 text-gray-300">
                        <span className="text-gray-600 select-none">{String(i + 1).padStart(2, '0')}</span>
                        <span>{line}</span>
                      </div>
                    ))}
                    {state?.status === 'running' && (
                      <div className="flex gap-2 text-blue-400">
                        <span className="text-gray-600">__</span>
                        <span className="animate-pulse">█</span>
                      </div>
                    )}
                    {!state && !pastRun?.details?.length && (
                      <p className="text-gray-600">Run this agent to see live output...</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Workflow Diagram */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Automated Workflow Pipeline</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { label: 'Lead Captured', sublabel: 'Website / Email / LinkedIn', color: 'border-slate-300 bg-slate-50' },
            { label: 'Assignment Agent', sublabel: 'Routes to best rep', color: 'border-blue-300 bg-blue-50', ai: true },
            { label: 'Auto-Response', sublabel: 'Sends personalized email', color: 'border-emerald-300 bg-emerald-50', ai: true },
            { label: 'CRM Updated', sublabel: 'Record & stage set', color: 'border-cyan-300 bg-cyan-50' },
            { label: 'Follow-Up Agent', sublabel: 'Schedules next step', color: 'border-amber-300 bg-amber-50', ai: true },
            { label: 'Deal Closed', sublabel: 'Won / Lost tracked', color: 'border-rose-300 bg-rose-50' },
          ].map((step, i, arr) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <div className={`border rounded-lg px-3 py-2.5 text-center min-w-[120px] ${step.color}`}>
                <p className="text-xs font-semibold text-gray-800">{step.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{step.sublabel}</p>
                {step.ai && (
                  <div className="mt-1.5 flex items-center justify-center gap-1 text-blue-600 text-xs">
                    <Bot size={9} /><span>AI</span>
                  </div>
                )}
              </div>
              {i < arr.length - 1 && (
                <div className="flex items-center text-gray-300">
                  <div className="w-6 h-0.5 bg-gray-300" />
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, bg }: { label: string; value: string; icon: React.ReactNode; bg: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500">{label}</p>
        <div className={`w-7 h-7 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
