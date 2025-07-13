import React from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  handleSendMessage: () => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  selectedFiles: File[];
}

const ChatInput: React.FC<ChatInputProps> = ({ inputMessage, setInputMessage, handleSendMessage, handleFileSelect, fileInputRef, selectedFiles }) => {
  return (
    <div className="p-4 lg:p-6 bg-white/50 backdrop-blur-sm border-t border-white/20 flex-shrink-0">
      <div className="flex items-end space-x-2 lg:space-x-3">
        <div className="flex space-x-1 lg:space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="p-2 lg:p-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white transition-colors cursor-pointer"
          >
            <Paperclip className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
          </label>
          <button className="p-2 lg:p-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white transition-colors">
            <Mic className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 relative min-w-0">
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about symptoms, medications, or health concerns..."
            className="w-full px-3 lg:px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() && selectedFiles.length === 0}
          className="p-2 lg:p-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput; 