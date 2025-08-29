"use client";

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export default function VideoErrorBoundary({ 
  children, 
  fallbackTitle = "Video Unavailable",
  fallbackDescription = "The video couldn't be loaded. Please check your connection and try again."
}: VideoErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
    console.error('Video failed to load');
  }, []);

  const handleRetry = useCallback(async () => {
    setIsRetrying(true);
    setHasError(false);
    
    // Wait a moment before allowing retry
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRetrying(false);
  }, []);

  if (hasError) {
    return (
      <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl bg-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center p-8"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {fallbackTitle}
          </h3>
          
          <p className="text-gray-600 mb-6 max-w-sm">
            {fallbackDescription}
          </p>
          
          <Button
            onClick={handleRetry}
            disabled={isRetrying}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isRetrying ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Retry Video
              </>
            )}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (isRetrying) {
    return (
      <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl bg-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading video...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div onError={handleError}>
      {children}
    </div>
  );
}