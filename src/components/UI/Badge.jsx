/**
 * Badge Component
 * ===============
 * Status badge with color variants for FOIA tracking and task progress
 */

import { STATUS_COLORS } from '../../constants/colors';

export const Badge = ({ status = 'Draft', size = 'sm', className = '' }) => {
  const colorConfig = STATUS_COLORS[status] || STATUS_COLORS.Draft;
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`${colorConfig.bg} ${colorConfig.text} ${sizeClasses} rounded-full font-medium inline-block ${className}`}
    >
      {status}
    </span>
  );
};

export default Badge;
