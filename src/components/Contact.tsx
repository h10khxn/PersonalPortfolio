import React from 'react';
import { Github, Linkedin, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const socials = [
    {
      icon: Github,
      title: 'GitHub',
      desc: 'Open source projects',
      href: 'https://github.com/h10khxn',
      color: '#6e5494',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      desc: 'Professional profile',
      href: 'https://www.linkedin.com/in/hamdankhan1704',
      color: '#0077b5',
    },
    {
      icon: Mail,
      title: 'Email',
      desc: 'Direct message',
      href: 'mailto:hkssocials@gmail.com',
      color: '#14b8a6',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-black overflow-hidden">
      {/* Faint section number */}
      <div
        className="absolute -top-6 right-4 sm:right-12 text-[120px] sm:text-[180px] font-black select-none pointer-events-none leading-none"
        style={{ color: 'rgba(255,255,255,0.018)' }}
      >
        07
      </div>

      {/* Aurora orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 70%)' }}
      />

      {/* Top edge fade */}
      <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-teal-400" />
            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-500 tracking-wide">
              CONTACT
            </h2>
          </div>
          <div className="h-px w-20 mx-auto rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 mb-12" />

          {/* ── Main headline ── */}
          <h3 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-5">
            Let's build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400">
              something.
            </span>
          </h3>

          <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Open to new projects, co-op opportunities, and interesting conversations.
          </p>

          {/* ── Primary email CTA ── */}
          <motion.a
            href="mailto:hkssocials@gmail.com"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-teal-500/10 hover:bg-teal-500/18 border border-teal-500/25 hover:border-teal-400/55 text-teal-300 text-base sm:text-lg font-semibold transition-all duration-200 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            hkssocials@gmail.com
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-12" />

        {/* ── Social cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {socials.map(({ icon: Icon, title, desc, href, color }) => (
            <motion.a
              key={title}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-200 group text-left"
              whileHover={{ y: -2 }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: color + '22' }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-500 truncate">{desc}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 flex-shrink-0 transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Response time */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-gray-600 text-sm flex items-center justify-center gap-2"
        >
          <Clock className="w-3.5 h-3.5" />
          Usually responds within 24 hours
        </motion.p>
      </div>
    </section>
  );
}
