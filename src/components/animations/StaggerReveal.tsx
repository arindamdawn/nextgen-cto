"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, ReactNode, Children, isValidElement, useEffect, useState } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  threshold?: number;
}

export default function StaggerReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  duration = 0.6,
  threshold = 0.1,
}: StaggerRevealProps) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold 
  });

  const directionOffset = {
    up: { y: shouldReduceMotion ? 0 : 30, x: 0 },
    down: { y: shouldReduceMotion ? 0 : -30, x: 0 },
    left: { y: 0, x: shouldReduceMotion ? 0 : 30 },
    right: { y: 0, x: shouldReduceMotion ? 0 : -30 },
  };

  const containerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        delay: shouldReduceMotion ? 0 : delay,
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delay,
        type: "tween" as const,
      },
    },
  };

  const itemVariants = {
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
        ease: [0.25, 0.1, 0.25, 1] as const,
        type: "tween" as const,
      },
    },
  };

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
      style={{
        willChange: isInView ? "auto" : "transform, opacity",
      }}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{
                willChange: isInView ? "auto" : "transform, opacity",
              }}
              transformTemplate={({ x, y, rotate }) => 
                `translate3d(${x}, ${y}, 0) rotate(${rotate})`
              }
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}