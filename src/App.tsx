import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Settings, 
  User, 
  Bell, 
  Calendar, 
  FileText, 
  Heart, 
  Activity, 
  Brain, 
  Stethoscope,
  Upload,
  Clock,
  AlertTriangle,
  Menu,
  X,
  Mic,
  Paperclip,
  MoreVertical,
  Search,
  Shield,
  Zap,
  Plus,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Info,
  Image,
  File,
  Download,
  Eye,
  Trash2,
  Check
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar/Sidebar';
import Drawer from './components/Drawer/Drawer';
import ChatArea from './components/Chat/ChatArea';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type?: 'text' | 'symptom-check' | 'medication' | 'appointment' | 'emergency' | 'file' | 'image';
  metadata?: any;
  attachments?: FileAttachment[];
}

interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  preview?: string;
}

interface ImageDrawerState {
  isOpen: boolean;
  imageUrl: string;
  imageName: string;
  imageSize: number;
  messageId: string;
}

interface MedicationReminder {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
}

function CircularLoader() {
  return (
    <span className="inline-block w-5 h-5 align-middle">
      <svg className="animate-spin" viewBox="0 0 24 24" width="20" height="20">
        <circle
          className="opacity-20"
          cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="4" fill="none"
        />
        <path
          className="opacity-80"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          d="M22 12a10 10 0 0 1-10 10"
        />
      </svg>
    </span>
  );
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Medical Assistant. I can help you with symptom checking, medication reminders, appointment scheduling, and answer any health-related questions. How can I assist you today?",
      sender: 'ai',
      timestamp: '10:30 AM',
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageDrawer, setImageDrawer] = useState<ImageDrawerState>({
    isOpen: false,
    imageUrl: '',
    imageName: '',
    imageSize: 0,
    messageId: ''
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const taskNames = ['Searching', 'Analyzing', 'Summarizing'];
  const [aiTasks, setAiTasks] = useState(taskNames.map(name => ({ label: name, status: 'pending' })));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerImage, setDrawerImage] = useState<null | { url: string; name: string; size: number }>(null);
  const [showLanding, setShowLanding] = useState(true);

  const handleSendMessage = () => {
    if (!inputMessage.trim() && selectedFiles.length === 0) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage || 'Shared files',
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: selectedFiles.length > 0 ? 'file' : 'text',
      attachments: selectedFiles.map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      }))
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setSelectedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: selectedFiles.length > 0 
          ? "I've received your files. Let me analyze them and provide you with relevant medical insights."
          : "I understand your concern. Based on what you've shared, I'd recommend...",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    // Reset the input value to allow selecting the same file again
    if (event.target) {
      event.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  const openImageDrawer = (imageUrl: string, imageName: string, imageSize: number, messageId: string) => {
    setDrawerImage({ url: imageUrl, name: imageName, size: imageSize });
    setDrawerOpen(true);
  };

  const closeImageDrawer = () => {
    setImageDrawer({
      isOpen: false,
      imageUrl: '',
      imageName: '',
      imageSize: 0,
      messageId: ''
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const isImageFile = (fileName: string): boolean => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
  };

  const renderMessageContent = (message: ChatMessage) => {
    if (message.attachments && message.attachments.length > 0) {
      return (
        <div className="space-y-3">
          <p className="text-sm">{message.text}</p>
          <div className="grid gap-2">
            {message.attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center space-x-3 p-2 bg-white/50 rounded-lg border border-white/20">
                {isImageFile(attachment.name) ? (
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => openImageDrawer(attachment.url, attachment.name, attachment.size, message.id)}
                  >
                    <img 
                      src={attachment.url} 
                      alt={attachment.name}
                      className="w-16 h-16 object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    {getFileIcon(attachment.name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                </div>
                <button className="p-1 hover:bg-white/50 rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return <p className="text-sm lg:text-base leading-relaxed">{message.text}</p>;
  };

  // Simulate AI task progress (random order, always at least one loading)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isTyping) {
      setAiTasks(taskNames.map(name => ({ label: name, status: 'pending' })));
      interval = setInterval(() => {
        setAiTasks(prev => {
          const pendingIdxs = prev.map((t, i) => t.status === 'pending' ? i : -1).filter(i => i !== -1);
          if (pendingIdxs.length <= 1) return prev;
          const toComplete = pendingIdxs[Math.floor(Math.random() * pendingIdxs.length)];
          return prev.map((t, i) => i === toComplete ? { ...t, status: 'done' } : t);
        });
      }, 900);
    } else {
      setAiTasks(prev => prev.map(t => ({ ...t, status: 'done' })));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTyping]);

  // Right-click handler (placeholder)
  const handleTaskRightClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    task: { label: string; status: string }
  ) => {
    e.preventDefault();
    alert(`Task: ${task.label}\nStatus: ${task.status}`);
  };

  // Find the last AI message index
  const lastAiMsgIdx = messages.length > 0 ? [...messages].reverse().findIndex(m => m.sender === 'ai') : -1;
  const lastAiMsgIndex = lastAiMsgIdx === -1 ? -1 : messages.length - 1 - lastAiMsgIdx;

  if (showLanding) {
    return <LandingPage onLogin={() => setShowLanding(false)} />;
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar
        messages={messages}
        setMessages={setMessages}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Chat Area */}
      <ChatArea
        messages={messages}
        setMessages={setMessages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        isTyping={isTyping}
        aiTasks={aiTasks}
        handleSendMessage={handleSendMessage}
        handleFileSelect={handleFileSelect}
        removeFile={removeFile}
        selectedFiles={selectedFiles}
        fileInputRef={fileInputRef}
        isDragOver={isDragOver}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        openImageDrawer={openImageDrawer}
        messagesEndRef={messagesEndRef}
        handleTaskRightClick={handleTaskRightClick}
        lastAiMsgIndex={lastAiMsgIndex}
        formatFileSize={formatFileSize}
        getFileIcon={getFileIcon}
        isImageFile={isImageFile}
        renderMessageContent={renderMessageContent}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Emergency Button - Fixed positioning */}
      <button className="fixed top-6 right-6 w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:from-red-600 hover:to-red-700 transition-all z-50 flex items-center justify-center">
        <Phone className="w-6 h-6" />
      </button>

      {/* Image Drawer */}
      {imageDrawer.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{imageDrawer.imageName}</h3>
                  <p className="text-sm text-gray-500">{formatFileSize(imageDrawer.imageSize)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={closeImageDrawer}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Image Display */}
            <div className="p-6 flex items-center justify-center bg-gray-50">
              <img 
                src={imageDrawer.imageUrl} 
                alt={imageDrawer.imageName}
                className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* AI Analysis Panel */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900">AI Analysis</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Image Quality: Good</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Type: Medical Image</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Requires Review</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium">
                Get Detailed Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      <Drawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerImage={drawerImage}
        setDrawerImage={setDrawerImage}
        formatFileSize={formatFileSize}
      />
    </div>
  );
}

export default App;