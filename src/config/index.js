/**
 * Configuration Manager
 * =====================
 * Loads and manages API keys from multiple sources:
 * 1. Environment variables (.env.local)
 * 2. localStorage (user-provided at runtime)
 * 3. Settings panel (user-provided in app)
 *
 * Priority order: Settings panel > localStorage > .env variables
 */

const CONFIG_KEYS = {
  GEMINI_API_KEY: 'VITE_GEMINI_API_KEY',
  IMAGEN_API_KEY: 'VITE_IMAGEN_API_KEY',
};

const STORAGE_KEYS = {
  GEMINI_API_KEY: 'lf479_gemini_api_key',
  IMAGEN_API_KEY: 'lf479_imagen_api_key',
  PERSISTENCE_ENABLED: 'lf479_persistence_enabled',
};

/**
 * Get API key from all available sources
 * Priority: settings override > localStorage > environment variable
 * @param {string} keyName - Name of the key (e.g., 'GEMINI_API_KEY')
 * @param {string} settingsOverride - Optional override from settings panel
 * @returns {string|null} API key or null if not found
 */
export const getAPIKey = (keyName, settingsOverride = null) => {
  // 1. Check settings override (highest priority)
  if (settingsOverride && typeof settingsOverride === 'string' && settingsOverride.trim()) {
    return settingsOverride.trim();
  }

  // 2. Check localStorage
  const storageKey = STORAGE_KEYS[keyName];
  if (storageKey) {
    try {
      const storedKey = localStorage.getItem(storageKey);
      if (storedKey && storedKey.trim()) {
        return storedKey.trim();
      }
    } catch (e) {
      console.warn(`Failed to read ${keyName} from localStorage:`, e);
    }
  }

  // 3. Check environment variables
  const envKey = CONFIG_KEYS[keyName];
  if (envKey) {
    const envValue = import.meta.env[envKey];
    if (envValue && typeof envValue === 'string' && envValue.trim()) {
      return envValue.trim();
    }
  }

  return null;
};

/**
 * Get Gemini API key
 * @param {string} override - Optional override from settings panel
 * @returns {string|null} API key
 */
export const getGeminiAPIKey = (override = null) => {
  return getAPIKey('GEMINI_API_KEY', override);
};

/**
 * Get Imagen API key
 * @param {string} override - Optional override from settings panel
 * @returns {string|null} API key
 */
export const getImagenAPIKey = (override = null) => {
  return getAPIKey('IMAGEN_API_KEY', override);
};

/**
 * Save API key to localStorage
 * @param {string} keyName - Name of the key (e.g., 'GEMINI_API_KEY')
 * @param {string} keyValue - API key value
 * @returns {boolean} Success status
 */
export const saveAPIKeyToStorage = (keyName, keyValue) => {
  const storageKey = STORAGE_KEYS[keyName];
  if (!storageKey) {
    console.warn(`Unknown key name: ${keyName}`);
    return false;
  }

  try {
    if (keyValue && typeof keyValue === 'string') {
      localStorage.setItem(storageKey, keyValue.trim());
      return true;
    } else {
      localStorage.removeItem(storageKey);
      return true;
    }
  } catch (e) {
    console.error(`Failed to save ${keyName} to localStorage:`, e);
    return false;
  }
};

/**
 * Clear API key from localStorage
 * @param {string} keyName - Name of the key
 * @returns {boolean} Success status
 */
export const clearAPIKey = (keyName) => {
  return saveAPIKeyToStorage(keyName, null);
};

/**
 * Check if API key is configured (from any source)
 * @param {string} keyName - Name of the key
 * @param {string} override - Optional override
 * @returns {boolean} True if key is available
 */
export const isAPIKeyConfigured = (keyName, override = null) => {
  return !!getAPIKey(keyName, override);
};

/**
 * Get all configured API keys (useful for diagnostics)
 * @returns {object} Object with key availability status
 */
export const getConfigStatus = () => {
  return {
    geminiFromEnv: !!import.meta.env.VITE_GEMINI_API_KEY,
    geminiFromStorage: !!localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY),
    imagenFromEnv: !!import.meta.env.VITE_IMAGEN_API_KEY,
    imagenFromStorage: !!localStorage.getItem(STORAGE_KEYS.IMAGEN_API_KEY),
    persistenceEnabled: getPersistenceEnabled(),
  };
};

/**
 * Get persistence setting
 * @returns {boolean} Whether persistence is enabled
 */
export const getPersistenceEnabled = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PERSISTENCE_ENABLED);
    return stored === null ? true : stored === 'true'; // Default to true
  } catch {
    return true;
  }
};

/**
 * Set persistence preference
 * @param {boolean} enabled - Whether to enable persistence
 */
export const setPersistenceEnabled = (enabled) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PERSISTENCE_ENABLED, enabled ? 'true' : 'false');
  } catch (e) {
    console.warn('Failed to save persistence setting:', e);
  }
};

/**
 * Clear all stored data including chat history
 * @returns {boolean} Success status
 */
export const clearAllStoredData = () => {
  try {
    // Clear API keys
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    // Clear chat history
    localStorage.removeItem('lf479_chat_history');

    // Clear any other LF479-specific data
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('lf479_')) {
        localStorage.removeItem(key);
      }
    });

    return true;
  } catch (e) {
    console.error('Failed to clear stored data:', e);
    return false;
  }
};

/**
 * Export current configuration (for backup/debugging)
 * Note: Does NOT include actual API keys for security
 * @returns {object} Configuration status
 */
export const exportConfigStatus = () => {
  return {
    timestamp: new Date().toISOString(),
    hasGeminiKey: isAPIKeyConfigured('GEMINI_API_KEY'),
    hasImagenKey: isAPIKeyConfigured('IMAGEN_API_KEY'),
    persistenceEnabled: getPersistenceEnabled(),
    environment: import.meta.env.MODE,
  };
};

/**
 * Validate API key format
 * @param {string} key - Key to validate
 * @returns {object} { isValid: boolean, error: string|null }
 */
export const validateAPIKeyFormat = (key) => {
  if (!key || typeof key !== 'string') {
    return { isValid: false, error: 'API key is required' };
  }

  const trimmed = key.trim();
  if (trimmed.length < 10) {
    return { isValid: false, error: 'API key appears too short' };
  }

  // Basic check - should not look like placeholder
  if (trimmed === 'your-api-key' || trimmed === 'your_api_key') {
    return { isValid: false, error: 'Please enter a valid API key' };
  }

  return { isValid: true, error: null };
};

export default {
  getGeminiAPIKey,
  getImagenAPIKey,
  saveAPIKeyToStorage,
  clearAPIKey,
  isAPIKeyConfigured,
  getConfigStatus,
  getPersistenceEnabled,
  setPersistenceEnabled,
  clearAllStoredData,
  exportConfigStatus,
  validateAPIKeyFormat,
};
