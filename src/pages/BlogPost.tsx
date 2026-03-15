import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { posts, type ContentBlock } from '../data/posts';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="text-xl font-bold text-white mt-10 mb-4">{block.text}</h2>;
    case 'h3':
      return <h3 className="text-lg font-semibold text-gray-100 mt-8 mb-3">{block.text}</h3>;
    case 'p':
      return <p className="text-gray-400 leading-[1.85] mb-5 text-[15px]">{block.text}</p>;
    case 'ul':
      return (
        <ul className="mb-5 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-400 text-[15px] leading-relaxed">
              <span className="mt-2.5 w-1 h-1 rounded-full bg-teal-400 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <div className="mb-6 rounded-xl overflow-hidden border border-white/6">
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/6">
            <span className="text-xs text-gray-500 font-mono">{block.lang}</span>
          </div>
          <pre className="p-5 overflow-x-auto bg-white/[0.025]">
            <code className="text-sm text-gray-300 font-mono leading-relaxed">{block.code}</code>
          </pre>
        </div>
      );
    case 'quote':
      return (
        <blockquote className="my-6 pl-5 border-l-2 border-teal-500/50">
          <p className="text-gray-300 italic leading-relaxed text-[15px]">{block.text}</p>
        </blockquote>
      );
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Post not found.</p>
        <Link to="/blog" className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
          ← Back to writing
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-14 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {/* Post header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 mb-5">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-teal-400/80 font-mono">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-5">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-600 pb-8 border-b border-white/6">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTime} min read
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </motion.div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            All posts
          </Link>
        </div>

      </div>
    </div>
  );
}
