/**
 * THE DIGNITY PROTOCOL BRAND COLOR PALETTE
 * ==========================================
 * Centralized color definitions for consistent theming across the application
 */

export const BRAND_COLORS = {
  // Primary: Sovereignty Blue - represents law, structure, authority
  sovereignty: '#0f172a', // slate-900

  // Secondary: Land Trust Green - represents growth, healing, community
  healing: '#047857', // emerald-700

  // Accent: Asset Gold - represents value, capital, opportunity
  gold: '#f59e0b', // amber-500

  // Status: Alert Red - represents urgency, perishable waste
  waste: '#e11d48', // rose-600
};

/**
 * Status badge color variants
 * Used for FOIA status, task progress, and other indicators
 */
export const STATUS_COLORS = {
  Pending: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    hex: '#3b82f6',
  },
  Received: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    hex: '#10b981',
  },
  Overdue: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    hex: '#f43f5e',
  },
  Draft: {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    hex: '#64748b',
  },
};

/**
 * Metric card highlight colors
 * Used in dashboard KPI cards
 */
export const METRIC_COLORS = {
  healing: {
    bg: 'bg-emerald-100',
    icon: 'text-emerald-700',
    border: 'border-l-emerald-500',
  },
  gold: {
    bg: 'bg-amber-100',
    icon: 'text-amber-600',
    border: 'border-l-amber-500',
  },
  waste: {
    bg: 'bg-rose-100',
    icon: 'text-rose-600',
    border: 'border-l-rose-500',
  },
};
