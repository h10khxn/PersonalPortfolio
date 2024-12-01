import React from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Background3D from './components/Background3D';
import TechWheel from './components/TechWheel';
import Header from './components/Header';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import ProjectsAndDetails from './components/ProjectsAndDetails';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen text-white"> {/* Removed gradient classes */}
      {/* Header */}
      <Header />

      {/* Sections */}
      <section id="home" className="pt-0">
        <Hero />
      </section>

      <section id="technologies" className="py-0">
        <TechWheel />
      </section>

      <section id="projects" className="py-0">
        <Routes>
          <Route path="/" element={<ProjectsAndDetails />} />
          <Route path="/project/:id" element={<ProjectsAndDetails />} />
        </Routes>
      </section>

      <section id="skills" className="py-0">
        <Skills />
      </section>

      <section id="certifications" className="py-0">
        <Certifications />
      </section>

      <section id="contact" className="py-0">
        <Contact />
      </section>

      <section id="footer" className="py-0">
        <Footer />
      </section>
    </div>
  );
}
