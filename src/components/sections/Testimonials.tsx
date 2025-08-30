"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Software Engineer',
    company: 'Google',
    feedback: 'The NextGen-CTO program transformed my understanding of leadership in tech. The AI/ML roadmap was particularly comprehensive and helped me transition from a developer to a technical leader.',
    avatar: '/api/placeholder/64/64',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Product Manager',
    company: 'Microsoft',
    feedback: 'Incredible depth of content across all domains. The design roadmap opened up new perspectives on user experience that I never considered as a PM. Highly recommend!',
    avatar: '/api/placeholder/64/64',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Tech Lead',
    company: 'Stripe',
    feedback: 'The coding roadmap PDF was a game-changer. It provided a clear path from basics to advanced concepts. The structured approach helped me mentor my team more effectively.',
    avatar: '/api/placeholder/64/64',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Engineering Manager',
    company: 'Airbnb',
    feedback: 'What sets this program apart is the holistic approach. Learning code, design, AI, and leadership together gave me the complete toolkit I needed to become a well-rounded CTO.',
    avatar: '/api/placeholder/64/64',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle touch events for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevTestimonial();
      } else if (e.key === 'ArrowRight') {
        nextTestimonial();
      }
    };

    // Only add keyboard listener when component is focused
    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            What Our Students Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who have transformed their careers with NextGen-CTO
          </p>
        </div>
      </ScrollReveal>

      <div 
        ref={containerRef}
        className="relative max-w-4xl mx-auto px-2 sm:px-4 focus:outline-none"
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label="Testimonials carousel"
        aria-live="polite"
      >
        {/* Main Testimonial Display */}
        <div className="relative min-h-[360px] sm:min-h-[320px] md:min-h-[280px] lg:h-64 overflow-hidden">
          {/* Disable AnimatePresence temporarily */}
          <div className="absolute inset-0">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-gray-700/50 p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
              <div className="flex-1 flex flex-col justify-center">
                {/* Rating Stars */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(testimonials[currentIndex].rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current mx-0.5"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-sm sm:text-base md:text-lg text-gray-200 text-center leading-relaxed mb-4 sm:mb-6 md:mb-8 px-2">
                  &ldquo;{testimonials[currentIndex].feedback}&rdquo;
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-center flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg md:text-xl mr-3 sm:mr-4 flex-shrink-0">
                  {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left min-w-0">
                  <div className="font-semibold text-white text-sm sm:text-base truncate">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm">
                    <div className="truncate">{testimonials[currentIndex].role}</div>
                    {testimonials[currentIndex].company && (
                      <div className="text-blue-400 truncate">@ {testimonials[currentIndex].company}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center mt-6 sm:mt-8 px-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full min-w-[44px] min-h-[44px] border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 bg-gray-800/50 backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2 sm:space-x-3 mx-4 sm:mx-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`min-w-[44px] min-h-[44px] w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                  index === currentIndex
                    ? 'bg-blue-500 scale-110 ring-2 ring-blue-400/50'
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full min-w-[44px] min-h-[44px] border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 bg-gray-800/50 backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Auto-advance indicator */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            {currentIndex + 1} of {testimonials.length}
          </p>
        </div>
      </div>

      {/* Additional testimonials preview on larger screens */}
      <div className="hidden lg:block mt-12 xl:mt-16">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto px-4">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 lg:p-6 shadow-md hover:shadow-lg hover:border-gray-600/50 transition-all duration-300"
              >
                <div className="flex items-center mb-3 lg:mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm lg:text-base mr-3 flex-shrink-0">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm lg:text-base text-white truncate">{testimonial.name}</div>
                    <div className="text-xs lg:text-sm text-gray-300 truncate">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-sm lg:text-base text-gray-200 line-clamp-3 leading-relaxed">
                  &ldquo;{testimonial.feedback.substring(0, 120)}...&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}