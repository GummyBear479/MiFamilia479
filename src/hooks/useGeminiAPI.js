/**
 * useGeminiAPI Hook
 * =================
 * Centralized hook for Gemini API calls with error handling and loading states
 */

import { useState, useCallback } from 'react';
import { getGeminiAPIKey } from '../config/index';

/**
 * Hook for making Gemini API calls
 * @returns {object} { generateText, generateTTS, generateImage, loading, error, response }
 *
 * @example
 * const { generateText, loading, response } = useGeminiAPI();
 * const handleClick = async () => {
 *   await generateText("Write a poem", apiKeyOverride);
 * };
 */
export const useGeminiAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  /**
   * Generate text using Gemini model
   */
  const generateText = useCallback(async (prompt, apiKeyOverride = null) => {
    if (!prompt) {
      setError('Prompt is required');
      return null;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const apiKey = getGeminiAPIKey(apiKeyOverride);
      if (!apiKey) {
        throw new Error('Gemini API key not configured. Please check settings.');
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message || 'API returned an error');
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('No response from API');
      }

      setResponse(text);
      return text;
    } catch (err) {
      const errorMessage = err.message || 'Failed to generate text';
      setError(errorMessage);
      console.error('generateText error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Generate text-to-speech audio
   */
  const generateTTS = useCallback(async (text, apiKeyOverride = null) => {
    if (!text) {
      setError('Text is required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const apiKey = getGeminiAPIKey(apiKeyOverride);
      if (!apiKey) {
        throw new Error('Gemini API key not configured');
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Aoede' },
                },
              },
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!audioData) {
        throw new Error('No audio data returned');
      }

      setResponse(audioData);
      return audioData;
    } catch (err) {
      const errorMessage = err.message || 'Failed to generate audio';
      setError(errorMessage);
      console.error('generateTTS error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Generate image using Imagen model
   */
  const generateImage = useCallback(async (prompt, apiKeyOverride = null) => {
    if (!prompt) {
      setError('Prompt is required');
      return null;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const apiKey = getGeminiAPIKey(apiKeyOverride);
      if (!apiKey) {
        throw new Error('Gemini API key not configured');
      }

      const enhancedPrompt = `${prompt} The style should be realistic, dignified, warm, architectural photography, golden hour lighting.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt: enhancedPrompt }],
            parameters: { sampleCount: 1 },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const base64 = data.predictions?.[0]?.bytesBase64Encoded;
      if (!base64) {
        throw new Error('No image data returned');
      }

      const imageUrl = `data:image/png;base64,${base64}`;
      setResponse(imageUrl);
      return imageUrl;
    } catch (err) {
      const errorMessage = err.message || 'Failed to generate image';
      setError(errorMessage);
      console.error('generateImage error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Chat with Gemini (for streaming-like experience)
   */
  const generateChatResponse = useCallback(async (chatHistory, systemPrompt, apiKeyOverride = null) => {
    if (!chatHistory || chatHistory.length === 0) {
      setError('Chat history is required');
      return null;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const apiKey = getGeminiAPIKey(apiKeyOverride);
      if (!apiKey) {
        throw new Error('Gemini API key not configured');
      }

      const prompt = `${systemPrompt}\n\nCurrent conversation:\n${chatHistory
        .map((m) => `${m.role}: ${m.text}`)
        .join('\n')}\n\nassistant:`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('No response from API');
      }

      setResponse(text);
      return text;
    } catch (err) {
      const errorMessage = err.message || 'Failed to generate chat response';
      setError(errorMessage);
      console.error('generateChatResponse error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setResponse(null);
  }, []);

  return {
    generateText,
    generateTTS,
    generateImage,
    generateChatResponse,
    loading,
    error,
    response,
    clearError,
    reset,
  };
};

export default useGeminiAPI;
