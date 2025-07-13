import React from 'react';
import { Trash2 } from 'lucide-react';

interface FilePreviewAreaProps {
  selectedFiles: File[];
  removeFile: (idx: number) => void;
  getFileIcon: (name: string) => React.ReactNode;
  formatFileSize: (bytes: number) => string;
  clearAll: () => void;
}

const FilePreviewArea: React.FC<FilePreviewAreaProps> = ({ selectedFiles, removeFile, getFileIcon, formatFileSize, clearAll }) => {
  if (selectedFiles.length === 0) return null;
  return (
    <div className="p-3 lg:p-4 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl mb-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">
          Selected Files ({selectedFiles.length})
        </h3>
        <button
          onClick={clearAll}
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
  );
};

export default FilePreviewArea; 