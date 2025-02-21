import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { NavMenu } from "@/components/nav-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { RatingsSection } from "@/components/ratings-section";
import { TechnicalExperience } from "@/components/TechnicalExperience";
import { AchievementsSection } from "@/components/AchievementsSection";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavMenu />
      <ThemeToggle />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <AchievementsSection />
      <TechnicalExperience/>
      <ProjectsSection />
      <RatingsSection />
      <ContactSection />
    </motion.div>
  );
}
