import { Github, Linkedin, Mail, ArrowUpCircle } from "lucide-react";
import { Link } from "react-scroll";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
        
        {/* Social Links with Gradient and Hover Animation */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://github.com/h10khxn" target="_blank" rel="noopener noreferrer" className="gradient-icon transition-transform transform hover:scale-125">
            <Github className="w-8 h-8" />
          </a>
          <a href="https://www.linkedin.com/in/hamdankhan1704" target="_blank" rel="noopener noreferrer" className="gradient-icon transition-transform transform hover:scale-125">
            <Linkedin className="w-8 h-8" />
          </a>
          <a href="mailto:hamdan.khan@ontariotechu.net" className="gradient-icon transition-transform transform hover:scale-125">
            <Mail className="w-8 h-8" />
          </a>
        </div>

        {/* Gradient Animated Text with a Glow Effect */}
        <p className="text-lg md:text-xl font-semibold animated-gradient-text glow-text">
          Designed and Developed by Hamdan Khan | © 2024 All Rights Reserved
        </p>

        {/* Quick Links with Pop-Up Hover Effect */}
        <nav className="text-base space-x-4">
          {['Home', 'Technologies', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item.toLowerCase()}
              smooth={true}
              duration={500}
              offset={-70}
              className="footer-link cursor-pointer animated-gradient-text transition-all hover:scale-105"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Back to Top Button with Bounce Animation */}
        <div className="mt-6">
          <Link to="home" smooth={true} duration={500} className="inline-flex items-center gradient-icon transition-all hover:scale-110">
            <ArrowUpCircle className="w-7 h-7 mr-1 animate-bounce gradient-icon" />
            <span className="animated-gradient-text">Back to Top</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
