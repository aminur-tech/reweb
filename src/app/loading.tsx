import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 backdrop-blur-sm">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                
                {/* Inner Logo/Dot Pulse (Optional) */}
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
            
            {/* Professional Text Styling */}
            <h2 className="mt-4 text-lg font-semibold text-slate-700 tracking-wide animate-pulse">
                Loading Application...
            </h2>
            <p className="text-sm text-slate-500">Please wait a moment.</p>
        </div>
    );
};

export default Loading;