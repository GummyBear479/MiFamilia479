/**
 * MOCK DATA FOR VISUALIZATION
 * ============================
 * Sample data used across the application for charts, tables, and demonstrations
 */

/**
 * The Inversion Curve - visualizes the shift from system waste (punitive costs)
 * to community assets (verifiable healing)
 */
export const HEALING_DATA = [
  { month: 'Jan', waste: 45000, asset: 12000 },
  { month: 'Feb', waste: 42000, asset: 18000 },
  { month: 'Mar', waste: 38000, asset: 25000 },
  { month: 'Apr', waste: 31000, asset: 35000 },
  { month: 'May', waste: 24000, asset: 48000 },
  { month: 'Jun', waste: 18000, asset: 62000 },
];

/**
 * FOIA Request Tracker Status
 * Tracks strategic information requests to government entities
 */
export const FOIA_STATUS = [
  {
    id: 1,
    target: 'Arkansas DHS',
    topic: 'Foster Care Expenditures',
    status: 'Pending',
    date: '2025-02-10',
    deadline: '2025-02-13',
  },
  {
    id: 2,
    target: 'Arkansas DOC',
    topic: 'Jail Backup Contracts',
    status: 'Received',
    date: '2025-02-10',
    deadline: '2025-02-13',
  },
  {
    id: 3,
    target: 'Van Buren Municipal',
    topic: 'Fines & Fees Data',
    status: 'Overdue',
    date: '2025-02-05',
    deadline: '2025-02-08',
  },
  {
    id: 4,
    target: 'Sebastian Co. Court',
    topic: 'Poverty Line Collections',
    status: 'Pending',
    date: '2025-02-11',
    deadline: '2025-02-14',
  },
];

/**
 * Sample Verified Contributions for Healing Ledger
 * These demonstrate how non-monetary co-care is converted to equity
 */
export const VERIFIED_CONTRIBUTIONS = [
  {
    id: 1,
    activity: 'Childcare Exchange (4 hrs)',
    verifier: 'Community Steward',
    value: 120.0,
  },
  {
    id: 2,
    activity: 'Home Repair Assistance (6 hrs)',
    verifier: 'Community Steward',
    value: 180.0,
  },
  {
    id: 3,
    activity: 'Mental Health Support Group (3 hrs)',
    verifier: 'Community Steward',
    value: 90.0,
  },
];
