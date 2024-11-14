import React from 'react';
import { useParams } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: "Hospital Laboratory System",
    description: "Led development of a system to automate test ordering, result processing, and billing for hospital labs. Built REST APIs using Spring Boot and designed a MySQL database to manage patients, tests, and billing.",
    tech: ["Java", "REST API", "MySQL", "HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    demo: "https://example.com/demo-hospital-lab",
    github:""
  },
  {
    id: 2,
    title: "Mock Airport System",
    description: "Developed a robust mock airport management system in Java, simulating core functionalities such as flight tracking, aircraft status monitoring, and staff management.",
    tech: ["Java", "OOP"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    demo: "https://example.com/demo-airport-system",
    github:""
  },
  {
    id: 3,
    title: "2D Tower Defense Game",
    description: "Utilized agile development methodologies to iterate development on a game, resulting in a 20% increase in player engagement and retention metrics.",
    tech: ["HTML", "CSS", "JavaScript", "JSON"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    demo: "https://example.com/demo-tower-defense",
    github:""
  },
  {
    id: 4,
    title: "Pokémon Todo List",
    description: "Developed a visually engaging and interactive Pokémon-themed to-do list application, resulting in a 40% increase in user engagement and retention.",
    tech: ["HTML", "CSS", "JavaScript", "UML"],
    image: "https://images.unsplash.com/photo-1542779283-429940ce8336?auto=format&fit=crop&q=80&w=800",
    demo: "https://example.com/demo-pokemon-todo",
    github:""
  },
  {
    id:5,
    title: "Ai controlled 2d Car Racing Game",
    description:"Trained an AI model to play a 2D car racing game using Reinforcement Learning. The model was trained using the Proximal Policy Optimization (PPO) algorithm and achieved a top-10 score on the game's leaderboard.",
    tech: ["Python", "Pygame", "NumPy","Gym","Stable Baseline3", "Reinforcement Learning"],
    image:"",
    demo:"https://example.com/demo-ai-car-racing",
    github:"hello"
  },
];

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    return <div className="text-white">Project not found.</div>;
  }

  return (
    <section className="py-20 bg-black min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">{project.title}</h2>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-56 object-cover rounded-lg mb-8" 
        />
        <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
        <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
        <ul className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech, i) => (
            <li key={i} className="px-3 py-1 text-sm bg-violet-500/10 text-violet-400 rounded-full">
              {tech}
            </li>
          ))}
        </ul>
        <a 
          href={project.demo} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition"
        >
          View Demo
        </a>
      </div>
    </section>
  );
}
