/**
 * Input Validation Utilities
 * ==========================
 * Validates user input across the application
 * Provides error messages and validation feedback
 */

/**
 * Validates API key format
 * @param {string} key - API key to validate
 * @returns {object} { isValid: boolean, error: string|null }
 */
export const validateAPIKey = (key) => {
  if (!key || typeof key !== 'string') {
    return { isValid: false, error: 'API key is required' };
  }

  if (key.trim().length < 10) {
    return { isValid: false, error: 'API key appears too short' };
  }

  return { isValid: true, error: null };
};

/**
 * Validates FOIA request inputs
 * @param {string} target - Target entity name
 * @param {string} records - Records requested
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateFOIAInput = (target, records) => {
  const errors = {};

  if (!target || target.trim().length === 0) {
    errors.target = 'Target entity is required';
  } else if (target.trim().length < 3) {
    errors.target = 'Target entity name is too short';
  }

  if (!records || records.trim().length === 0) {
    errors.records = 'Records requested is required';
  } else if (records.trim().length < 10) {
    errors.records = 'Please provide more detail about what records you need';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates debt amount format
 * @param {string} amount - Debt amount as string
 * @returns {object} { isValid: boolean, error: string|null, parsed: number }
 */
export const validateDebtAmount = (amount) => {
  if (!amount || amount.trim().length === 0) {
    return { isValid: false, error: 'Amount is required', parsed: null };
  }

  // Remove common currency symbols and spaces
  const cleaned = amount.replace(/[$,\s]/g, '');
  const parsed = parseFloat(cleaned);

  if (isNaN(parsed)) {
    return { isValid: false, error: 'Please enter a valid dollar amount', parsed: null };
  }

  if (parsed <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0', parsed: null };
  }

  if (parsed > 10000000) {
    return { isValid: false, error: 'Amount seems unusually large. Please verify.', parsed: null };
  }

  return { isValid: true, error: null, parsed };
};

/**
 * Validates tool input based on tool type
 * @param {string} toolId - Tool identifier
 * @param {string} input1 - Primary input
 * @param {string} input2 - Secondary input
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateToolInput = (toolId, input1, input2 = '') => {
  const errors = {};

  // All tools require at least input1
  if (!input1 || input1.trim().length === 0) {
    errors.input1 = 'This field is required';
    return { isValid: false, errors };
  }

  // Tool-specific validations
  switch (toolId) {
    case 'a2i':
      if (!input1.includes('$') && !input1.match(/\d+/)) {
        errors.input1 = 'Please include a dollar amount';
      }
      if (!input2 || input2.trim().length < 20) {
        errors.input2 = 'Please describe the proposed healing action in detail';
      }
      break;

    case 'foia':
      if (!input1 || input1.trim().length < 3) {
        errors.input1 = 'Please specify the target entity';
      }
      if (!input2 || input2.trim().length < 10) {
        errors.input2 = 'Please describe records you need in detail';
      }
      break;

    case 'decoder':
      if (input1.length < 20) {
        errors.input1 = 'Please provide more text to decode';
      }
      break;

    case 'painter':
      if (input1.length < 20) {
        errors.input1 = 'Please provide more detail about your vision';
      }
      break;

    case 'grant':
    case 'tutor':
    case 'mediator':
    case 'negotiator':
    case 'legacy':
      if (!input2 || input2.trim().length === 0) {
        errors.input2 = 'Context/details are required for this tool';
      }
      break;

    default:
      break;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL format
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitizes text input to prevent XSS
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export const sanitizeInput = (text) => {
  if (typeof text !== 'string') return '';

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

/**
 * Validates text length against min/max constraints
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length (default: 0)
 * @param {number} maxLength - Maximum length (default: Infinity)
 * @returns {object} { isValid: boolean, error: string|null }
 */
export const validateTextLength = (text, minLength = 0, maxLength = Infinity) => {
  if (!text) {
    return { isValid: minLength === 0, error: minLength > 0 ? 'Text is required' : null };
  }

  const len = text.trim().length;

  if (len < minLength) {
    return { isValid: false, error: `Text must be at least ${minLength} characters` };
  }

  if (len > maxLength) {
    return { isValid: false, error: `Text cannot exceed ${maxLength} characters` };
  }

  return { isValid: true, error: null };
};
