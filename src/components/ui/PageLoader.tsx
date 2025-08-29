"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onLoadComplete?: () => void;
}

export default function PageLoader({ onLoadComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadComplete?.(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5, delay: progress >= 100 ? 0.2 : 0 }}
      style={{ pointerEvents: progress >= 100 ? 'none' : 'auto' }}
    >
      <div className="text-center">
        {/* Logo or Brand */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NextGen-CTO
          </h1>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          className="mt-4 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading your journey to CTO excellence...
        </motion.p>
      </div>
    </motion.div>
  );
}