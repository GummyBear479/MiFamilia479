/**
 * HealingLedger Component
 * =======================
 * Verified contributions tracker and Co-Care Credits display
 */

import { CheckCircle } from 'lucide-react';
import Card from '../UI/Card';
import { VERIFIED_CONTRIBUTIONS } from '../../constants/mockData';

export const HealingLedger = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif">The Healing Ledger</h2>
          <p className="text-slate-500">Converting non-monetary contribution into verifiable equity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verified Contributions List */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-bold text-slate-900 mb-4">Recent Verified Contributions</h3>
          <div className="space-y-4">
            {VERIFIED_CONTRIBUTIONS.map((contrib) => (
              <div key={contrib.id} className="flex items-center p-3 border border-slate-100 rounded-lg hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{contrib.activity}</p>
                  <p className="text-xs text-slate-500">Verified by {contrib.verifier}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-700">+ ${contrib.value.toFixed(2)}</p>
                  <p className="text-xs text-slate-400">Equivalent Value</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Co-Care Credits & Info */}
        <div className="space-y-6">
          {/* Co-Care Credits Card */}
          <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h3 className="text-lg font-bold font-serif mb-1">Co-Care Credits</h3>
            <p className="text-3xl font-bold text-amber-400 mb-6">
              2,450 <span className="text-sm text-slate-400 font-normal">Credits</span>
            </p>

            <div className="space-y-3">
              <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors">
                Log Activity
              </button>
              <button className="w-full py-2 bg-transparent border border-slate-600 hover:border-slate-500 rounded-lg text-sm font-medium transition-colors">
                View Wallet
              </button>
            </div>
          </Card>

          {/* Formula Card */}
          <Card className="p-6 border-l-4 border-emerald-500">
            <h4 className="font-bold text-slate-900 mb-2">The Formula</h4>
            <p className="text-sm text-slate-600 italic">
              "Sovereignty + Perishable Capital Conversion + Healing Infrastructure = Predictable Thriving"
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealingLedger;
