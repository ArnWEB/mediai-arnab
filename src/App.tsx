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

function LandingPage({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-white">
      <div className="flex flex-col items-center space-y-8 p-8 rounded-2xl yellow-shadow yellow-border bg-white/90">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-10 h-10 text-black" />
          </div>
          <span className="text-3xl font-extrabold text-black tracking-wide">MediChat AI</span>
        </div>
        <h1 className="text-4xl font-bold text-black text-center">Your AI Medical Assistant</h1>
        <p className="text-lg text-gray-700 text-center max-w-xl">Chat with an AI that helps you with symptom checking, medication reminders, appointment scheduling, and all your health-related questions. Secure, private, and always available.</p>
        <button
          className="mt-6 px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-black text-xl font-bold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-yellow-300"
          onClick={onLogin}
        >
          Login
        </button>
      </div>
      <div className="mt-12 text-xs text-gray-400">&copy; {new Date().getFullYear()} MediChat AI. All rights reserved.</div>
    </div>
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
      {/* Sidebar */}
      <div className={`flex flex-col h-screen min-h-0 fixed lg:relative inset-y-0 left-0 z-40 min-w-sidebar w-[18vw] max-w-sidebar lg:min-w-sidebar-lg lg:max-w-sidebar-lg bg-white/80 backdrop-blur-md border-r border-white/20 flex-shrink-0 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } yellow-border yellow-shadow`}>
        {/* New Chat Button (very top) */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-white/20 p-4 flex items-center justify-between">
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition-colors w-full justify-center"
            onClick={() => setMessages([
              {
                id: '1',
                text: "Hello! I'm your AI Medical Assistant. I can help you with symptom checking, medication reminders, appointment scheduling, and answer any health-related questions. How can I assist you today?",
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'text'
              }
            ])}
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>
        {/* Header */}
        {/* <div className="flex-shrink-0 sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-white/20 p-4 lg:p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">MediChat AI</h1>
              <p className="text-xs lg:text-sm text-gray-600">Your Health Assistant</p>
            </div>
          </div>
        </div> */}
        {/* Scrollable Sidebar Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Quick Actions */}
          <div className="p-4 lg:p-6 space-y-3">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl hover:from-red-100 hover:to-red-200 transition-all">
                <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />
                <span className="text-xs lg:text-sm font-medium text-red-700">Emergency Help</span>
              </button>
              <button className="w-full flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-white/50 border border-white/20 rounded-xl hover:bg-white/80 transition-all">
                <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                <span className="text-xs lg:text-sm font-medium text-gray-700">Symptom Checker</span>
              </button>
              <button className="w-full flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-white/50 border border-white/20 rounded-xl hover:bg-white/80 transition-all">
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                <span className="text-xs lg:text-sm font-medium text-gray-700">Book Appointment</span>
              </button>
              <button className="w-full flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-white/50 border border-white/20 rounded-xl hover:bg-white/80 transition-all">
                <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                <span className="text-xs lg:text-sm font-medium text-gray-700">Medication Reminder</span>
              </button>
            </div>
          </div>

          {/* Health Stats */}
          <div className="p-4 lg:p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Today's Health</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 lg:p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                  <span className="text-xs lg:text-sm font-medium text-green-700">Heart Rate</span>
                </div>
                <span className="text-xs lg:text-sm font-bold text-green-800">72 BPM</span>
              </div>
              <div className="flex items-center justify-between p-2 lg:p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Activity className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                  <span className="text-xs lg:text-sm font-medium text-blue-700">Steps</span>
                </div>
                <span className="text-xs lg:text-sm font-bold text-blue-800">8,432</span>
              </div>
            </div>
          </div>

          {/* Recent Medications */}
          <div className="p-4 lg:p-6 space-y-4 flex-1">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Medications</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 lg:p-3 bg-white/50 border border-white/20 rounded-xl">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-gray-900">Vitamin D</p>
                  <p className="text-xs text-gray-600">1000 IU - 9:00 AM</p>
                </div>
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-2 lg:p-3 bg-white/50 border border-white/20 rounded-xl">
                <div>
                  <p className="text-xs lg:text-sm font-medium text-gray-900">Omega-3</p>
                  <p className="text-xs text-gray-600">500mg - 2:00 PM</p>
                </div>
                <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="p-4 lg:p-6 border-t border-white/20">
            <button className="w-full flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-white/50 border border-white/20 rounded-xl hover:bg-white/80 transition-all">
              <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
              <span className="text-xs lg:text-sm font-medium text-gray-700">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex flex-col min-h-0 h-screen lg:ml-0 transition-all duration-500 ${drawerOpen ? 'w-2/3' : 'flex-1'} yellow-border yellow-shadow`}>
        {/* Chat Header */}
        <div className="p-4 lg:p-6 bg-white/50 backdrop-blur-sm border-b border-white/20 flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">MediChat AI</h1>
              <p className="text-xs lg:text-sm text-gray-600">Your Health Assistant</p>
            </div>
          </div>
        </div>

        {/* Chat Messages + Input */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Chat Messages */}
          <div className={`flex flex-col justify-around flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 lg:p-6 space-y-4 lg:space-y-6 ${isDragOver ? 'bg-blue-50/50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isDragOver && (
              <div className="fixed inset-0 bg-blue-500/10 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-dashed border-blue-400">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop your files here</h3>
                    <p className="text-sm text-gray-600">Upload medical documents, images, or reports</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 lg:p-6 space-y-4 lg:space-y-6">
              {messages.map((message, idx) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] min-w-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                      : 'bg-white/80 backdrop-blur-sm text-gray-800 border border-white/20'
                  } rounded-2xl p-3 lg:p-4 shadow-lg`}>
                    {renderMessageContent(message)}
                    <p className={`text-xs lg:text-sm mt-2 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                    {/* Show disabled task row below the most recent AI message, if not typing and tasks are done */}
                    {message.sender === 'ai' && !isTyping && idx === lastAiMsgIndex && aiTasks.some(t => t.status === 'done') && (
                      <div className="mt-3 flex flex-row space-x-4 opacity-50 pointer-events-none select-none">
                        {aiTasks.map((task, tIdx) => (
                          <span key={tIdx} className="flex items-center space-x-2">
                            <Check className="w-5 h-5 text-green-500" />
                            <span className="text-xs text-gray-700">{task.label}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-lg flex items-center justify-center">
                    <div className="flex flex-row space-x-4">
                      {aiTasks.map((task, idx) => (
                        <span key={idx} onContextMenu={e => handleTaskRightClick(e, task)} className="flex items-center space-x-2 cursor-pointer">
                          {task.status === 'pending' ? <CircularLoader /> : <Check className="w-5 h-5 text-green-500" />}
                          <span className="text-xs text-gray-700">{task.label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* File Preview Area */}
            {selectedFiles.length > 0 && (
              <div className="p-3 lg:p-4 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Selected Files ({selectedFiles.length})</h3>
                  <button 
                    onClick={() => setSelectedFiles([])}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg border border-white/20">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getFileIcon(file.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                      <button 
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 bg-white backdrop-blur-sm border-t border-white/20 flex-shrink-0">
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
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
          </div>
        </div>
      </div>

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

      {/* Right Drawer */}
      <div className={`fixed top-0 right-0 h-screen bg-white shadow-2xl z-50 transition-transform duration-500 ${drawerOpen ? 'translate-x-0 w-1/3' : 'translate-x-full w-0'} flex flex-col yellow-border yellow-shadow`} style={{ minWidth: drawerOpen ? '320px' : '0' }}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Details</h2>
          <button onClick={() => { setDrawerOpen(false); setDrawerImage(null); }} className="p-2 rounded hover:bg-gray-100">✕</button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {drawerImage ? (
            <div className="flex flex-col items-center space-y-4">
              <img src={drawerImage.url} alt={drawerImage.name} className="max-w-full max-h-80 rounded shadow" />
              <div className="w-full">
                <div className="font-semibold text-gray-900">{drawerImage.name}</div>
                <div className="text-xs text-gray-500">{formatFileSize(drawerImage.size)}</div>
              </div>
            </div>
          ) : (
            <p>This is the details drawer. Add any content you want here!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;