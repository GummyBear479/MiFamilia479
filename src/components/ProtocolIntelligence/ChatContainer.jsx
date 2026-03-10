/**
 * ChatContainer Component
 * ======================
 * Chat interface for assistant and simulator modes
 */

import { Send, Copy, Languages, Volume2 } from 'lucide-react';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

export const ChatContainer = ({
  chatHistory,
  loading,
  onSendMessage,
  messageInput,
  onMessageChange,
  onTranslate,
  onTTS,
  audioRef,
}) => {
  const lastMessage = chatHistory && chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
  const isLastMessageFromAssistant = lastMessage?.role === 'assistant';

  return (
    <Card className="flex-1 p-6 overflow-auto bg-slate-50 border-slate-200 flex flex-col">
      {/* Chat history */}
      <div className="flex-1 overflow-y-auto border border-slate-200 rounded-lg p-4 bg-white mb-4 space-y-3">
        {chatHistory?.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 border border-slate-200 text-slate-800'
              }`}
            >
              {msg.text}
              {msg.isTranslation && <div className="text-xs opacity-75 mt-2">🇪🇸 Spanish translation</div>}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-lg p-3">
              <LoadingSpinner size="sm" message="Writing..." />
            </div>
          </div>
        )}
      </div>

      {/* Output controls (for last assistant message) */}
      {isLastMessageFromAssistant && !loading && (
        <div className="flex gap-2 mb-4 pb-2 border-b border-slate-200">
          <button
            onClick={onTTS}
            className="text-xs text-slate-600 hover:text-emerald-700 font-medium flex items-center bg-white px-2 py-1 rounded border border-slate-200 transition-colors"
          >
            <Volume2 className="w-3 h-3 mr-1" />
            Listen
          </button>

          <button
            onClick={onTranslate}
            className="text-xs text-slate-600 hover:text-emerald-700 font-medium flex items-center bg-white px-2 py-1 rounded border border-slate-200 transition-colors"
          >
            <Languages className="w-3 h-3 mr-1" />
            Español
          </button>

          <button
            onClick={() => messageInput && navigator.clipboard.writeText(lastMessage.text)}
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center bg-white px-2 py-1 rounded border border-slate-200 transition-colors"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </button>
        </div>
      )}

      {/* Hidden audio element */}
      {audioRef && <audio ref={audioRef} className="hidden" />}

      {/* Message input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder="Type your message..."
          disabled={loading}
          className="flex-1 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-slate-50 text-sm"
        />
        <button
          onClick={onSendMessage}
          disabled={loading || !messageInput}
          className="bg-emerald-700 text-white p-2 rounded-lg hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
};

export default ChatContainer;
