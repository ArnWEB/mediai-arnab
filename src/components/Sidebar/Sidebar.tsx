import React from 'react';
import { Stethoscope, AlertTriangle, Brain, Calendar, Bell, CheckCircle, Clock, Settings, Plus } from 'lucide-react';

interface SidebarProps {
  messages: any[];
  setMessages: (msgs: any[]) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ messages, setMessages, isSidebarOpen, setIsSidebarOpen }) => (
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
    <div className="flex-shrink-0 sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-white/20 p-4 lg:p-6">
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
              <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
              <span className="text-xs lg:text-sm font-medium text-green-700">Heart Rate</span>
            </div>
            <span className="text-xs lg:text-sm font-bold text-green-800">72 BPM</span>
          </div>
          <div className="flex items-center justify-between p-2 lg:p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
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
);

export default Sidebar; 