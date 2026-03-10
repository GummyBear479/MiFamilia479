/**
 * Data Export Utilities
 * =====================
 * Functions for exporting data in various formats (JSON, CSV, Markdown)
 */

/**
 * Exports data as JSON and triggers a download
 * @param {object} data - Data to export
 * @param {string} filename - Desired filename (default: 'export.json')
 */
export const exportAsJSON = (data, filename = 'export.json') => {
  const jsonString = JSON.stringify(data, null, 2);
  downloadFile(jsonString, filename, 'application/json');
};

/**
 * Exports array of objects as CSV and triggers a download
 * @param {array} data - Array of objects to export
 * @param {array} headers - Column headers/keys (optional, auto-detected if not provided)
 * @param {string} filename - Desired filename (default: 'export.csv')
 */
export const exportAsCSV = (data, headers = null, filename = 'export.csv') => {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Auto-detect headers from first object
  const keys = headers || Object.keys(data[0]);

  // Create CSV header row
  const csvContent = [
    keys.map((key) => `"${key}"`).join(','),
    ...data.map((row) => keys.map((key) => {
      const cell = row[key];
      // Escape quotes and wrap in quotes if contains comma or quotes
      if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
        return `"${cell.replace(/"/g, '""')}"`;
      }
      return typeof cell === 'string' ? `"${cell}"` : cell;
    }).join(',')),
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
};

/**
 * Exports data as Markdown table
 * @param {array} data - Array of objects to export
 * @param {array} headers - Column headers/keys (optional)
 * @param {string} filename - Desired filename (default: 'export.md')
 */
export const exportAsMarkdown = (data, headers = null, filename = 'export.md') => {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const keys = headers || Object.keys(data[0]);

  // Create markdown table
  const mdContent = [
    '| ' + keys.join(' | ') + ' |',
    '| ' + keys.map(() => '---').join(' | ') + ' |',
    ...data.map((row) => '| ' + keys.map((key) => (row[key] ?? '')).join(' | ') + ' |'),
  ].join('\n');

  downloadFile(mdContent, filename, 'text/markdown;charset=utf-8;');
};

/**
 * Exports chat history as formatted text
 * @param {array} chatHistory - Array of chat messages with { role, text }
 * @param {string} filename - Desired filename (default: 'chat-export.txt')
 */
export const exportChatHistory = (chatHistory, filename = 'chat-export.txt') => {
  if (!Array.isArray(chatHistory)) {
    console.warn('Invalid chat history');
    return;
  }

  const content = chatHistory
    .map((msg) => {
      const role = msg.role.toUpperCase();
      const timestamp = msg.timestamp ? ` [${new Date(msg.timestamp).toLocaleString()}]` : '';
      return `${role}${timestamp}:\n${msg.text}\n`;
    })
    .join('\n---\n\n');

  downloadFile(content, filename, 'text/plain;charset=utf-8;');
};

/**
 * Exports chat history as Markdown
 * @param {array} chatHistory - Array of chat messages
 * @param {string} title - Document title
 * @param {string} filename - Desired filename
 */
export const exportChatHistoryMarkdown = (chatHistory, title = 'Chat Transcript', filename = 'chat-export.md') => {
  const timestamp = new Date().toLocaleString();
  const header = `# ${title}\n\n**Exported:** ${timestamp}\n\n---\n\n`;

  const content = chatHistory
    .map((msg) => {
      const role = msg.role === 'user' ? '👤 **You**' : '🤖 **Assistant**';
      return `${role}\n\n${msg.text}`;
    })
    .join('\n\n---\n\n');

  downloadFile(header + content, filename, 'text/markdown;charset=utf-8;');
};

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} True if successful
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Generic file download helper
 * @private
 */
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generates a download filename with optional timestamp
 * @param {string} baseName - Base name for the file
 * @param {string} extension - File extension (without dot)
 * @param {boolean} includeTimestamp - Whether to include timestamp (default: true)
 * @returns {string} Generated filename
 */
export const generateFilename = (baseName, extension, includeTimestamp = true) => {
  const base = baseName.replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
  const ext = extension.replace(/^\./, '');

  if (includeTimestamp) {
    const timestamp = new Date().toISOString().slice(0, 10);
    return `${base}_${timestamp}.${ext}`;
  }

  return `${base}.${ext}`;
};

/**
 * Uploads a file using form data
 * @param {File} file - File to upload
 * @param {string} endpoint - Server endpoint URL
 * @returns {Promise<Response>} Fetch response
 */
export const uploadFile = async (file, endpoint) => {
  const formData = new FormData();
  formData.append('file', file);

  return fetch(endpoint, {
    method: 'POST',
    body: formData,
  });
};
