import { LayoutDashboard, Users, GitBranch, Bot, Contact, BarChart3, Settings, Zap } from 'lucide-react';

type Page = 'dashboard' | 'leads' | 'pipeline' | 'agents' | 'contacts' | 'reports' | 'settings';

interface SidebarProps {
  current: Page;
  onChange: (page: Page) => void;
}

const navItems = [
  { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads' as Page, label: 'Leads', icon: Users },
  { id: 'pipeline' as Page, label: 'Pipeline', icon: GitBranch },
  { id: 'agents' as Page, label: 'AI Agents', icon: Bot },
  { id: 'contacts' as Page, label: 'Contacts', icon: Contact },
  { id: 'reports' as Page, label: 'Reports', icon: BarChart3 },
];

export default function Sidebar({ current, onChange }: SidebarProps) {
  return (
    <aside className="w-60 bg-gray-950 text-gray-300 flex flex-col h-full flex-shrink-0">
      <div className="px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">CRM Agents</p>
            <p className="text-gray-500 text-xs">Powered by Claude</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              current === id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
            }`}
          >
            <Icon size={16} />
            {label}
            {id === 'agents' && (
              <span className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-800">
        <button
          onClick={() => onChange('settings' as Page)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-100 transition-all"
        >
          <Settings size={16} />
          Settings
        </button>
        <div className="mt-4 px-3 py-3 bg-gray-900 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Agent Activity</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <p className="text-xs text-emerald-400 font-medium">5 agents active</p>
          </div>
          <div className="mt-2 w-full bg-gray-800 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '72%' }} />
          </div>
          <p className="text-xs text-gray-600 mt-1">72% capacity</p>
        </div>
      </div>
    </aside>
  );
}
