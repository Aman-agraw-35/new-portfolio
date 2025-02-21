import { motion } from "framer-motion";
import { Link } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const menuItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function NavMenu() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false); // Assuming useState is imported

  // const socialLinks = {
  //   telegram: "https://t.me/amanagraw35",
  //   twitter: "https://twitter.com/AmanAgrawal1310",
  //   linkedin: "https://www.linkedin.com/in/aman-agrawal-269233252",
  //   github: "https://github.com/Aman-agraw-35",
  //   resume: "https://drive.google.com/file/d/1_y9l9mNPAc9FSRJRVhk0IGgXM_N8YzXR/view?usp=drive_link"
  // };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-center gap-8">
        {menuItems.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            {item.label}
          </motion.a>
        ))}
   
      </div>
    </motion.nav>
  );
}