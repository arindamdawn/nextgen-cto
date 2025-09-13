"use client";

// import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";
import { Roadmap } from "@/types";
import { cn } from "@/lib/utils";
import { landingPageConfig } from '@/config/landingPageConfig';



const RoadmapCard = ({
  roadmap,
}: {
  roadmap: Roadmap;
  index: number;
}) => {
  const [showAllSteps, setShowAllSteps] = useState(false);
  const PREVIEW_COUNT = 6;

  // Make card fill available height and distribute content vertically
  return (
    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden group hover:shadow-xl hover:border-gray-600/50 transition-all duration-300 h-full">
      {/* Gradient Header */}
      <div className={cn("h-2 bg-gradient-to-r", roadmap.color)} />

      <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
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
          {(showAllSteps ? roadmap.steps : roadmap.steps.slice(0, PREVIEW_COUNT)).map((step, stepIndex) => (
            <div key={step.id} className="flex items-center gap-3 group/step">
              {/* Step Number */}
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-white text-sm font-semibold",
                roadmap.color
              )}>
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

          {roadmap.steps.length > PREVIEW_COUNT && (
            <div className="pt-2">
              <button
                onClick={() => setShowAllSteps(!showAllSteps)}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                aria-expanded={showAllSteps}
              >
                {showAllSteps ? `Show less` : `Show ${roadmap.steps.length - PREVIEW_COUNT} more`}
              </button>
            </div>
          )}
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

        {/* If the final row is incomplete, render placeholder cards to fill the grid */}
        {(() => {
          const perRow = 3;
          const remainder = roadmaps.data.length % perRow;
          const placeholders = remainder === 0 ? 0 : perRow - remainder;
          // If two placeholders would be needed, render a single spanning placeholder to avoid redundancy
          if (placeholders === 2) {
            return (
              <div key={`placeholder-span`} className="relative bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-transparent backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/40 overflow-hidden p-6 flex flex-col justify-between lg:col-span-2">
                <div>
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 010 2H4v5a1 1 0 01-2 0v-6z" />
                        <path d="M7 7a1 1 0 011-1h8a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">More roadmaps coming soon</h3>
                      <div className="mt-1 text-sm text-gray-300">We&apos;re building new learning paths — sign up to be notified when they launch.</div>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">Expect deep, structured roadmaps covering trending domains and practical projects tailored for aspiring technical leaders.</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-400">Stay in the loop — we&apos;ll notify when new roadmaps arrive.</span>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        const waitlistSection = document.getElementById("waitlist");
                        if (waitlistSection) waitlistSection.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Join Waitlist
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return Array.from({ length: placeholders }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl shadow-inner border border-dashed border-gray-700/40 overflow-hidden p-6 flex flex-col justify-between"
            >
              <div>
                <div className="h-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-t-md mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">More roadmaps coming soon</h3>
                <p className="text-gray-300 mb-4">We&apos;re expanding our learning paths — new roadmaps will be added shortly to help you master more topics.</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Stay in the loop</span>
                <button
                  onClick={() => {
                    const waitlistSection = document.getElementById("waitlist");
                    if (waitlistSection) waitlistSection.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          ));
        })()}
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
