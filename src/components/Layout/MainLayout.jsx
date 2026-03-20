/**
 * MainLayout Component
 * ====================
 * Main application layout with sidebar, mobile header, and content area
 */

import { useState } from 'react';
import { Activity, FileText, Leaf, Sparkles, Database } from 'lucide-react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Command Center', icon: Activity },
  { id: 'foia', label: 'FOIA Execution', icon: FileText },
  { id: 'healing', label: 'Healing Ledger', icon: Leaf },
  { id: 'ai_tools', label: 'Protocol Intelligence', icon: Sparkles },
  { id: 'brand', label: 'Brand & Tech Kit', icon: Database },
];

export const MainLayout = ({ children, activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (tabId) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={handleNavigation} navItems={NAV_ITEMS} />

      {/* Mobile Header */}
      <MobileHeader isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-4">
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto md:p-8 p-4 pt-20 md:pt-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
