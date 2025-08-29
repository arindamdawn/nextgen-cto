import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}