/**
 * MobileHeader Component
 * ======================
 * Mobile navigation header with menu toggle
 */

import { Shield, Menu, X } from 'lucide-react';

export const MobileHeader = ({ isMobileMenuOpen, onMenuToggle }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-slate-900">LF479</span>
      </div>

      {/* Menu Toggle */}
      <button onClick={onMenuToggle} className="text-slate-700 hover:text-slate-900 transition-colors">
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default MobileHeader;
