import { TrendingUp, Users, CheckCircle, Clock, ArrowUpRight, Bot, AlertCircle } from 'lucide-react';
import { leads, tasks, agentRuns, pipelineStages, agentLogs } from '../data/staticData';

const statusColors: Record<string, string> = {
  new: 'bg-slate-100 text-slate-700',
  contacted: 'bg-blue-100 text-blue-700',
  qualified: 'bg-cyan-100 text-cyan-700',
  proposal: 'bg-amber-100 text-amber-700',
  closed_won: 'bg-emerald-100 text-emerald-700',
  closed_lost: 'bg-red-100 text-red-700',
};

const sourceIcon: Record<string, string> = {
  website: 'W', email: 'E', linkedin: 'L', referral: 'R', ads: 'A',
};

const priorityColors: Record<string, string> = {
  high: 'text-red-600', medium: 'text-amber-600', low: 'text-gray-400',
};

export default function Dashboard() {
  const totalRevenue = leads.filter(l => l.status === 'closed_won').reduce((s, l) => s + l.value, 0);
  const openLeads = leads.filter(l => !['closed_won', 'closed_lost'].includes(l.status)).length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;

  const recentLeads = [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const upcomingTasks = tasks.filter(t => t.status !== 'done').slice(0, 5);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          label="Total Pipeline Value"
          value="$503,000"
          change="+18% this month"
          positive
          icon={<TrendingUp size={18} className="text-blue-600" />}
          bg="bg-blue-50"
        />
        <KpiCard
          label="Active Leads"
          value={String(openLeads)}
          change="+3 this week"
          positive
          icon={<Users size={18} className="text-emerald-600" />}
          bg="bg-emerald-50"
        />
        <KpiCard
          label="Pending Tasks"
          value={String(pendingTasks)}
          change={`${completedTasks} completed today`}
          positive={false}
          icon={<Clock size={18} className="text-amber-600" />}
          bg="bg-amber-50"
        />
        <KpiCard
          label="Deals Closed"
          value="$47,000"
          change="1 won this month"
          positive
          icon={<CheckCircle size={18} className="text-cyan-600" />}
          bg="bg-cyan-50"
        />
      </div>

      {/* Pipeline Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Sales Pipeline Overview</h2>
          <span className="text-xs text-gray-500">Total: $499,000 across 10 deals</span>
        </div>
        <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-4">
          {pipelineStages.map((stage) => (
            <div
              key={stage.id}
              className={`${stage.color} transition-all duration-500`}
              style={{ width: `${Math.max((stage.count / 10) * 100, 5)}%` }}
              title={`${stage.name}: ${stage.count} deals`}
            />
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className={`w-2 h-2 rounded-full ${stage.color}`} />
                <span className="text-xs text-gray-500">{stage.name}</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{stage.count}</p>
              <p className="text-xs text-gray-400">${(stage.value / 1000).toFixed(0)}k</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Recent Leads */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Leads</h2>
            <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View all</span>
          </div>
          <div className="space-y-2">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                  <p className="text-xs text-gray-500 truncate">{lead.company} · {lead.industry}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[lead.status]}`}>
                    {lead.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-semibold text-gray-700">${(lead.value / 1000).toFixed(0)}k</span>
                  <span className="w-5 h-5 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-500 font-bold">
                    {sourceIcon[lead.source]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Activity Log */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bot size={15} className="text-blue-600" />
            <h2 className="font-semibold text-gray-900">Agent Activity</h2>
            <span className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <div className="space-y-2">
            {agentLogs.map((log, i) => (
              <div key={i} className="flex gap-2 text-xs">
                <span className="text-gray-400 font-mono w-10 flex-shrink-0">{log.time}</span>
                <div className="flex items-start gap-1.5">
                  {log.type === 'success' && <CheckCircle size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />}
                  {log.type === 'warning' && <AlertCircle size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />}
                  {log.type === 'info' && <ArrowUpRight size={12} className="text-blue-500 mt-0.5 flex-shrink-0" />}
                  <span className="text-gray-700 leading-relaxed">{log.event}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Runs today</span>
              <span className="font-semibold text-gray-900">5</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Records updated</span>
              <span className="font-semibold text-gray-900">23</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Upcoming Tasks</h2>
          <span className="text-xs text-gray-500">{pendingTasks} pending</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${priorityColors[task.priority].replace('text-', 'bg-')}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-medium leading-snug">{task.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">Due {task.dueDate}</span>
                  {task.agentGenerated && (
                    <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                      <Bot size={9} />AI
                    </span>
                  )}
                </div>
              </div>
              <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {agentRuns.filter(r => r.status !== 'running').slice(0, 4).map((run) => (
          <div key={run.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                <Bot size={14} className="text-blue-600" />
              </div>
              <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">Done</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">{run.agentName}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{run.message}</p>
            <p className="text-xs text-gray-400 mt-2">{run.completedAt?.slice(11, 16)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function KpiCard({ label, value, change, positive, icon, bg }: {
  label: string; value: string; change: string; positive: boolean; icon: React.ReactNode; bg: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-xs mt-1 ${positive ? 'text-emerald-600' : 'text-amber-600'}`}>{change}</p>
    </div>
  );
}
