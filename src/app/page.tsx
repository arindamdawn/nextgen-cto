"use client";

import { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import Roadmaps from "@/components/sections/Roadmaps";
import Instructor from "@/components/sections/Instructor";
import Testimonials from "@/components/sections/Testimonials";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/sections/Footer";

export default function Home() {
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup function to reset scroll behavior
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Roadmaps Section */}
      <section id="roadmaps">
        <Roadmaps />
      </section>

      {/* Instructor Section */}
      <section id="instructor">
        <Instructor />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Waitlist Section */}
      <section id="waitlist">
        <Waitlist />
      </section>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}