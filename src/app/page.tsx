import Hero from "@/components/sections/Hero";
import Roadmaps from "@/components/sections/Roadmaps";
import Instructor from "@/components/sections/Instructor";
import Testimonials from "@/components/sections/Testimonials";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Roadmaps />
      <Instructor />
      <Testimonials />
      <Waitlist />
      <Footer />
    </main>
  );
}