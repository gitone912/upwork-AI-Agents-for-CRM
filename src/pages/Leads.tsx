import { useState } from 'react';
import { Bot, Plus, Filter, Star, Globe, Mail, Linkedin, Megaphone, Users } from 'lucide-react';
import { leads, salesReps } from '../data/staticData';
import type { LeadStatus, Lead } from '../types';

const stages: { id: LeadStatus; label: string; color: string; dot: string }[] = [
  { id: 'new', label: 'New', color: 'bg-slate-50 border-slate-200', dot: 'bg-slate-400' },
  { id: 'contacted', label: 'Contacted', color: 'bg-blue-50 border-blue-200', dot: 'bg-blue-400' },
  { id: 'qualified', label: 'Qualified', color: 'bg-cyan-50 border-cyan-200', dot: 'bg-cyan-500' },
  { id: 'proposal', label: 'Proposal', color: 'bg-amber-50 border-amber-200', dot: 'bg-amber-400' },
  { id: 'closed_won', label: 'Closed Won', color: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
  { id: 'closed_lost', label: 'Lost', color: 'bg-red-50 border-red-200', dot: 'bg-red-400' },
];

const sourceIcon = (source: Lead['source']) => {
  const cls = 'w-3.5 h-3.5';
  switch (source) {
    case 'website': return <Globe className={cls} />;
    case 'email': return <Mail className={cls} />;
    case 'linkedin': return <Linkedin className={cls} />;
    case 'referral': return <Users className={cls} />;
    case 'ads': return <Megaphone className={cls} />;
  }
};

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? 'text-emerald-700 bg-emerald-50' : score >= 60 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50';
  return <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${color}`}>{score}</span>;
}

function LeadCard({ lead }: { lead: Lead }) {
  const rep = salesReps.find(r => r.id === lead.assignedTo);
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600">
            {lead.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900 leading-tight">{lead.name}</p>
            <p className="text-xs text-gray-500 truncate max-w-[110px]">{lead.company}</p>
          </div>
        </div>
        <ScoreBadge score={lead.score} />
      </div>

      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-gray-400">{sourceIcon(lead.source)}</span>
        <span className="text-xs text-gray-500">{lead.industry}</span>
        {lead.tags.includes('high-value') && (
          <Star size={10} className="text-amber-400 fill-amber-400 ml-auto" />
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">${(lead.value / 1000).toFixed(0)}k</span>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {rep?.avatar[0]}
          </div>
          <span className="text-xs text-gray-500">{rep?.name.split(' ')[0]}</span>
        </div>
      </div>

      {lead.tags.includes('enterprise') && (
        <div className="mt-2 flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
          <Bot size={9} />
          <span>AI assigned</span>
        </div>
      )}
    </div>
  );
}

export default function Leads() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button onClick={() => setView('kanban')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'kanban' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Kanban</button>
          <button onClick={() => setView('list')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>List</button>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter size={13} /> Filter
        </button>
        <span className="text-xs text-gray-500 ml-1">{leads.length} leads</span>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={13} /> Add Lead
        </button>
      </div>

      {view === 'kanban' ? (
        <div className="flex-1 overflow-x-auto p-6">
          <div className="flex gap-4 h-full" style={{ minWidth: '900px' }}>
            {stages.map((stage) => {
              const stageLeads = leads.filter(l => l.status === stage.id);
              const stageValue = stageLeads.reduce((s, l) => s + l.value, 0);
              return (
                <div key={stage.id} className="flex-1 min-w-[180px] max-w-[220px] flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                    <span className="text-xs font-semibold text-gray-700">{stage.label}</span>
                    <span className="ml-auto text-xs text-gray-400">{stageLeads.length}</span>
                  </div>
                  {stageValue > 0 && (
                    <p className="text-xs text-gray-400 mb-2">${(stageValue / 1000).toFixed(0)}k total</p>
                  )}
                  <div className={`flex-1 rounded-xl border p-2 space-y-2 overflow-y-auto ${stage.color}`}>
                    {stageLeads.map(lead => <LeadCard key={lead.id} lead={lead} />)}
                    {stageLeads.length === 0 && (
                      <div className="text-center py-8 text-xs text-gray-400">No leads</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Name', 'Company', 'Status', 'Value', 'Score', 'Source', 'Assigned', 'Last Contact'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map(lead => {
                  const rep = salesReps.find(r => r.id === lead.assignedTo);
                  const stageInfo = stages.find(s => s.id === lead.status);
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                            <p className="text-xs text-gray-500">{lead.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{lead.company}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${stageInfo?.dot}`} />
                          <span className="text-xs font-medium text-gray-700">{stageInfo?.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">${(lead.value / 1000).toFixed(0)}k</td>
                      <td className="px-4 py-3"><ScoreBadge score={lead.score} /></td>
                      <td className="px-4 py-3 text-gray-400">{sourceIcon(lead.source)}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{rep?.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{lead.lastContact}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
