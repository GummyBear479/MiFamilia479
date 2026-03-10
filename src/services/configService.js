/**
 * Config Service
 * ==============
 * Service wrapper around configuration management
 * Handles API keys, settings, and application preferences
 */

import {
  getGeminiAPIKey,
  getImagenAPIKey,
  saveAPIKeyToStorage,
  clearAPIKey,
  isAPIKeyConfigured,
  getConfigStatus,
  getPersistenceEnabled,
  setPersistenceEnabled,
  clearAllStoredData,
  validateAPIKeyFormat,
} from '../config/index';

class ConfigService {
  /**
   * Get Gemini API key from all sources
   * Priority: settings override > localStorage > .env
   */
  static getGeminiAPIKey(override = null) {
    return getGeminiAPIKey(override);
  }

  /**
   * Get Imagen API key from all sources
   */
  static getImagenAPIKey(override = null) {
    return getImagenAPIKey(override);
  }

  /**
   * Save Gemini API key to localStorage
   */
  static saveGeminiAPIKey(key) {
    if (!this.validateKey(key)) {
      throw new Error('Invalid API key format');
    }
    return saveAPIKeyToStorage('GEMINI_API_KEY', key);
  }

  /**
   * Save Imagen API key to localStorage
   */
  static saveImagenAPIKey(key) {
    if (!this.validateKey(key)) {
      throw new Error('Invalid API key format');
    }
    return saveAPIKeyToStorage('IMAGEN_API_KEY', key);
  }

  /**
   * Clear Gemini API key
   */
  static clearGeminiAPIKey() {
    return clearAPIKey('GEMINI_API_KEY');
  }

  /**
   * Clear Imagen API key
   */
  static clearImagenAPIKey() {
    return clearAPIKey('IMAGEN_API_KEY');
  }

  /**
   * Check if Gemini API key is configured
   */
  static isGeminiConfigured(override = null) {
    return isAPIKeyConfigured('GEMINI_API_KEY', override);
  }

  /**
   * Check if Imagen API key is configured
   */
  static isImagenConfigured(override = null) {
    return isAPIKeyConfigured('IMAGEN_API_KEY', override);
  }

  /**
   * Get complete configuration status
   */
  static getStatus() {
    return getConfigStatus();
  }

  /**
   * Check if persistence (localStorage) is enabled
   */
  static isPersistenceEnabled() {
    return getPersistenceEnabled();
  }

  /**
   * Set persistence preference
   */
  static setPersistence(enabled) {
    setPersistenceEnabled(enabled);
  }

  /**
   * Validate API key format
   */
  static validateKey(key) {
    const validation = validateAPIKeyFormat(key);
    return validation.isValid;
  }

  /**
   * Get validation error for key
   */
  static getKeyError(key) {
    const validation = validateAPIKeyFormat(key);
    return validation.error;
  }

  /**
   * Clear all application data (except env variables)
   * Used for reset/logout
   */
  static clearAllData() {
    return clearAllStoredData();
  }

  /**
   * Get application info and config status
   * Useful for diagnostics and debugging
   */
  static getDiagnostics() {
    return {
      timestamp: new Date().toISOString(),
      config: this.getStatus(),
      environment: import.meta.env.MODE,
      userAgent: navigator.userAgent,
    };
  }

  /**
   * Check if running in development or production
   */
  static isDevelopment() {
    return import.meta.env.DEV;
  }

  /**
   * Check if running in production
   */
  static isProduction() {
    return import.meta.env.PROD;
  }

  /**
   * Log current configuration status (for debugging)
   */
  static logStatus() {
    const status = this.getStatus();
    console.group('🔧 La Familia 479 Config Status');
    console.log('Gemini API Key:', status.geminiFromEnv || status.geminiFromStorage ? '✅ Configured' : '❌ Not configured');
    console.log('Imagen API Key:', status.imagenFromEnv || status.imagenFromStorage ? '✅ Configured' : '❌ Not configured');
    console.log('Persistence Enabled:', status.persistenceEnabled ? '✅ Yes' : '❌ No');
    console.log('Sources:');
    console.log('  - Gemini from .env:', status.geminiFromEnv ? '✅' : '❌');
    console.log('  - Gemini from localStorage:', status.geminiFromStorage ? '✅' : '❌');
    console.log('  - Imagen from .env:', status.imagenFromEnv ? '✅' : '❌');
    console.log('  - Imagen from localStorage:', status.imagenFromStorage ? '✅' : '❌');
    console.groupEnd();
  }
}

export default ConfigService;
