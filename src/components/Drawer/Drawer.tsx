import React from 'react';

interface DrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  drawerImage: { url: string; name: string; size: number } | null;
  setDrawerImage: (img: { url: string; name: string; size: number } | null) => void;
  formatFileSize: (bytes: number) => string;
}

const Drawer: React.FC<DrawerProps> = ({ drawerOpen, setDrawerOpen, drawerImage, setDrawerImage, formatFileSize }) => (
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
);

export default Drawer; 