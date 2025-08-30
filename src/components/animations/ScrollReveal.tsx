"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  threshold?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  threshold = 0.1,
  stagger = false,
  staggerDelay = 0.1,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're on the client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "0px 0px -100px 0px"
  });

  const directionOffset = {
    up: { y: shouldReduceMotion ? 0 : 50, x: 0 },
    down: { y: shouldReduceMotion ? 0 : -50, x: 0 },
    left: { y: 0, x: shouldReduceMotion ? 0 : 50 },
    right: { y: 0, x: shouldReduceMotion ? 0 : -50 },
  };

  // Optimized animation variants for 60fps performance
  const variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
        // Optimize for 60fps by using transform3d
        type: "tween" as const,
      },
    },
  };

  // Staggered children variants
  const staggerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delay,
        type: "tween" as const,
      },
    },
  };

  // Don't render animations on server side
  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger ? staggerVariants : variants}
      className={className}
      // Performance optimizations
      style={{
        willChange: isInView ? "auto" : "transform, opacity",
      }}
      // Use GPU acceleration for better performance
      transformTemplate={({ x, y, rotate }) => 
        `translate3d(${x}, ${y}, 0) rotate(${rotate})`
      }
    >
      {children}
    </motion.div>
  );
}