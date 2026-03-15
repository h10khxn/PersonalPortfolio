import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import TechWheel from '../components/TechWheel';
import Header from '../components/Header';
import Certifications from '../components/Certifications';
import Footer from '../components/Footer';
import Experience from '../components/Experience';
import ProjectsAndDetails from '../components/ProjectsAndDetails';
import GitHubFeed from '../components/GitHubFeed';

export default function Portfolio() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <section id="home" className="pt-0"><Hero /></section>
      <section id="skills" className="py-0"><Skills /></section>
      <section id="technologies" className="py-0"><TechWheel /></section>
      <section id="experience" className="py-0"><Experience /></section>
      <section id="projects" className="py-0"><ProjectsAndDetails /></section>
      <section id="activity" className="py-0"><GitHubFeed /></section>
      <section id="certifications" className="py-0"><Certifications /></section>
      <section id="contact" className="py-0"><Contact /></section>
      <section id="footer" className="py-0"><Footer /></section>
    </div>
  );
}
