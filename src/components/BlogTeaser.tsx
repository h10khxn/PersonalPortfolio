import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Tag } from 'lucide-react';
import { posts } from '../data/posts';

export default function BlogTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  const recent = posts.slice(0, 3);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #080810 0%, #0a0818 50%, #080a0a 100%)' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

      {/* Aurora orbs */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none aurora-2"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none aurora-3"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-7 h-7 text-violet-400" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-violet-500">
                BLOG
              </h2>
            </div>
            <div className="h-px w-24 mx-auto rounded-full bg-gradient-to-r from-violet-400 to-indigo-400 mb-5" />
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Writing on systems, software, and things I'm building or researching.
            </p>
          </motion.div>

          {/* Post cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {recent.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ scale: 1.02, transition: { duration: 0.18 } }}
              >
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <div className="h-full rounded-2xl border border-violet-500/15 bg-white/[0.025] backdrop-blur-xl p-6 flex flex-col gap-4 hover:border-violet-500/30 transition-colors duration-300 group">

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                        >
                          <Tag size={9} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-semibold text-base leading-snug group-hover:text-violet-300 transition-colors duration-200">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-xs leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-white/5">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime} min read
                      </span>
                      <span>{new Date(post.date).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link to="/blog">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-3 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400/50 transition-colors duration-200 text-sm font-medium"
              >
                Read all posts
                <ArrowRight size={15} />
              </motion.div>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}
