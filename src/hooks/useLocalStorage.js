/**
 * useLocalStorage Hook
 * ====================
 * Generic hook for persisting data to localStorage
 * Automatically syncs state between tabs and handles errors gracefully
 */

import { useState, useEffect } from 'react';

/**
 * Hook for syncing state with localStorage
 * @param {string} key - localStorage key
 * @param {*} initialValue - Default value if key doesn't exist
 * @returns {array} [storedValue, setStoredValue, clearValue]
 *
 * @example
 * const [name, setName] = useLocalStorage('user_name', 'Anonymous');
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    if (!key) {
      console.warn('useLocalStorage: No key provided');
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      if (item) {
        // Parse stored JSON or return as-is if not JSON
        try {
          return JSON.parse(item);
        } catch {
          return item;
        }
      }
    } catch (error) {
      console.warn(`useLocalStorage: Failed to read ${key} from localStorage:`, error);
    }

    return initialValue;
  });

  // Return wrapped version of setState function that persists value to localStorage
  const setStoredValueWrapper = (value) => {
    try {
      // Allow value to be a function the same way useState does
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save to state
      setStoredValue(valueToStore);

      // Save to localStorage
      if (valueToStore === null || valueToStore === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }

      // Dispatch storage event for cross-tab sync
      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: JSON.stringify(valueToStore),
          oldValue: localStorage.getItem(key),
          storageArea: localStorage,
        })
      );
    } catch (error) {
      console.warn(`useLocalStorage: Failed to set ${key}:`, error);
    }
  };

  // Function to clear the value
  const clearStoredValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`useLocalStorage: Failed to clear ${key}:`, error);
    }
  };

  // Listen for storage changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          setStoredValue(e.newValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setStoredValueWrapper, clearStoredValue];
};

/**
 * Hook for reading from localStorage without writing back
 * Useful for one-time reads that shouldn't update
 */
export const useLocalStorageValue = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`useLocalStorageValue: Failed to read ${key}:`, error);
      return defaultValue;
    }
  });

  return value;
};

/**
 * Hook for session storage (same as localStorage but cleared on session close)
 */
export const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (!key) return initialValue;

    try {
      const item = sessionStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item);
        } catch {
          return item;
        }
      }
    } catch (error) {
      console.warn(`useSessionStorage: Failed to read ${key}:`, error);
    }

    return initialValue;
  });

  const setStoredValueWrapper = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (valueToStore === null || valueToStore === undefined) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`useSessionStorage: Failed to set ${key}:`, error);
    }
  };

  const clearStoredValue = () => {
    try {
      sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`useSessionStorage: Failed to clear ${key}:`, error);
    }
  };

  return [storedValue, setStoredValueWrapper, clearStoredValue];
};

/**
 * Hook for multiple localStorage items
 * Useful when you need to manage related data together
 */
export const useLocalStorageObject = (storageKey, initialObject = {}) => {
  const [data, setData] = useLocalStorage(storageKey, initialObject);

  const updateField = (fieldName, value) => {
    setData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const updateFields = (updates) => {
    setData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const removeField = (fieldName) => {
    setData((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  return {
    data,
    setData,
    updateField,
    updateFields,
    removeField,
  };
};

export default useLocalStorage;
