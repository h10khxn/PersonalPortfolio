import { Route, Routes } from 'react-router-dom';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/project/:id" element={<Portfolio />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}
