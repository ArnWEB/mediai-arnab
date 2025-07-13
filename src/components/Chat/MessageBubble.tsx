import React from 'react';

interface MessageBubbleProps {
  message: any;
  renderMessageContent: (msg: any) => React.ReactNode;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, renderMessageContent }) => (
  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
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
    </div>
  </div>
);

export default MessageBubble; 