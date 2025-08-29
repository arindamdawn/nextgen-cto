"use client";

import { useEffect, useState } from 'react';
import { debounce } from '@/lib/utils';

export function useScrollToTop(threshold: number = 300) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > threshold);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return { isVisible, scrollToTop };
}