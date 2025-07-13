import { Stethoscope } from 'lucide-react';
import React from 'react';

const LandingPage = ({ onLogin }: { onLogin: () => void }) => (
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

export default LandingPage; 