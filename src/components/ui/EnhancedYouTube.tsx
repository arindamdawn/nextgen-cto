"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnhancedYouTubeProps extends Omit<YouTubeProps, 'onReady' | 'onError' | 'onStateChange'> {
  videoId: string;
  title?: string;
  className?: string;
  showLoadingState?: boolean;
  autoRetry?: boolean;
  maxRetries?: number;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onError?: (error: unknown) => void;
}

type LoadingState = 'idle' | 'loading' | 'loaded' | 'error' | 'retrying';

export default function EnhancedYouTube({
  videoId,
  title = "Video",
  className = "",
  showLoadingState = true,
  autoRetry = true,
  maxRetries = 3,
  onLoadStart,
  onLoadComplete,
  onError,
  opts = {},
  ...props
}: EnhancedYouTubeProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [retryCount, setRetryCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<unknown>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          setLoadingState('loading');
          onLoadStart?.();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView, onLoadStart]);

  const handleReady = useCallback((event: { target: unknown }) => {
    playerRef.current = event.target;
    setLoadingState('loaded');
    setRetryCount(0);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleError = useCallback((error: unknown) => {
    console.error('YouTube player error:', error);
    setLoadingState('error');
    onError?.(error);

    // Auto retry logic
    if (autoRetry && retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setLoadingState('retrying');
        
        // Force re-render by changing key
        setTimeout(() => {
          setLoadingState('loading');
        }, 1000);
      }, 2000);
    }
  }, [autoRetry, maxRetries, retryCount, onError]);

  const handleStateChange = useCallback((event: { data: number }) => {
    // YouTube player states:
    // -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    const state = event.data;
    
    if (state === 3) { // buffering
      setLoadingState('loading');
    } else if (state === 1 || state === 2) { // playing or paused
      setLoadingState('loaded');
    }
  }, []);

  const handleManualRetry = useCallback(() => {
    setRetryCount(0);
    setLoadingState('loading');
  }, []);

  const enhancedOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      playsinline: 1,
      ...opts.playerVars,
    },
    ...opts,
  };

  const renderLoadingState = () => {
    switch (loadingState) {
      case 'loading':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-100 flex items-center justify-center"
          >
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
              <p className="text-gray-600 text-sm">Loading video...</p>
            </div>
          </motion.div>
        );

      case 'retrying':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-100 flex items-center justify-center"
          >
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
              <p className="text-gray-600 text-sm">
                Retrying... ({retryCount}/{maxRetries})
              </p>
            </div>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-gray-100 flex items-center justify-center"
          >
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Video Unavailable
              </h3>
              <p className="text-gray-600 text-sm mb-4 max-w-xs">
                The video couldn&apos;t be loaded. Please check your connection and try again.
              </p>
              <Button
                onClick={handleManualRetry}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </motion.div>
        );

      case 'idle':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Play className="w-8 h-8 text-gray-600 ml-1" />
              </div>
              <p className="text-gray-600 text-sm">Click to load video</p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* YouTube Player */}
      {isInView && (
        <YouTube
          key={`${videoId}-${retryCount}`} // Force re-render on retry
          videoId={videoId}
          opts={enhancedOpts}
          onReady={handleReady}
          onError={handleError}
          onStateChange={handleStateChange}
          className="w-full h-full"
          iframeClassName="w-full h-full"
          title={title}
          {...props}
        />
      )}

      {/* Loading States Overlay */}
      {showLoadingState && (
        <AnimatePresence mode="wait">
          {loadingState !== 'loaded' && renderLoadingState()}
        </AnimatePresence>
      )}
    </div>
  );
}