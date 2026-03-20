/**
 * Sidebar Component
 * =================
 * Desktop navigation sidebar with status indicator
 */

import { Shield } from 'lucide-react';

export const Sidebar = ({ activeTab, onTabChange, navItems }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">LA FAMILIA 479</h1>
            <p className="text-xs text-slate-500 font-serif italic">The Dignity Protocol</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Status Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-900 rounded-lg p-4 text-white">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Status</h3>
          <div className="flex items-center text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
            System Operational
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
