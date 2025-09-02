"use client";

import { ReactNode } from "react";

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
  // delay = 0,
  // staggerDelay = 0.1,
  // direction = "up",
  // duration = 0.6,
  // threshold = 0.1,
}: StaggerRevealProps) {
  // Temporarily disable all animations - render content directly
  return (
    <div className={className}>
      {children}
    </div>
  );
}