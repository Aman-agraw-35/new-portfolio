import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faCode } from "@fortawesome/free-solid-svg-icons"; // Icons
import leetcodeLogo from "../assets/leetcode.png";
import codeforcesLogo from "../assets/codeforces.png";
import gfgLogo from "../assets/gfg.png";
import codechefLogo from "../assets/codechef.png";

const platforms = [
  { name: "LeetCode", link: "https://leetcode.com/u/user7782Ru/", logo: leetcodeLogo },
  { name: "Codeforces", link: "https://codeforces.com/profile/GHOST-AMAN", logo: codeforcesLogo },
  { name: "GeeksforGeeks", link: "https://www.geeksforgeeks.org/user/amanagbqrd/", logo: gfgLogo },
  // { name: "CodeChef", link: "https://www.codechef.com/users/amanagrawal35", logo: codechefLogo },
  { name: "Resume", link: "https://drive.google.com/file/d/1_y9l9mNPAc9FSRJRVhk0IGgXM_N8YzXR/view", icon: faFileCirclePlus },
];

const RightFloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setIsOpen(false), 3000);
    setHideTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [hideTimeout]);

  return (
    <div
      className="fixed right-4 top-24 transform -translate-y-1/2 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        {/* Floating Button */}
        <div className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300">
          <FontAwesomeIcon icon={faCode} size="xl" />
        </div>

        {/* Expanded Links */}
        <div
          className={`absolute right-16 top-32 transform -translate-y-1/2 mt-1 bg-white shadow-lg rounded-lg p-3 flex flex-col gap-3 items-center transition-opacity duration-300 w-auto min-w-[200px] px-4 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {platforms.map(({ name, link, logo, icon }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition flex items-center gap-3 w-full"
              title={name}
            >
              {logo ? (
                <img src={logo} alt={name} className="w-6 h-6" />
              ) : (
                <FontAwesomeIcon icon={icon!} className="text-gray-800" size="lg" />
              )}
              <span className="text-gray-800 font-medium">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightFloatingButtons;
