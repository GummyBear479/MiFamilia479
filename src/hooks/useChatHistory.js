/**
 * useChatHistory Hook
 * ===================
 * Manages chat state with localStorage persistence
 */

import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useChatHistory = (initialMessage = null, storageKey = 'lf479_chat_history') => {
  const [chatHistory, setChatHistory] = useLocalStorage(storageKey, initialMessage ? [initialMessage] : []);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((role, text) => {
    const message = { role, text, timestamp: new Date().toISOString() };
    setChatHistory((prev) => [...prev, message]);
    return message;
  }, [setChatHistory]);

  const clearHistory = useCallback(() => {
    setChatHistory(initialMessage ? [initialMessage] : []);
  }, [setChatHistory, initialMessage]);

  const removeLastMessage = useCallback(() => {
    setChatHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, [setChatHistory]);

  const updateLastMessage = useCallback((text) => {
    setChatHistory((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        text,
        timestamp: new Date().toISOString(),
      };
      return updated;
    });
  }, [setChatHistory]);

  return {
    chatHistory,
    addMessage,
    clearHistory,
    removeLastMessage,
    updateLastMessage,
    isLoading,
    setIsLoading,
  };
};

export default useChatHistory;
