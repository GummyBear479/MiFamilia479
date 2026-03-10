/**
 * InputField Component
 * ====================
 * Standardized input field with validation feedback and error display
 */

import { X, CheckCircle, AlertCircle } from 'lucide-react';

export const InputField = ({
  label = null,
  type = 'text',
  placeholder = '',
  value = '',
  onChange = () => {},
  error = null,
  success = false,
  disabled = false,
  required = false,
  clearable = false,
  onClear = () => {},
  multiline = false,
  rows = 3,
  className = '',
  maxLength = null,
}) => {
  const baseClasses =
    'w-full border rounded-lg p-2 focus:outline-none focus:ring-2 transition-all font-sans text-sm';
  const baseStyles = disabled
    ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
    : 'bg-white border-slate-300 focus:ring-emerald-500';
  const errorStyles = error ? 'border-rose-300 focus:ring-rose-500' : '';
  const successStyles = success && !error ? 'border-emerald-300' : '';

  const Component = multiline ? 'textarea' : 'input';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
          {label}
          {required && <span className="text-rose-600 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <Component
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          rows={multiline ? rows : undefined}
          className={`${baseClasses} ${baseStyles} ${errorStyles} ${successStyles} ${className}`}
        />

        {/* Clearable button */}
        {clearable && value && (
          <button
            onClick={onClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex="-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Status icons */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {error && <AlertCircle className="w-4 h-4 text-rose-600" />}
          {success && !error && <CheckCircle className="w-4 h-4 text-emerald-600" />}
        </div>
      </div>

      {/* Error message */}
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}

      {/* Character count */}
      {maxLength && (
        <p className="text-xs text-slate-400 mt-1 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};

export default InputField;
