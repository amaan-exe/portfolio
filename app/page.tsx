import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

export default function Home() {
  return (
    <main className="relative bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] font-body selection:bg-[var(--accent-500)] selection:text-[#050508] overflow-hidden">
      <ScrollProgressBar />
      <Navbar />

      <HeroSection />
      
      <div className="relative z-10 bg-[var(--bg-primary)]">
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <TimelineSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
