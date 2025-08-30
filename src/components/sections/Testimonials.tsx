"use client";

import React, { useState } from 'react';
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with NextGen-CTO
          </p>
        </div>
      </ScrollReveal>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Main Testimonial Display */}
        <div className="relative min-h-[320px] sm:min-h-[280px] md:h-64 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-base sm:text-lg text-gray-700 text-center leading-relaxed mb-6 sm:mb-8">
                    &ldquo;{testimonials[currentIndex].feedback}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-center">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3 sm:mr-4">
                    {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonials[currentIndex].role}
                      {testimonials[currentIndex].company && (
                        <span className="text-blue-600"> @ {testimonials[currentIndex].company}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-600 scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Auto-advance indicator */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            {currentIndex + 1} of {testimonials.length}
          </p>
        </div>
      </div>

      {/* Additional testimonials preview on larger screens */}
      <div className="hidden lg:block mt-16">
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-3">
                  &ldquo;{testimonial.feedback.substring(0, 120)}...&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}