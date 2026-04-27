import { Search, Plus, Phone, Mail, Building2, Star } from 'lucide-react';
import { contacts } from '../data/staticData';

const statusConfig = {
  customer: { label: 'Customer', color: 'bg-emerald-100 text-emerald-700' },
  prospect: { label: 'Prospect', color: 'bg-blue-100 text-blue-700' },
  churned: { label: 'Churned', color: 'bg-gray-100 text-gray-600' },
};

export default function Contacts() {
  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search contacts..." />
        </div>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={13} /> Add Contact
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => c.status === 'customer').length}</p>
          <p className="text-xs text-gray-500 mt-1">Customers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => c.status === 'prospect').length}</p>
          <p className="text-xs text-gray-500 mt-1">Prospects</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{contacts.reduce((s, c) => s + c.totalDeals, 0)}</p>
          <p className="text-xs text-gray-500 mt-1">Total Deals</p>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-3 gap-4">
        {contacts.map((contact) => {
          const status = statusConfig[contact.status];
          return (
            <div key={contact.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 ${contact.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.title}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>{status.label}</span>
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Building2 size={12} className="text-gray-400" />
                  {contact.company}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Mail size={12} className="text-gray-400" />
                  {contact.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone size={12} className="text-gray-400" />
                  {contact.phone}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  {contact.totalDeals} deal{contact.totalDeals !== 1 ? 's' : ''}
                </div>
                <p className="text-xs text-gray-400">Last: {contact.lastInteraction}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
