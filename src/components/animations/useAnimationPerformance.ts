"use client";

import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  isOptimal: boolean;
}

export const useAnimationPerformance = (threshold: number = 55) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    isOptimal: true
  });
  
  const animationIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let frameTimes: number[] = [];

    const measurePerformance = (currentTime: number) => {
      frameCount++;
      const deltaTime = currentTime - lastTime;
      frameTimes.push(deltaTime);

      // Calculate metrics every 60 frames (approximately 1 second at 60fps)
      if (frameCount >= 60) {
        const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        const fps = 1000 / avgFrameTime;
        const isOptimal = fps >= threshold;

        setMetrics({
          fps: Math.round(fps * 100) / 100,
          frameTime: Math.round(avgFrameTime * 100) / 100,
          isOptimal
        });

        // Reset counters
        frameCount = 0;
        frameTimes = [];
      }

      lastTime = currentTime;
      animationIdRef.current = requestAnimationFrame(measurePerformance);
    };

    // Start monitoring only when animations are likely to be running
    const startMonitoring = () => {
      animationIdRef.current = requestAnimationFrame(measurePerformance);
    };

    // Stop monitoring when page is not visible
    const stopMonitoring = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };

    // Monitor page visibility to optimize performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopMonitoring();
      } else {
        startMonitoring();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startMonitoring();

    return () => {
      stopMonitoring();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [threshold]);

  return metrics;
};

// Hook to detect if device can handle complex animations
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    canHandleComplexAnimations: true,
    preferReducedMotion: false,
    isLowEndDevice: false
  });

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preferReducedMotion = mediaQuery.matches;

    // Estimate device capabilities based on various factors
    const estimateDeviceCapabilities = () => {
      // Check hardware concurrency (number of CPU cores)
      const cores = navigator.hardwareConcurrency || 4;
      
      // Check memory (if available)
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
      
      // Check connection speed
      const connection = (navigator as unknown as { connection?: { effectiveType: string } }).connection;
      const isSlowConnection = connection && 
        (connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' || 
         connection.effectiveType === '3g');

      // Determine if it's likely a low-end device
      const isLowEndDevice = cores < 4 || memory < 4 || Boolean(isSlowConnection);
      
      return {
        canHandleComplexAnimations: !isLowEndDevice && !preferReducedMotion,
        preferReducedMotion,
        isLowEndDevice
      };
    };

    setCapabilities(estimateDeviceCapabilities());

    // Listen for changes in reduced motion preference
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setCapabilities(prev => ({
        ...prev,
        preferReducedMotion: e.matches,
        canHandleComplexAnimations: !e.matches && !prev.isLowEndDevice
      }));
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return capabilities;
};