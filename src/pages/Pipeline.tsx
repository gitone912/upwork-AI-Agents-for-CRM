import { TrendingUp, DollarSign, Target, Clock } from 'lucide-react';
import { leads, pipelineStages, salesReps } from '../data/staticData';

export default function Pipeline() {
  const totalValue = leads.filter(l => !['closed_lost'].includes(l.status)).reduce((s, l) => s + l.value, 0);
  const wonValue = leads.filter(l => l.status === 'closed_won').reduce((s, l) => s + l.value, 0);
  const avgDealSize = Math.round(totalValue / leads.filter(l => l.value > 0).length);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <PipeKpi icon={<DollarSign size={16} className="text-blue-600" />} bg="bg-blue-50" label="Pipeline Value" value={`$${(totalValue / 1000).toFixed(0)}k`} sub="Active deals" />
        <PipeKpi icon={<Target size={16} className="text-emerald-600" />} bg="bg-emerald-50" label="Won This Month" value={`$${(wonValue / 1000).toFixed(0)}k`} sub="1 deal closed" />
        <PipeKpi icon={<TrendingUp size={16} className="text-amber-600" />} bg="bg-amber-50" label="Avg Deal Size" value={`$${(avgDealSize / 1000).toFixed(0)}k`} sub="Across all deals" />
        <PipeKpi icon={<Clock size={16} className="text-cyan-600" />} bg="bg-cyan-50" label="Avg Cycle Time" value="24 days" sub="Lead to close" />
      </div>

      {/* Funnel Visual */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Pipeline Funnel</h2>
        <div className="space-y-2">
          {pipelineStages.map((stage, i) => {
            const maxCount = Math.max(...pipelineStages.map(s => s.count));
            const width = Math.max((stage.count / maxCount) * 100, 10);
            const stageLeads = leads.filter(l => l.status === stage.id);
            return (
              <div key={stage.id} className="flex items-center gap-4">
                <div className="w-24 text-right">
                  <p className="text-xs font-medium text-gray-700">{stage.name}</p>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={`${stage.color} h-full rounded-full flex items-center px-3 transition-all duration-700`}
                      style={{ width: `${width}%` }}
                    >
                      <span className="text-white text-xs font-semibold">{stage.count}</span>
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <p className="text-xs font-semibold text-gray-900">${(stage.value / 1000).toFixed(0)}k</p>
                  </div>
                </div>
                <div className="w-48 flex gap-1 flex-wrap">
                  {stageLeads.slice(0, 3).map(l => (
                    <span key={l.id} className="text-xs bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded text-gray-700">
                      {l.name.split(' ')[0]}
                    </span>
                  ))}
                  {stageLeads.length > 3 && <span className="text-xs text-gray-400">+{stageLeads.length - 3}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deal Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Active Deals</h2>
          <span className="text-xs text-gray-500">{leads.filter(l => !['closed_won', 'closed_lost'].includes(l.status)).length} open</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Deal', 'Stage', 'Value', 'Rep', 'Score', 'Probability', 'Last Activity'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.filter(l => !['closed_lost'].includes(l.status)).map(lead => {
              const rep = salesReps.find(r => r.id === lead.assignedTo);
              const stageInfo = pipelineStages.find(s => s.id === lead.status);
              const probability = lead.status === 'closed_won' ? 100 : lead.status === 'proposal' ? 65 : lead.status === 'qualified' ? 40 : lead.status === 'contacted' ? 20 : 10;
              return (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.company}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${stageInfo?.color}`} />
                      <span className="text-xs text-gray-700">{stageInfo?.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">${(lead.value / 1000).toFixed(0)}k</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{rep?.name.split(' ')[0]}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${lead.score >= 85 ? 'text-emerald-600' : lead.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{lead.score}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-16">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${probability}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{probability}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{lead.lastContact}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rep Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Sales Rep Performance</h2>
        <div className="grid grid-cols-4 gap-4">
          {salesReps.map(rep => (
            <div key={rep.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{rep.avatar}</div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{rep.name}</p>
                  <p className="text-xs text-gray-500">{rep.region}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Leads</span>
                  <span className="font-semibold text-gray-900">{rep.leads}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Closed</span>
                  <span className="font-semibold text-emerald-600">{rep.closed}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Revenue</span>
                  <span className="font-semibold text-gray-900">${(rep.revenue / 1000).toFixed(0)}k</span>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(rep.closed / rep.leads) * 100}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">{Math.round((rep.closed / rep.leads) * 100)}% close rate</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PipeKpi({ icon, bg, label, value, sub }: { icon: React.ReactNode; bg: string; label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">{label}</p>
        <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}
