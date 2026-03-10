/**
 * Text Formatting Utilities
 * =========================
 * Helper functions for formatting text, dates, currencies, and other data for display
 */

/**
 * Formats a number as USD currency
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale code (default: 'en-US')
 * @returns {string} Formatted currency string (e.g., "$1,234.56")
 */
export const formatCurrency = (amount, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    // Remove trailing zeros for whole numbers
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a date string to a readable format
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date (e.g., "February 10, 2025")
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', defaultOptions);
  } catch (e) {
    return 'Invalid date';
  }
};

/**
 * Formats a date and time string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted datetime (e.g., "Feb 10, 2025 at 2:30 PM")
 */
export const formatDateTime = (date) => {
  return formatDate(date, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Truncates text to a maximum length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix for truncated text (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalizes the first letter of a string
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Converts a string to title case
 * @param {string} text - Text to convert
 * @returns {string} Title case text
 */
export const toTitleCase = (text) => {
  if (!text) return '';
  return text
    .split(/\s+/)
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Formats a phone number (assumes US format)
 * @param {string} phone - Phone number digits
 * @returns {string} Formatted phone number (e.g., "(501) 234-5678")
 */
export const formatPhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

/**
 * Formats a number with thousands separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1,234,567")
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Converts bytes to human-readable file size
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted file size (e.g., "2.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Formats a duration in milliseconds to a readable string
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} Formatted duration (e.g., "2h 30m 15s")
 */
export const formatDuration = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
};

/**
 * Splits a long text into lines of maximum width (for display purposes)
 * @param {string} text - Text to split
 * @param {number} maxWidth - Maximum width (character count per line)
 * @returns {string[]} Array of text lines
 */
export const wrapText = (text, maxWidth = 80) => {
  if (!text) return [];

  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length > maxWidth) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine ? ' ' : '') + word;
    }
  }

  if (currentLine) lines.push(currentLine.trim());
  return lines;
};

/**
 * Extracts initials from a full name
 * @param {string} fullName - Full name
 * @returns {string} Initials (e.g., "AB" from "Alice Brown")
 */
export const getInitials = (fullName) => {
  if (!fullName) return '??';
  return fullName
    .split(/\s+/)
    .map((name) => name.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

/**
 * Formats a status string for display
 * Converts 'Pending' to 'Pending', 'OVERDUE' to 'Overdue', etc.
 * @param {string} status - Status string
 * @returns {string} Formatted status
 */
export const formatStatus = (status) => {
  if (!status) return 'Unknown';
  return status
    .toLowerCase()
    .split(/[-_\s]/)
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Abbreviates a string with a max length, preserving the beginning and end
 * @param {string} text - Text to abbreviate
 * @param {number} maxLength - Maximum length (must be > 5)
 * @returns {string} Abbreviated text (e.g., "Lorem ... dolor")
 */
export const abbreviate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  if (maxLength < 6) return '...';

  const sideLength = Math.floor((maxLength - 5) / 2);
  return `${text.substring(0, sideLength)} ... ${text.substring(text.length - sideLength)}`;
};
