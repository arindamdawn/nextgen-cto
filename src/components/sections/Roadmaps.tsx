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
  isOpen,
  onToggle,
}: {
  roadmap: Roadmap;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const [showAllSteps, setShowAllSteps] = useState(false);
  const PREVIEW_COUNT = 6;


  return (
    <div className={cn(
      "relative bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden transition-all duration-300",
      isOpen ? "ring-2 ring-white/6" : "group hover:shadow-xl hover:border-gray-600/50"
    )}>
      {/* Header (clickable) */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left flex items-center justify-between p-4 sm:p-6"
      >
        <div>
          <h3 className="text-2xl font-bold text-white">{roadmap.title}</h3>
          <p className="text-sm text-gray-300 mt-1">{roadmap.description}</p>
        </div>
        <div className="ml-4 flex items-center gap-3">
          {roadmap.externalLink && (
            <a
              href={roadmap.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View PDF
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <ArrowRight className={cn("w-5 h-5 text-gray-400 transition-transform", isOpen ? "rotate-90" : "rotate-0")} />
        </div>
      </button>

      {/* Gradient Divider */}
      <div className={cn("h-2 bg-gradient-to-r", roadmap.color)} />

      {/* Expanded content */}
      {isOpen && (
        <div className="p-4 sm:p-6 border-t border-gray-700">
          <div className="space-y-3">
            {(() => {
              const displayedSteps = showAllSteps ? roadmap.steps : roadmap.steps.slice(0, PREVIEW_COUNT);
              return (
                <>
                  {displayedSteps.map((step, stepIndex) => {
                    const isLast = stepIndex === displayedSteps.length - 1;
                    return (
                      <div key={step.id} className="flex items-center gap-4 group/step">
                        <div className="flex flex-col items-center">
                          {/* left accent stripe */}
                          <div className={cn("w-1 h-8 rounded-sm bg-gradient-to-b", roadmap.color)} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-gray-500" />
                              <span className="text-gray-100 font-medium leading-6 group-hover/step:text-white transition-colors">
                                {step.title}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover/step:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    );
                  })}

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
                </>
              );
            })()}
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
      )}
    </div>
  );
};

export default function Roadmaps() {
  const { roadmaps } = landingPageConfig;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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

      <div className="flex flex-col gap-6 md:gap-8 px-4">
        {roadmaps.data.map((roadmap, index) => (
          <RoadmapCard
            key={roadmap.id}
            roadmap={roadmap}
            isOpen={activeIndex === index}
            onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
          />
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
