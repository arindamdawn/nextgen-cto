"use client";

import { ReactNode } from "react";

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
  // delay = 0,
  // direction = "up",
  // duration = 0.6,
  // threshold = 0.1,
  // stagger = false,
  // staggerDelay = 0.1,
}: ScrollRevealProps) {
  // Temporarily disable all animations - render content directly
  return (
    <div className={className}>
      {children}
    </div>
  );
}