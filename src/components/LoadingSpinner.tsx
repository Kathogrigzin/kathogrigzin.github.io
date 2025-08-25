import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-20">
      <div 
        className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-4 text-secondary">正在載入...</p>
    </div>
  );
}