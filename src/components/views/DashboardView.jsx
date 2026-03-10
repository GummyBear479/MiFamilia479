/**
 * DashboardView Component
 * =======================
 * Executive overview with key metrics and the Inversion Curve chart
 */

import { Users, Leaf, Lock, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../UI/Card';
import { HEALING_DATA } from '../../constants/mockData';
import { BRAND_COLORS, METRIC_COLORS } from '../../constants/colors';

export const DashboardView = () => {
  const metrics = [
    {
      label: 'Verifiable Healing',
      value: '1,240 hrs',
      subtext: '↑ 12% vs last month',
      icon: Leaf,
      colorKey: 'healing',
    },
    {
      label: 'Assets Secured',
      value: '$450k',
      subtext: 'Land Trust Equity Value',
      icon: Lock,
      colorKey: 'gold',
    },
    {
      label: 'Systemic Waste',
      value: '$2.3M',
      subtext: 'Identified via FOIA (YTD)',
      icon: AlertTriangle,
      colorKey: 'waste',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif">Executive Overview</h2>
          <p className="text-slate-500">Monitoring the conversion of Perishable Capital into Sovereign Assets.</p>
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center">
          <Users className="w-4 h-4 mr-2" />
          New Family Intake
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const colors = METRIC_COLORS[metric.colorKey];

          return (
            <Card key={metric.label} className={`p-6 ${colors.border}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{metric.label}</p>
                  <h3 className={`text-3xl font-bold ${colors.icon} mt-1`}>{metric.value}</h3>
                </div>
                <div className={`p-2 ${colors.bg} rounded-lg`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
              </div>
              <div className="text-sm text-slate-600">{metric.subtext}</div>
            </Card>
          );
        })}
      </div>

      {/* Main Chart */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">The Inversion Curve</h3>
          <p className="text-sm text-slate-500">Visualizing the shift from punitive costs (Waste) to community value (Assets).</p>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HEALING_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAsset" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS.healing} stopOpacity={0.1} />
                  <stop offset="95%" stopColor={BRAND_COLORS.healing} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLORS.waste} stopOpacity={0.1} />
                  <stop offset="95%" stopColor={BRAND_COLORS.waste} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area
                type="monotone"
                dataKey="waste"
                stroke={BRAND_COLORS.waste}
                fillOpacity={1}
                fill="url(#colorWaste)"
                name="System Waste ($)"
              />
              <Area
                type="monotone"
                dataKey="asset"
                stroke={BRAND_COLORS.healing}
                fillOpacity={1}
                fill="url(#colorAsset)"
                name="Community Assets ($)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default DashboardView;
