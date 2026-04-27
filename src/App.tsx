import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Pipeline from './pages/Pipeline';
import Agents from './pages/Agents';
import Contacts from './pages/Contacts';
import Reports from './pages/Reports';

type Page = 'dashboard' | 'leads' | 'pipeline' | 'agents' | 'contacts' | 'reports' | 'settings';

const pageMeta: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: 'Overview', subtitle: 'Real-time CRM insights powered by AI agents' },
  leads: { title: 'Leads', subtitle: 'Manage and track all incoming leads' },
  pipeline: { title: 'Sales Pipeline', subtitle: 'Track deals through every stage' },
  agents: { title: 'AI Agents', subtitle: 'Automate CRM operations with Claude-powered agents' },
  contacts: { title: 'Contacts', subtitle: 'Your customers and prospects' },
  reports: { title: 'Reports & Analytics', subtitle: 'Performance insights and trends' },
  settings: { title: 'Settings', subtitle: 'Configure your CRM and agents' },
};

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const meta = pageMeta[page];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar current={page} onChange={setPage} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 overflow-hidden">
          {page === 'dashboard' && <Dashboard />}
          {page === 'leads' && <Leads />}
          {page === 'pipeline' && <Pipeline />}
          {page === 'agents' && <Agents />}
          {page === 'contacts' && <Contacts />}
          {page === 'reports' && <Reports />}
          {page === 'settings' && (
            <div className="p-6 flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Settings panel coming soon</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
