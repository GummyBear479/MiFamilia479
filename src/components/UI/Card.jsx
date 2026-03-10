/**
 * Card Component
 * ==============
 * Reusable card container with consistent styling
 */

export const Card = ({ children, className = '', onClick = null, hoverable = false }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${
      hoverable ? 'hover:shadow-md hover:border-slate-300 transition-all cursor-pointer' : ''
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export default Card;
