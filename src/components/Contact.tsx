import React from 'react';
import { Github, Linkedin, Mail, Clock } from 'lucide-react';

function SocialCard({ 
  icon: Icon, 
  title, 
  description, 
  link, 
  color 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  link: string; 
  color: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl p-px hover:scale-105 transition-all duration-300"
      style={{
        background: `linear-gradient(45deg, ${color}, transparent)`
      }}
    >
      <div className="relative flex h-full flex-col gap-4 rounded-xl bg-gray-900/95 backdrop-blur-sm p-8 transition-all duration-300 group-hover:bg-gray-900/75">
        <div 
          className="inline-flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: color + '20' }}
        >
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-gray-400">{description}</p>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-sm font-medium">
          <span style={{ color }}>Connect</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            style={{ color }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

function Contact() {
  const socials = [
    {
      icon: Github,
      title: 'GitHub',
      description: 'Check out my open source projects and contributions',
      link: 'https://github.com/h10khxn',
      color: '#6e5494'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      description: 'Connect with me professionally and explore my work experience',
      link: 'https://www.linkedin.com/in/hamdankhan1704',
      color: '#0077b5'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Reach out directly via email',
      link: 'mailto:hkssocials@gmail.com',
      color: '#EA4335'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
            Let's Connect!
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose your preferred way to get in touch. Whether you want to discuss a project, 
            ask a question, or just say hello, I'm always happy to connect!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socials.map((social, index) => (
            <SocialCard key={index} {...social} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-gray-400 backdrop-blur-sm">
            <Clock className="w-5 h-5" />
            <span>Response time: Usually within 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;