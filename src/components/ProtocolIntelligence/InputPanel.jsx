/**
 * InputPanel Component
 * ====================
 * Displays input fields based on active tool
 * Handles chat mode and various tool input configurations
 */

import { Send, Sparkles } from 'lucide-react';
import Card from '../UI/Card';
import InputField from '../UI/InputField';
import LoadingSpinner from '../UI/LoadingSpinner';
import { getToolById } from '../../constants/tools';

export const InputPanel = ({
  activeTool,
  input1,
  onInput1Change,
  input2,
  onInput2Change,
  errors,
  loading,
  onSubmit,
  chatHistory = null,
}) => {
  const tool = getToolById(activeTool);

  // Chat mode for assistant
  if (chatHistory) {
    return (
      <Card className="p-6 flex-shrink-0">
        <div className="space-y-4">
          {/* Chat history display */}
          <div className="h-64 overflow-y-auto border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-lg p-3">
                  <LoadingSpinner size="sm" message="Writing..." />
                </div>
              </div>
            )}
          </div>

          {/* Message input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input1}
              onChange={(e) => onInput1Change(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-slate-50"
            />
            <button
              onClick={onSubmit}
              disabled={loading || !input1}
              className="bg-emerald-700 text-white p-2 rounded-lg hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    );
  }

  // Tool-specific input mode
  return (
    <Card className="p-6 flex-shrink-0">
      <div className="space-y-4">
        {/* Generic input fields */}
        <InputField
          label={tool?.inputs[0]?.label || 'Input Data'}
          placeholder={tool?.inputs[0]?.placeholder || 'Enter your input...'}
          value={input1}
          onChange={(e) => onInput1Change(e.target.value)}
          error={errors.input1}
          multiline={activeTool === 'sentinel' || activeTool === 'painter' || activeTool === 'social'}
          rows={4}
        />

        {/* Second input (if needed) */}
        {tool?.inputs && tool.inputs.length > 1 && (
          <InputField
            label={tool.inputs[1]?.label || 'Additional Input'}
            placeholder={tool.inputs[1]?.placeholder || 'Enter additional input...'}
            value={input2}
            onChange={(e) => onInput2Change(e.target.value)}
            error={errors.input2}
            multiline={true}
            rows={3}
          />
        )}

        {/* Submit button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onSubmit}
            disabled={loading || !input1}
            className={`px-6 py-2 bg-emerald-700 text-white rounded-lg font-bold shadow-sm flex items-center transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-800 hover:shadow-md'
            }`}
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate ✨
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default InputPanel;
