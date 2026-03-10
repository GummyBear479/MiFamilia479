/**
 * FOIAManager Component
 * =====================
 * FOIA request tracker and execution tools
 */

import { Sparkles, Clock, ChevronRight } from 'lucide-react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import { FOIA_STATUS } from '../../constants/mockData';

export const FOIAManager = ({ onAIToolClick = () => {} }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif">FOIA Execution Tracker</h2>
          <p className="text-slate-500">Status of the 11 strategic information requests.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            Export Report
          </button>
          <button
            onClick={() => onAIToolClick('foia')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Draft Request with AI
          </button>
        </div>
      </div>

      {/* FOIA Status Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Target Entity</th>
                <th className="px-6 py-3 font-semibold">Data Requested</th>
                <th className="px-6 py-3 font-semibold">Submission Date</th>
                <th className="px-6 py-3 font-semibold">Legal Deadline</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FOIA_STATUS.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.target}</td>
                  <td className="px-6 py-4 text-slate-600">{item.topic}</td>
                  <td className="px-6 py-4 text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono">{item.deadline}</td>
                  <td className="px-6 py-4">
                    <Badge status={item.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h4 className="font-bold text-blue-900 flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2" />
            Current Sprint
          </h4>
          <p className="text-sm text-blue-800 mb-4">
            Week of Feb 10-14: Focus on DHS and DOC email submissions.
          </p>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs text-blue-600 mt-2 text-right">45% Complete</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl text-white">
          <h4 className="font-bold mb-2">Evidence Vault</h4>
          <p className="text-sm text-slate-300 mb-4">
            Once data arrives, input specific dollar amounts into the Protocol Calculator to update the pitch deck automatically.
          </p>
          <button className="text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors">
            Access Vault →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FOIAManager;
