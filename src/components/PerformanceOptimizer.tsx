"use client";

import { useEffect, useCallback } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  enableOptimizations?: boolean;
}

export default function PerformanceOptimizer({ 
  children, 
  enableOptimizations = true 
}: PerformanceOptimizerProps) {
  
  const optimizePerformance = useCallback(() => {
    if (!enableOptimizations || typeof window === 'undefined') return;

    // Optimize scroll performance
    let ticking = false;
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll-based optimizations can be added here
          ticking = false;
        });
        ticking = true;
      }
    };

    // Optimize resize performance
    let resizeTimeout: NodeJS.Timeout;
    const optimizedResizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Resize-based optimizations can be added here
      }, 150);
    };

    // Add event listeners
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    window.addEventListener('resize', optimizedResizeHandler, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
      window.removeEventListener('resize', optimizedResizeHandler);
      clearTimeout(resizeTimeout);
    };
  }, [enableOptimizations]);

  const preloadCriticalResources = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Preload critical fonts
    const fontPreloads = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];

    fontPreloads.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

    // Preload critical images (if any)
    const criticalImages: string[] = [
      // Add critical image URLs here
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  const optimizeAnimations = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }

    // Optimize animations for low-end devices
    const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                          (deviceMemory !== undefined && deviceMemory <= 2);
    
    if (isLowEndDevice) {
      document.documentElement.classList.add('low-end-device');
    }
  }, []);

  const setupIntersectionObserver = useCallback(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    // Lazy load non-critical content
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('loaded');
          observer.unobserve(element);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });

    lazyElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enableOptimizations) return;

    const cleanupFunctions: (() => void)[] = [];

    // Initialize optimizations
    preloadCriticalResources();
    optimizeAnimations();
    
    const scrollCleanup = optimizePerformance();
    if (scrollCleanup) cleanupFunctions.push(scrollCleanup);

    const observerCleanup = setupIntersectionObserver();
    if (observerCleanup) cleanupFunctions.push(observerCleanup);

    // Cleanup on unmount
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [enableOptimizations, optimizePerformance, preloadCriticalResources, optimizeAnimations, setupIntersectionObserver]);

  return <>{children}</>;
}