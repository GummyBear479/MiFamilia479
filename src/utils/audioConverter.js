/**
 * Audio Conversion Utilities
 * ==========================
 * Converts PCM audio data to WAV format for browser playback
 * Used by Text-to-Speech (TTS) functionality
 */

/**
 * Converts base64-encoded PCM audio to WAV format
 * @param {string} base64PCM - Base64-encoded PCM data from Gemini TTS API
 * @param {number} sampleRate - Sample rate in Hz (default: 24000)
 * @returns {Blob} WAV format audio blob
 */
export const pcmToWav = (base64PCM, sampleRate = 24000) => {
  // Decode base64 to binary string
  const binaryString = atob(base64PCM);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  // Convert binary string to byte array
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const pcm16Buffer = bytes.buffer;

  // WAV format parameters
  const numChannels = 1; // Mono
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = pcm16Buffer.byteLength;

  // Create WAV file buffer (44 byte header + PCM data)
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // Write RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // Write fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, byteRate, true); // ByteRate
  view.setUint16(32, blockAlign, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample

  // Write data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM data
  const pcmBytes = new Uint8Array(pcm16Buffer);
  const wavBytes = new Uint8Array(buffer, 44);
  wavBytes.set(pcmBytes);

  return new Blob([buffer], { type: 'audio/wav' });
};

/**
 * Helper function to write ASCII strings to DataView
 * @private
 */
const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

/**
 * Create a downloadable audio file from WAV blob
 * @param {Blob} wavBlob - WAV format blob
 * @param {string} filename - Desired filename (default: 'audio.wav')
 */
export const downloadAudio = (wavBlob, filename = 'audio.wav') => {
  const url = URL.createObjectURL(wavBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Create an object URL for audio streaming (instead of download)
 * @param {Blob} wavBlob - WAV format blob
 * @returns {string} Object URL for playback
 */
export const createAudioUrl = (wavBlob) => {
  return URL.createObjectURL(wavBlob);
};

/**
 * Cleanup audio URL to prevent memory leaks
 * @param {string} url - Object URL to revoke
 */
export const revokeAudioUrl = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};
