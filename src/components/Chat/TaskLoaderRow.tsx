import React from 'react';

interface TaskLoaderRowProps {
  aiTasks: { label: string; status: string }[];
  handleTaskRightClick: (e: React.MouseEvent<HTMLSpanElement>, task: { label: string; status: string }) => void;
  isTyping: boolean;
}

const TaskLoaderRow: React.FC<TaskLoaderRowProps> = ({ aiTasks, handleTaskRightClick, isTyping }) => (
  isTyping ? (
    <div className="flex justify-start mb-2">
      <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-lg flex items-center justify-center">
        <div className="flex flex-row space-x-4">
          {aiTasks.map((task, idx) => (
            <span key={idx} onContextMenu={e => handleTaskRightClick(e, task)} className="flex items-center space-x-2 cursor-pointer">
              {task.status === 'pending'
                ? <span className="inline-block w-5 h-5 align-middle"><svg className="animate-spin" viewBox="0 0 24 24" width="20" height="20"><circle className="opacity-20" cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="4" fill="none" /><path className="opacity-80" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" d="M22 12a10 10 0 0 1-10 10" /></svg></span>
                : <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              }
              <span className="text-xs text-gray-700">{task.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  ) : null
);

export default TaskLoaderRow; 