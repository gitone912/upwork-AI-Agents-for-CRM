import { TrendingUp, TrendingDown, Bot, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { leads, salesReps, agentRuns, tasks } from '../data/staticData';

const monthlyData = [
  { month: 'Nov', leads: 12, closed: 3, revenue: 48 },
  { month: 'Dec', leads: 9, closed: 2, revenue: 31 },
  { month: 'Jan', leads: 15, closed: 4, revenue: 62 },
  { month: 'Feb', leads: 18, closed: 6, revenue: 89 },
  { month: 'Mar', leads: 14, closed: 5, revenue: 74 },
  { month: 'Apr', leads: 22, closed: 7, revenue: 121 },
];

const sourceData = [
  { source: 'Website', count: 3, color: 'bg-blue-500', pct: 30 },
  { source: 'LinkedIn', count: 2, color: 'bg-cyan-500', pct: 20 },
  { source: 'Email', count: 2, color: 'bg-amber-500', pct: 20 },
  { source: 'Referral', count: 2, color: 'bg-emerald-500', pct: 20 },
  { source: 'Ads', count: 1, color: 'bg-rose-500', pct: 10 },
];

export default function Reports() {
  const totalLeads = leads.length;
  const wonLeads = leads.filter(l => l.status === 'closed_won').length;
  const conversionRate = Math.round((wonLeads / totalLeads) * 100);
  const agentTasksGenerated = tasks.filter(t => t.agentGenerated).length;
  const totalTasks = tasks.length;

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <ReportStat label="Lead Conversion Rate" value={`${conversionRate}%`} change="+3% vs last month" up icon={<TrendingUp size={15} className="text-emerald-600" />} bg="bg-emerald-50" />
        <ReportStat label="Avg Response Time" value="4.2 min" change="-38% (AI-powered)" up icon={<Clock size={15} className="text-blue-600" />} bg="bg-blue-50" />
        <ReportStat label="AI-Generated Tasks" value={`${agentTasksGenerated}/${totalTasks}`} change="57% automated" up icon={<Bot size={15} className="text-cyan-600" />} bg="bg-cyan-50" />
        <ReportStat label="Email Open Rate" value="62%" change="+11% with AI copy" up icon={<Mail size={15} className="text-amber-600" />} bg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Monthly Revenue & Leads</h2>
            <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp size={11} /> +63% YoY
            </span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500 font-medium">${d.revenue}k</span>
                <div className="w-full flex gap-0.5 items-end">
                  <div
                    className="flex-1 bg-blue-500 rounded-t transition-all duration-700"
                    style={{ height: `${(d.revenue / 121) * 120}px` }}
                    title={`Revenue: $${d.revenue}k`}
                  />
                  <div
                    className="flex-1 bg-blue-200 rounded-t transition-all duration-700"
                    style={{ height: `${(d.leads / 22) * 80}px` }}
                    title={`Leads: ${d.leads}`}
                  />
                </div>
                <span className="text-xs text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span className="text-xs text-gray-500">Revenue ($k)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-blue-200 rounded" />
              <span className="text-xs text-gray-500">Lead Volume</span>
            </div>
          </div>
        </div>

        {/* Lead Sources Donut */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Lead Sources</h2>
          <div className="space-y-3">
            {sourceData.map(s => (
              <div key={s.source}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700 font-medium">{s.source}</span>
                  <span className="text-gray-500">{s.count} leads · {s.pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${s.color} h-2 rounded-full transition-all duration-700`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">AI Agent Performance Report</h2>
        <div className="grid grid-cols-5 gap-3">
          {agentRuns.map(run => (
            <div key={run.id} className={`p-4 rounded-xl border ${run.status === 'running' ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center gap-1.5 mb-2">
                <Bot size={13} className={run.status === 'running' ? 'text-blue-600' : 'text-gray-600'} />
                <span className={`text-xs font-semibold ${run.status === 'running' ? 'text-blue-600' : 'text-gray-900'}`}>
                  {run.status === 'running' ? 'Active' : 'Done'}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-800 leading-snug mb-1">{run.agentName}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{run.message}</p>
              {run.affectedRecords > 0 && (
                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                  <CheckCircle2 size={11} />
                  {run.affectedRecords} records
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rep Leaderboard */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Sales Team Leaderboard</h2>
        <div className="space-y-2">
          {[...salesReps].sort((a, b) => b.revenue - a.revenue).map((rep, i) => (
            <div key={rep.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-gray-100 text-gray-700' : 'bg-gray-50 text-gray-600'}`}>
                {i + 1}
              </span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{rep.avatar}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{rep.name}</p>
                <p className="text-xs text-gray-500">{rep.region}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">${(rep.revenue / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500">{rep.closed} closed</p>
              </div>
              <div className="w-24">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(rep.revenue / 187000) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportStat({ label, value, change, up, icon, bg }: {
  label: string; value: string; change: string; up: boolean; icon: React.ReactNode; bg: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">{label}</p>
        <div className={`w-7 h-7 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-xs mt-1 flex items-center gap-1 ${up ? 'text-emerald-600' : 'text-red-500'}`}>
        {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {change}
      </p>
    </div>
  );
}
