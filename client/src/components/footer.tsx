import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative  text-white py-6 mt-12 text-center">
      <div className="container mx-auto py-2 px-4">
        <p className="text-sm">© {new Date().getFullYear()} Aman Agrawal. All rights reserved.</p>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-1/2 transform -translate-x-1/2 -top-6 bg-white text-gray-900 p-3  rounded-full shadow-md transition hover:bg-gray-200"
      >
        <FontAwesomeIcon icon={faArrowUp} size="lg" />
      </motion.button>
    </footer>
  );
};

export default Footer;
