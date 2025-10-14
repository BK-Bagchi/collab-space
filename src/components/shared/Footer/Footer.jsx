import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import projectName, { projectSlogan } from "../../../utils/getProjectName";

const Footer = () => {
  const user = true;
  return (
    <footer className="bg-charcoalGray text-softWhite px-6 py-10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Left Section: Branding */}
        <div className="flex flex-col gap-2">
          <a className="text-2xl font-bold logo-font">{projectName()}</a>
          <span className="text-sm font-body">{projectSlogan()}</span>
          <span className="text-xs text-gray-400">v1.0.0</span>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-heading font-semibold mb-2">Quick Links</h4>
          <ul className="flex flex-col gap-1 text-sm">
            {user ? (
              <>
                <li>
                  <a
                    href="/dashboard"
                    className="hover:text-[#2972FF] transition"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/projects"
                    className="hover:text-[#2972FF] transition"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a href="/tasks" className="hover:text-[#2972FF] transition">
                    Tasks
                  </a>
                </li>
                <li>
                  <a href="/chat" className="hover:text-[#2972FF] transition">
                    Chat
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/" className="hover:text#2972FF] transition">
                    Homepage
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-electricBlue transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="hover:text-electricBlue transition"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-electricBlue transition"
                  >
                    Contact
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right Section: Support & Social */}
        <div className="flex flex-col gap-2">
          <h4 className="font-heading font-semibold mb-2">Support</h4>
          <p className="text-sm">help@collabspace.com</p>
          <div className="flex gap-3 mt-2">
            <a
              href="https://github.com/"
              target="_blank"
              className="hover:text-electricBlue transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              className="hover:text-electricBlue transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              className="hover:text-electricBlue transition"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-sm flex flex-col items-center text-gray-400">
        <span>© 2025 Collab Space. All rights reserved.</span>
        <span className="flex gap-2 mt-2 md:mt-0">
          <a href="/terms" className="hover:text-electricBlue transition">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:text-electricBlue transition">
            Privacy Policy
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
