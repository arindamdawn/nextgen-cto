"use client";

import React, { useState, useEffect } from 'react';
import { useAnimationPerformance, useDeviceCapabilities } from './useAnimationPerformance';

interface PerformanceMonitorProps {
  showDebugInfo?: boolean;
  threshold?: number;
}

export default function PerformanceMonitor({ 
  showDebugInfo = false, 
  threshold = 55 
}: PerformanceMonitorProps) {
  const metrics = useAnimationPerformance(threshold);
  const capabilities = useDeviceCapabilities();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show debug info only in development or when explicitly requested
    const isDevelopment = process.env.NODE_ENV === 'development';
    setIsVisible(isDevelopment && showDebugInfo);
  }, [showDebugInfo]);

  // Log performance warnings in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !metrics.isOptimal) {
      console.warn(`Animation performance below threshold: ${metrics.fps}fps (target: ${threshold}fps)`);
    }
  }, [metrics.isOptimal, metrics.fps, threshold]);

  // Apply performance optimizations based on device capabilities
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      
      if (capabilities.isLowEndDevice || capabilities.preferReducedMotion) {
        root.style.setProperty('--animation-duration', '0.1s');
        root.style.setProperty('--transition-duration', '0.1s');
      } else {
        root.style.setProperty('--animation-duration', '0.6s');
        root.style.setProperty('--transition-duration', '0.3s');
      }
    }
  }, [capabilities]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
      <div className="space-y-1">
        <div className={`flex items-center gap-2 ${metrics.isOptimal ? 'text-green-400' : 'text-red-400'}`}>
          <div className={`w-2 h-2 rounded-full ${metrics.isOptimal ? 'bg-green-400' : 'bg-red-400'}`} />
          <span>FPS: {metrics.fps}</span>
        </div>
        <div>Frame Time: {metrics.frameTime}ms</div>
        <div className="text-gray-300 text-xs">
          Device: {capabilities.isLowEndDevice ? 'Low-end' : 'High-end'}
        </div>
        <div className="text-gray-300 text-xs">
          Motion: {capabilities.preferReducedMotion ? 'Reduced' : 'Normal'}
        </div>
      </div>
    </div>
  );
}

// Export a hook for components to check if they should use complex animations
export const useOptimizedAnimations = () => {
  const capabilities = useDeviceCapabilities();
  const metrics = useAnimationPerformance();

  return {
    shouldUseComplexAnimations: capabilities.canHandleComplexAnimations && metrics.isOptimal,
    shouldReduceMotion: capabilities.preferReducedMotion,
    isLowEndDevice: capabilities.isLowEndDevice,
    performanceMetrics: metrics
  };
};