"use client";

import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

interface UsePerformanceMonitoringOptions {
  enableLogging?: boolean;
  onMetric?: (metric: { name: string; value: number; rating: 'good' | 'needs-improvement' | 'poor' }) => void;
}

export function usePerformanceMonitoring({
  enableLogging = process.env.NODE_ENV === 'development',
  onMetric,
}: UsePerformanceMonitoringOptions = {}) {
  const metricsRef = useRef<PerformanceMetrics>({});

  const getRating = useCallback((name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    switch (name) {
      case 'LCP':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'FID':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      case 'CLS':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'FCP':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
      case 'TTFB':
        return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
      default:
        return 'good';
    }
  }, []);

  const logMetric = useCallback((name: string, value: number) => {
    const rating = getRating(name, value);
    const metric = { name, value, rating };
    
    if (enableLogging) {
      const color = rating === 'good' ? 'green' : rating === 'needs-improvement' ? 'orange' : 'red';
      console.log(
        `%c${name}: ${value.toFixed(2)}ms (${rating})`,
        `color: ${color}; font-weight: bold;`
      );
    }

    onMetric?.(metric);
    
    // Store metric
    metricsRef.current = {
      ...metricsRef.current,
      [name.toLowerCase()]: value,
    };
  }, [enableLogging, onMetric, getRating]);

  useEffect(() => {
    // Web Vitals measurement
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
            if (lastEntry) {
              logMetric('LCP', lastEntry.startTime);
            }
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const fidEntry = entry as PerformanceEntry & { processingStart: number; startTime: number };
              logMetric('FID', fidEntry.processingStart - fidEntry.startTime);
            });
          });
          fidObserver.observe({ type: 'first-input', buffered: true });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
              if (!clsEntry.hadRecentInput) {
                clsValue += clsEntry.value;
              }
            });
            logMetric('CLS', clsValue);
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });

          // First Contentful Paint (FCP)
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.name === 'first-contentful-paint') {
                logMetric('FCP', entry.startTime);
              }
            });
          });
          fcpObserver.observe({ type: 'paint', buffered: true });

        } catch (error) {
          console.warn('Performance monitoring not supported:', error);
        }
      }

      // Navigation Timing API for TTFB
      if ('performance' in window && 'timing' in window.performance) {
        const timing = window.performance.timing;
        const ttfb = timing.responseStart - timing.navigationStart;
        if (ttfb > 0) {
          logMetric('TTFB', ttfb);
        }
      }
    };

    // Measure on load
    if (document.readyState === 'complete') {
      measureWebVitals();
    } else {
      window.addEventListener('load', measureWebVitals);
    }

    return () => {
      window.removeEventListener('load', measureWebVitals);
    };
  }, [logMetric]);

  // Resource timing monitoring
  useEffect(() => {
    const monitorResources = () => {
      if ('performance' in window && 'getEntriesByType' in window.performance) {
        const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        resources.forEach((resource) => {
          const duration = resource.responseEnd - resource.startTime;
          
          // Log slow resources
          if (duration > 1000 && enableLogging) {
            console.warn(
              `Slow resource: ${resource.name} took ${duration.toFixed(2)}ms`,
              resource
            );
          }
        });
      }
    };

    // Monitor resources after page load
    window.addEventListener('load', () => {
      setTimeout(monitorResources, 1000);
    });
  }, [enableLogging]);

  return {
    metrics: metricsRef.current,
    logMetric,
  };
}