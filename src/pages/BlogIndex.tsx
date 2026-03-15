import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { posts } from '../data/posts';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-14 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          hamdankhan.netlify.app
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Writing</h1>
          <p className="text-gray-500 text-sm">
            Notes on engineering, systems, and things I've built.
          </p>
        </motion.div>

        {/* Posts */}
        <div className="space-y-px">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block py-8 border-t border-white/6 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-teal-400/80 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-xs text-gray-600">{formatDate(post.date)}</span>
                      <span className="text-gray-700">·</span>
                      <span className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock size={11} />
                        {post.readTime} min read
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-gray-700 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                  />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* End rule */}
          <div className="border-t border-white/6" />
        </div>

      </div>
    </div>
  );
}
