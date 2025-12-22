import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import projectName, { projectSlogan } from "../../../utils/getProjectName";

const Footer = () => {
  return (
    <footer className="bg-charcoalGray dark:bg-darkSlate border-t border-gray-500 text-softWhite px-6 py-14 mt-auto">
      <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold logo-font">{projectName()}</h2>
          <p className="text-sm text-gray-300 mt-1 font-body">
            {projectSlogan()}
          </p>
          <p className="mt-2 text-xs text-gray-500">v1.0.0</p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/bk-bagchi"
              target="_blank"
              className="hover:text-electricBlue transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/bkbagchi-dipto/"
              target="_blank"
              className="hover:text-electricBlue transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-electricBlue transition"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Product</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link
                to="/dashboard"
                className="hover:text-electricBlue transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="dashboard/projects"
                className="hover:text-electricBlue transition"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="dashboard/tasks"
                className="hover:text-electricBlue transition"
              >
                Tasks
              </Link>
            </li>
            <li>
              <Link
                to="dashboard/notes"
                className="hover:text-electricBlue transition"
              >
                Notes
              </Link>
            </li>
            <li>
              <Link
                to="dashboard/chats"
                className="hover:text-electricBlue transition"
              >
                Chats
              </Link>
            </li>
            <li>
              <Link
                to="dashboard/files"
                className="hover:text-electricBlue transition"
              >
                Files
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Resources</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                API Reference
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                Roadmap
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                Changelog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Company</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-electricBlue transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="hover:text-electricBlue transition"
              >
                Features
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-electricBlue transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
        <span>© 2025 Collab Space. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
