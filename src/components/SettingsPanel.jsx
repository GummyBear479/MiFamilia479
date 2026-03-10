/**
 * SettingsPanel Component
 * ======================
 * UI for configuring API keys, persistence, and application preferences
 * Provides form for users to input and manage their Gemini API keys
 */

import { useState } from 'react';
import { Settings, Eye, EyeOff, Save, Trash2, Info, Check, AlertCircle } from 'lucide-react';
import Card from './UI/Card';
import InputField from './UI/InputField';
import ConfigService from '../services/configService';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const SettingsPanel = ({ isOpen, onClose }) => {
  const [geminiKey, setGeminiKey] = useLocalStorage('lf479_gemini_api_key', '');
  const [showKey, setShowKey] = useState(false);
  const [persistenceEnabled, setPersistenceEnabled] = useLocalStorage('lf479_persistence_enabled', 'true');
  const [saveStatus, setSaveStatus] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const handleSaveKeys = async () => {
    setValidationError(null);
    setSaveStatus(null);

    if (geminiKey.trim()) {
      const validation = ConfigService.validateKey(geminiKey);
      if (!validation) {
        setValidationError('Invalid API key format. Please check and try again.');
        return;
      }

      ConfigService.saveGeminiAPIKey(geminiKey);
    }

    setPersistenceEnabled(persistenceEnabled === 'true' ? 'true' : 'false');
    setSaveStatus('Settings saved successfully! ✅');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleClearKeys = () => {
    if (window.confirm('Are you sure? This will clear your stored API keys.')) {
      setGeminiKey('');
      ConfigService.clearGeminiAPIKey();
      setSaveStatus('API keys cleared. Settings saved.');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('This will clear all saved data including chat history. Are you sure?')) {
      ConfigService.clearAllData();
      setSaveStatus('All data cleared successfully.');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  if (!isOpen) return null;

  const envKeyExists = !!import.meta.env.VITE_GEMINI_API_KEY;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Messages */}
          {saveStatus && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-emerald-700">{saveStatus}</p>
            </div>
          )}

          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-rose-700">{validationError}</p>
            </div>
          )}

          {/* API Key Configuration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900">API Configuration</h3>
              {envKeyExists && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  .env configured
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600">
              Get your API key from{' '}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                Google AI Studio
              </a>
            </p>

            {/* Gemini API Key Input */}
            <div className="relative">
              <InputField
                label="Gemini API Key"
                type={showKey ? 'text' : 'password'}
                placeholder="sk-..."
                value={geminiKey}
                onChange={(e) => {
                  setGeminiKey(e.target.value);
                  setValidationError(null);
                }}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-8 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Preferences */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900">Preferences</h3>

            <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={persistenceEnabled === 'true'}
                onChange={(e) => setPersistenceEnabled(e.target.checked ? 'true' : 'false')}
                className="w-4 h-4 rounded border-slate-300 mt-0.5"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">Save Chat History</p>
                <p className="text-xs text-slate-600">Store conversations locally for later access</p>
              </div>
            </label>
          </div>

          <hr className="border-slate-200" />

          {/* Diagnostics Info */}
          <details className="space-y-2">
            <summary className="text-sm font-bold text-slate-900 cursor-pointer hover:text-slate-700 flex items-center gap-2">
              <Info className="w-4 h-4" />
              System Information
            </summary>
            <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded mt-2">
              <p>
                <strong>Environment:</strong> {import.meta.env.MODE}
              </p>
              <p>
                <strong>Gemini Key Configured:</strong>{' '}
                {ConfigService.isGeminiConfigured(geminiKey) ? '✅ Yes' : '❌ No'}
              </p>
              <p>
                <strong>Persistence:</strong> {persistenceEnabled === 'true' ? '✅ Enabled' : '❌ Disabled'}
              </p>
            </div>
          </details>

          <hr className="border-slate-200" />

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleSaveKeys}
              className="w-full px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>

            <button
              onClick={handleClearKeys}
              className="w-full px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear API Keys
            </button>

            <button
              onClick={handleClearAllData}
              className="w-full px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All Data
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center">
            🔒 Your API keys are stored securely in your browser's local storage and never sent to our servers.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;
