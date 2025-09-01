"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";
import { Roadmap } from "@/types";
import { cn } from "@/lib/utils";
import { landingPageConfig } from '@/config/landingPageConfig';



const RoadmapCard = ({
  roadmap,
  index,
}: {
  roadmap: Roadmap;
  index: number;
}) => {
  // Temporarily disable all motion animations
  return (
    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden group hover:shadow-xl hover:border-gray-600/50 transition-all duration-300">
      {/* Gradient Header */}
      <div className={cn("h-2 bg-gradient-to-r", roadmap.color)} />

      <div className="p-4 sm:p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">{roadmap.title}</h3>
          {roadmap.externalLink && (
            <a
              href={roadmap.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View PDF
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <p className="text-gray-300 mb-6">{roadmap.description}</p>

        {/* Timeline Steps */}
        <div className="space-y-3">
          {roadmap.steps.map((step, stepIndex) => (
            <div
              key={step.id}
              className="flex items-center gap-3 group/step"
            >
              {/* Step Number */}
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-white text-sm font-semibold",
                  roadmap.color
                )}
              >
                {stepIndex + 1}
              </div>

              {/* Step Content */}
              <div className="flex-1 flex items-center justify-between">
                <span className="text-gray-200 font-medium group-hover/step:text-white transition-colors">
                  {step.title}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-500 opacity-0 group-hover/step:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-gray-600">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Learning Path</span>
            <span>{roadmap.steps.length} Steps</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className={cn("h-2 rounded-full bg-gradient-to-r w-full", roadmap.color)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Roadmaps() {
  const { roadmaps } = landingPageConfig;
  
  // Temporarily disable all motion animations
  return (
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {roadmaps.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {roadmaps.subtitle}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
        {roadmaps.data.map((roadmap, index) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} index={index} />
        ))}
      </div>

      {/* Call to Action */}
      <ScrollReveal delay={0.4}>
        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-6">
            {roadmaps.cta.text}
          </p>
          <button
            onClick={() => {
              const waitlistSection = document.getElementById("waitlist");
              if (waitlistSection) {
                waitlistSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            {roadmaps.cta.buttonText}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
}
