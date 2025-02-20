import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { RatingSection } from "@/components/rating-section";
import { ContactSection } from "@/components/contact-section";
import { NavMenu } from "@/components/nav-menu";
import { ThemeToggle } from "@/components/theme-toggle";

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
      <ProjectsSection />
      <RatingSection />
      <ContactSection />
    </motion.div>
  );
}