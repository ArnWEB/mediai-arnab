import React from 'react';
import { Brain, Menu, Search, MoreVertical, Paperclip, Mic, Send, Trash2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TaskLoaderRow from './TaskLoaderRow';
import FilePreviewArea from './FilePreviewArea';
import ChatInput from './ChatInput';

interface ChatAreaProps {
  messages: any[];
  setMessages: (msgs: any[]) => void;
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  isTyping: boolean;
  aiTasks: { label: string; status: string }[];
  handleSendMessage: () => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (idx: number) => void;
  selectedFiles: File[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  isDragOver: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  openImageDrawer: (url: string, name: string, size: number, messageId: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleTaskRightClick: (e: React.MouseEvent<HTMLSpanElement>, task: { label: string; status: string }) => void;
  lastAiMsgIndex: number;
  formatFileSize: (bytes: number) => string;
  getFileIcon: (name: string) => React.ReactNode;
  isImageFile: (name: string) => boolean;
  renderMessageContent: (msg: any) => React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const ChatArea: React.FC<ChatAreaProps> = (props) => {
  return (
    <div className={`flex flex-col min-h-0 h-screen lg:ml-0 transition-all duration-500 flex-1 yellow-border yellow-shadow`}>
      {/* Chat Header */}
      <div className="p-4 lg:p-6 bg-white/50 backdrop-blur-sm border-b border-white/20 flex-shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Medical Assistant</h2>
            <p className="text-sm text-gray-600">Online • Ready to help</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => props.setIsSidebarOpen && props.setIsSidebarOpen(!props.isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      {/* Chat Messages Section */}
      <div className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 lg:p-6 space-y-4 lg:space-y-6`}>
        {props.messages.map((message, idx) => (
          <MessageBubble
            key={message.id}
            message={message}
            renderMessageContent={props.renderMessageContent}
          />
        ))}
      </div>
      {/* File Preview Area */}
      <FilePreviewArea
        selectedFiles={props.selectedFiles}
        removeFile={props.removeFile}
        getFileIcon={props.getFileIcon}
        formatFileSize={props.formatFileSize}
        clearAll={() => props.selectedFiles.forEach((_, i) => props.removeFile(i))}
      />
      {/* Task Loader Row (AI thinking animation) */}
      <TaskLoaderRow aiTasks={props.aiTasks} handleTaskRightClick={props.handleTaskRightClick} isTyping={props.isTyping} />
      {/* Chat Input */}
      <ChatInput
        inputMessage={props.inputMessage}
        setInputMessage={props.setInputMessage}
        handleSendMessage={props.handleSendMessage}
        handleFileSelect={props.handleFileSelect}
        fileInputRef={props.fileInputRef}
        selectedFiles={props.selectedFiles}
      />
      {/* Placeholder for next sections */}
      {/* <div className="flex-1 flex items-center justify-center text-gray-400 text-2xl">ChatArea: Chat Header added</div> */}
    </div>
  );
};

export default ChatArea; 