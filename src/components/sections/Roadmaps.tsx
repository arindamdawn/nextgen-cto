"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";
import { Roadmap } from "@/types";
import { cn } from "@/lib/utils";

const roadmapsData: Roadmap[] = [
  {
    id: "ai-ml",
    title: "AI/ML",
    description:
      "Master artificial intelligence and machine learning from fundamentals to advanced applications",
    color: "from-blue-500 to-purple-600",
    steps: [
      { id: "python", title: "Python" },
      { id: "math", title: "Math" },
      { id: "classical-ml", title: "Classical ML" },
      { id: "deep-learning", title: "Deep Learning" },
      { id: "cv-nlp", title: "CV & NLP" },
      { id: "transformers", title: "Transformers" },
      { id: "genai-llms", title: "GenAI & LLMs" },
      { id: "agents", title: "Agents" },
      { id: "mlops", title: "MLOps" },
      { id: "tpm-ai", title: "TPM AI for PM" },
    ],
  },
  {
    id: "design",
    title: "Design",
    description:
      "Learn comprehensive design skills from prototyping to advanced visual effects",
    color: "from-pink-500 to-orange-500",
    steps: [
      { id: "figma", title: "Figma" },
      { id: "protopie", title: "ProtoPie/Principle" },
      { id: "after-effects", title: "After Effects/Lottie" },
      { id: "premiere", title: "Premiere Pro/Resolve" },
      { id: "blender", title: "Blender/Photoshop/Illustrator" },
      { id: "runway", title: "Runway/Descript/MidJourney" },
    ],
  },
  {
    id: "coding",
    title: "Coding",
    description: "Comprehensive coding roadmap from zero to hero",
    color: "from-green-500 to-teal-600",
    externalLink:
      "https://github.com/team-codebug/leetcode/blob/main/ZERO2HERO%20(1).pdf",
    steps: [
      { id: "fundamentals", title: "Programming Fundamentals" },
      { id: "data-structures", title: "Data Structures" },
      { id: "algorithms", title: "Algorithms" },
      { id: "system-design", title: "System Design" },
      { id: "advanced-topics", title: "Advanced Topics" },
    ],
  },
];

const RoadmapCard = ({
  roadmap,
  index,
}: {
  roadmap: Roadmap;
  index: number;
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3 + index * 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
    >
      {/* Gradient Header */}
      <div className={cn("h-2 bg-gradient-to-r", roadmap.color)} />

      <div className="p-4 sm:p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{roadmap.title}</h3>
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

        <p className="text-gray-600 mb-6">{roadmap.description}</p>

        {/* Timeline Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-3"
        >
          {roadmap.steps.map((step, stepIndex) => (
            <motion.div
              key={step.id}
              variants={stepVariants}
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
                <span className="text-gray-800 font-medium group-hover/step:text-gray-900 transition-colors">
                  {step.title}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover/step:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Learning Path</span>
            <span>{roadmap.steps.length} Steps</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={cn("h-2 rounded-full bg-gradient-to-r", roadmap.color)}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                delay: 0.5 + index * 0.2,
                ease: "easeOut",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Roadmaps() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Learning Roadmaps
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Structured learning paths designed to take you from beginner to
            expert in the most in-demand skills for modern CTOs
          </p>
        </div>
      </ScrollReveal>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4"
      >
        {roadmapsData.map((roadmap, index) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} index={index} />
        ))}
      </motion.div>

      {/* Call to Action */}
      <ScrollReveal delay={0.4}>
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to start your journey? Join our waitlist to get early access
            to these comprehensive learning paths.
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
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
}
