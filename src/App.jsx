import { useState } from 'react';
import { Cog } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import MainLayout from './components/Layout/MainLayout';
import SettingsPanel from './components/SettingsPanel';
import DashboardView from './components/views/DashboardView';
import FOIAManager from './components/views/FOIAManager';
import HealingLedger from './components/views/HealingLedger';
import ProtocolIntelligence from './components/views/ProtocolIntelligence';
import BrandSystem from './components/views/BrandSystem';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'foia':
        return <FOIAManager onAIToolClick={(toolId) => setActiveTab('ai_tools')} />;
      case 'healing':
        return <HealingLedger />;
      case 'ai_tools':
        return <ProtocolIntelligence />;
      case 'brand':
        return <BrandSystem />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <ErrorBoundary>
      <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <div className="space-y-6">
          {/* Settings Button */}
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-lg transition-all hover:shadow-xl"
              title="Open Settings"
            >
              <Cog className="w-6 h-6" />
            </button>
          </div>

          {/* Main Content */}
          {renderContent()}
        </div>

        {/* Settings Panel */}
        <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </MainLayout>
    </ErrorBoundary>
  );
}

export default App;
