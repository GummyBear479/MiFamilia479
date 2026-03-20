/**
 * OutputPanel Component
 * ====================
 * Displays AI tool outputs with controls for audio, translation, and copy
 */

import { Copy, Languages, Volume2, Sparkles } from 'lucide-react';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';

export const OutputPanel = ({
  response,
  loading,
  imageUrl,
  error,
  onTranslate,
  onTTS,
  onCopy,
  audioRef,
}) => {
  return (
    <Card className="flex-1 p-6 overflow-auto bg-slate-50 border-slate-200">
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
        <h4 className="font-bold text-slate-700 text-sm">System Output</h4>
        <div className="flex space-x-2">
          {/* Audio player */}
          {audioRef?.current && (
            <audio ref={audioRef} controls className="h-8 w-48" />
          )}

          {/* Listen button */}
          {response && (
            <button
              onClick={onTTS}
              className="text-xs text-slate-600 hover:text-emerald-700 font-medium flex items-center bg-white px-2 py-1 rounded border border-slate-200 transition-colors"
            >
              <Volume2 className="w-3 h-3 mr-1" />
              Listen
            </button>
          )}

          {/* Translate button */}
          {response && (
            <button
              onClick={onTranslate}
              className="text-xs text-slate-600 hover:text-emerald-700 font-medium flex items-center bg-white px-2 py-1 rounded border border-slate-200 transition-colors"
            >
              <Languages className="w-3 h-3 mr-1" />
              Español
            </button>
          )}

          {/* Copy button */}
          {response && (
            <button
              onClick={onCopy}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center bg-white px-2 py-1 rounded border border-slate-200 transition-colors"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </button>
          )}
        </div>
      </div>

      {/* Output content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-32">
          <LoadingSpinner size="md" message="Consulting Protocol Intelligence..." />
        </div>
      ) : (
        <>
          {/* Image output */}
          {imageUrl && (
            <div className="mb-4 rounded-xl overflow-hidden shadow-lg border border-slate-200">
              <img src={imageUrl} alt="Generated Vision" className="w-full h-auto" />
              <div className="bg-white p-2 text-xs text-center text-slate-500">Visualized by Imagen 3</div>
            </div>
          )}

          {/* Text output */}
          {response ? (
            <div className="prose prose-sm max-w-none text-slate-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {response}
            </div>
          ) : !imageUrl ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Sparkles className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm">Ready to generate. Select a tool and input data.</p>
            </div>
          ) : null}

          {/* Error display */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg mt-4">
              <p className="text-sm text-rose-700">
                <strong>⚠️ Error:</strong> {error}
              </p>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default OutputPanel;
