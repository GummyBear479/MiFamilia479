/**
 * ToolSelector Component
 * ======================
 * Sidebar with all 20+ tools organized by category
 */

import { ASSISTANT_TOOL, SIMULATOR_TOOL, DEFENSE_TOOLS, GROWTH_TOOLS } from '../../constants/tools';
import Card from '../UI/Card';

export const ToolSelector = ({ activeTool, onToolSelect }) => {
  const toolCategories = [
    { id: 'concierge', label: 'Concierge', tools: [ASSISTANT_TOOL, SIMULATOR_TOOL] },
    { id: 'defense', label: 'Defense Tools', tools: DEFENSE_TOOLS },
    { id: 'growth', label: 'Growth Tools', tools: GROWTH_TOOLS },
  ];

  return (
    <Card className="p-4 space-y-2 h-full overflow-y-auto">
      {toolCategories.map((category) => (
        <div key={category.id}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">{category.label}</h3>

          {category.tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => onToolSelect(tool.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors mb-1 ${
                  isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-bold text-sm">{tool.label}</div>
                  <div className="text-xs opacity-70">{tool.description}</div>
                </div>
              </button>
            );
          })}

          {category.id !== toolCategories[toolCategories.length - 1].id && (
            <div className="my-2 border-b border-slate-100" />
          )}
        </div>
      ))}
    </Card>
  );
};

export default ToolSelector;
