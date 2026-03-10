/**
 * ProtocolIntelligence View Component
 * ===================================
 * Wrapper for the AI tools interface - integrates all subcomponents
 */

import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import Card from '../UI/Card';
import ToolSelector from './ToolSelector';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';
import ChatContainer from './ChatContainer';
import { useGeminiAPI } from '../../hooks/useGeminiAPI';
import { useChatHistory } from '../../hooks/useChatHistory';
import { useToolInput } from '../../hooks/useToolInput';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import GeminiService from '../../services/geminiService';
import ConfigService from '../../services/configService';

export const ProtocolIntelligence = () => {
  const [activeTool, setActiveTool] = useState('assistant');
  const [apiKeyOverride, setApiKeyOverride] = useState(null);

  // Hooks
  const { generateText, generateTTS, generateImage, generateChatResponse, loading, error, response } = useGeminiAPI();
  const { input1, setInput1, input2, setInput2, errors, validate, clear } = useToolInput();
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu } = useMobileMenu();
  const { audioRef } = useAudioPlayer();

  // Chat history with persistence
  const initialAssistantMessage = {
    role: 'assistant',
    text: "Welcome to La Familia 479. I am your Sovereign Assistant. How can I help you today? I can guide you through our tools, explain the protocol, or help you find resources.",
  };
  const { chatHistory, addMessage, clearHistory, isLoading: isChatLoading } = useChatHistory(initialAssistantMessage);

  // Reset inputs when tool changes
  useEffect(() => {
    clear();
    if (activeTool === 'assistant') {
      clearHistory();
    }
  }, [activeTool, clear, clearHistory]);

  // Handle tool execution
  const handleExecuteTool = async () => {
    const isValid = validate(activeTool);
    if (!isValid) return;

    if (activeTool === 'assistant') {
      await handleAssistantChat();
    } else if (activeTool === 'painter') {
      await handleImageGeneration();
    } else {
      await handleToolExecution();
    }
  };

  const handleAssistantChat = async () => {
    const userText = input1;
    addMessage('user', userText);
    setInput1('');

    try {
      const systemPrompt =
        "You are the Sovereign Guide for La Familia 479. Your goal is to help families move from 'Perishable' to 'Sovereign'. You are empathetic, knowledgeable about the Dignity Protocol (Waste-to-Asset conversion), and practical.";

      const aiResponse = await generateChatResponse(
        [...chatHistory, { role: 'user', text: userText }],
        systemPrompt,
        apiKeyOverride
      );

      if (aiResponse) {
        addMessage('assistant', aiResponse);
      }
    } catch (err) {
      addMessage('assistant', `Error: ${err.message}`);
    }
  };

  const handleToolExecution = async () => {
    try {
      const result = await GeminiService.executeTool(activeTool, input1, input2, apiKeyOverride);
      // Response is handled by the hook
    } catch (err) {
      console.error('Tool execution error:', err);
    }
  };

  const handleImageGeneration = async () => {
    try {
      await generateImage(input1, apiKeyOverride);
    } catch (err) {
      console.error('Image generation error:', err);
    }
  };

  const handleTranslate = async () => {
    const textToTranslate = activeTool === 'assistant' ? chatHistory[chatHistory.length - 1]?.text : response;
    if (!textToTranslate) return;

    try {
      const prompt = `Translate the following text into Spanish. Maintain a dignified, warm, and professional tone suitable for community members of La Familia 479:\n\n"${textToTranslate}"`;
      const translated = await generateText(prompt, apiKeyOverride);
      if (translated) {
        addMessage('assistant', translated);
      }
    } catch (err) {
      console.error('Translation error:', err);
    }
  };

  const handleTTS = async () => {
    const textToRead = activeTool === 'assistant' ? chatHistory[chatHistory.length - 1]?.text : response;
    if (!textToRead) return;

    try {
      const audioData = await generateTTS(textToRead, apiKeyOverride);
      if (audioData) {
        const { pcmToWav } = await import('../../utils/audioConverter');
        const wavBlob = pcmToWav(audioData, 24000);
        const url = URL.createObjectURL(wavBlob);

        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play();
        }
      }
    } catch (err) {
      console.error('TTS error:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-serif flex items-center">
          <Sparkles className="w-6 h-6 mr-3 text-amber-500" />
          Protocol Intelligence
        </h2>
        <p className="text-slate-500">AI-powered tools to accelerate sovereignty and decoding.</p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Tool Selector Sidebar */}
        <ToolSelector activeTool={activeTool} onToolSelect={setActiveTool} />

        {/* Input & Output Area */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full overflow-hidden">
          {/* Input Panel */}
          <InputPanel
            activeTool={activeTool}
            input1={input1}
            onInput1Change={setInput1}
            input2={input2}
            onInput2Change={setInput2}
            errors={errors}
            loading={loading}
            onSubmit={handleExecuteTool}
            chatHistory={activeTool === 'assistant' ? chatHistory : null}
          />

          {/* Output Panel or Chat Container */}
          {activeTool === 'assistant' ? (
            <ChatContainer
              chatHistory={chatHistory}
              loading={loading}
              onSendMessage={handleExecuteTool}
              messageInput={input1}
              onMessageChange={setInput1}
              onTranslate={handleTranslate}
              onTTS={handleTTS}
              audioRef={audioRef}
            />
          ) : (
            <OutputPanel
              response={response}
              loading={loading}
              imageUrl={activeTool === 'painter' ? response : null}
              error={error}
              onTranslate={handleTranslate}
              onTTS={handleTTS}
              onCopy={() => navigator.clipboard.writeText(response)}
              audioRef={audioRef}
            />
          )}
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} className="hidden" />

      {/* Settings notice */}
      {!ConfigService.isGeminiConfigured(apiKeyOverride) && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            ⚙️ API keys not configured. Please add your Gemini API key in Settings to use AI tools.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProtocolIntelligence;
