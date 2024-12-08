import { Github, Linkedin, Mail } from "lucide-react";

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
        <p className="text-lg md:text-xl font-semibold">
          Designed and Developed by{" "}
          <span className="animated-gradient-text">Hamdan Khan</span> 
        </p>
      </div>
    </footer>
  );
}
