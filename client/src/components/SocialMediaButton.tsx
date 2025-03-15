import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faTwitter, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const socialLinks = [
  { name: "Telegram", link: "https://t.me/amanagraw35", icon: faTelegram },
  { name: "Twitter", link: "https://twitter.com/AmanAgrawal1310", icon: faTwitter },
  { name: "LinkedIn", link: "https://www.linkedin.com/in/aman-agrawal-269233252", icon: faLinkedinIn },
  { name: "GitHub", link: "https://github.com/Aman-agraw-35", icon: faGithub },
];

const SocialMediaButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout); // Prevent closing if hovered back in
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 3000); // Hide after 3 seconds
    setHideTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout); // Cleanup timeout on unmount
      }
    };
  }, [hideTimeout]);

  return (
    <div
      className="fixed left-4 top-24 transform -translate-y-1/2 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        {/* Floating Button */}
        <div className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300">
          <FontAwesomeIcon icon={faUserCircle} size="2xl" />
        </div>

        {/* Expanded Social Links */}
        <div
          className={`absolute left-16 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-lg p-2 flex gap-3 items-center transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {socialLinks.map(({ name, link, icon }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              title={name}
            >
              <FontAwesomeIcon icon={icon} className="text-gray-800" size="lg" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaButton;
