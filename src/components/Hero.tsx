"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal, Repeat, ChevronDown, Download } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const command = "npm install hamdan-khan";
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => { setShowVideo(true); }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [showVideo]);

  useEffect(() => {
    if (phase === 0) {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < command.length) {
          setText(command.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setPhase(1), 500);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
    if (phase === 1) setTimeout(() => setPhase(2), 1000);
    if (phase === 2) {
      setTimeout(() => {
        setPhase(3);
        setShowSuccess(true);
        setTimeout(() => setAnimationComplete(true), 800);
      }, 1000);
    }
  }, [phase]);

  const rerunAnimation = () => {
    setText("");
    setPhase(0);
    setShowSuccess(false);
    setAnimationComplete(false);
  };

  return (
    <div
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 55% 35%, #0d0d24 0%, #060614 55%, #030309 100%)",
      }}
    >
      {/* ── Video background ─────────────────────────────────────────── */}

      {/* Mobile static fallback */}
      <img
        src="/loop-bg.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none block md:hidden"
      />

      {/* Desktop video */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none hidden md:block"
          {...({ defaultMuted: true } as any)}
        >
          <source src="/spacevid-ios-small.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay — keeps text readable over the video */}
      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-br from-black/70 via-gray-900/40 to-black/70 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* ── Aurora orbs ─────────────────────────────────────────────── */}
      {/*
        Five large, heavily blurred gradient orbs that drift slowly using
        the aurora-1/2/3 keyframes defined in index.css. Together they
        create the northern-lights feel. Orbs are intentionally larger
        on the hero than on other sections so the landing page has impact.
      */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">

        {/* Cyan tint — top-right, tones the video toward aurora palette */}
        <div
          className="absolute -top-24 -right-24 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[950px] lg:h-[950px] rounded-full blur-[160px] aurora-1"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)" }}
        />

        {/* Teal tint — bottom-left */}
        <div
          className="absolute -bottom-24 -left-24 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] lg:w-[900px] lg:h-[900px] rounded-full blur-[150px] aurora-2"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 70%)" }}
        />

        {/* Emerald — center accent */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-1/4 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full blur-[130px] aurora-3"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Grain overlay (depth / texture) ─────────────────────────── */}
      <div className="hero-grain" style={{ zIndex: 2 }} />

      {/* ── Bottom section fade into next section ───────────────────── */}
      <motion.div
        className="absolute bottom-0 w-full h-48 sm:h-40 bg-gradient-to-t from-black to-transparent z-[3] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* ── Main content ─────────────────────────────────────────────── */}
      {/*
        Content left-aligned inside a centered max-width container.
        Scales from 320px phones → 4K TVs via progressive max-w steps.
        pt-20 clears the fixed header; pb-24 clears the scroll indicator.
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 pt-20 pb-28 sm:pb-24">
        <div className="w-full max-w-sm sm:max-w-lg lg:max-w-2xl xl:max-w-3xl">

          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-emerald-400 text-xs font-mono tracking-wide">Available · Sep 2026</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-400 neon-border leading-tight mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Hamdan Khan
          </motion.h1>

          {/* Accent bar */}
          <motion.div
            className="w-20 sm:w-28 h-[3px] bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mb-5 sm:mb-7"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />

          {/* Terminal widget */}
          <motion.div
            className="bg-black/90 text-green-400 font-mono text-xs sm:text-sm rounded-xl shadow-2xl w-full max-w-[280px] sm:max-w-[320px] mb-5 sm:mb-8 border border-white/8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* macOS-style traffic lights header */}
            <div className="flex items-center justify-between bg-gray-800/70 px-3 py-2 rounded-t-xl border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <span className="text-[10px] text-gray-500 tracking-widest">terminal</span>
              <button
                onClick={rerunAnimation}
                className="p-1 hover:bg-teal-500/20 rounded-full transition-all"
                aria-label="Replay animation"
              >
                <Repeat className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" />
              </button>
            </div>

            {/* Terminal body */}
            <div className="p-3 sm:p-4 space-y-0.5">
              <div>
                <span className="text-gray-500">$ </span>
                {text}
                <span className="animate-pulse text-green-400">|</span>
              </div>
              {phase === 1 && <div className="text-yellow-400/90">Loading packages...</div>}
              {phase === 2 && <div className="text-blue-400/90">[====================] 100%</div>}
              {showSuccess && <div className="text-green-400">✔ Installation successful!</div>}
            </div>
          </motion.div>

          {/* Post-animation content */}
          {animationComplete && (
            <>
              {/* Role + company */}
              <motion.div
                className="mb-3 sm:mb-5"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-lg sm:text-xl lg:text-2xl text-white font-semibold tracking-wide">
                  Systems Engineering Intern
                </h2>
                <p className="text-base sm:text-lg font-mono mt-1 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]">
                  @ Hydro One Networks
                </p>
              </motion.div>

              {/* Punchy one-liner */}
              <motion.p
                className="text-xl sm:text-2xl lg:text-3xl font-semibold max-w-sm sm:max-w-lg mb-6 sm:mb-8 leading-snug tracking-tight"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <span className="text-white">Building </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">intelligent systems</span>
                <span className="text-white"> and modern </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">web experiences.</span>
              </motion.p>

              {/* Social icons + Download CV */}
              <motion.div
                className="flex flex-wrap items-center gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {[
                  {
                    href: "https://github.com/h10khxn",
                    label: "GitHub",
                    icon: Github,
                    external: true,
                  },
                  {
                    href: "https://www.linkedin.com/in/hamdankhan1704",
                    label: "LinkedIn",
                    icon: Linkedin,
                    external: true,
                  },
                  {
                    href: "mailto:hamdan.khan@ontariotechu.net",
                    label: "Email",
                    icon: Mail,
                    external: false,
                  },
                ].map(({ href, label, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={label}
                    className="p-2.5 sm:p-3 rounded-full bg-white/5 hover:bg-teal-500/15 border border-white/10 hover:border-teal-500/40 transition-all duration-200 group"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-teal-400 transition-colors duration-200" />
                  </a>
                ))}

                {/* Download CV pill */}
                <motion.a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/25 hover:border-teal-500/50 text-teal-300 text-sm font-medium transition-all duration-200 group"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                  Download CV
                </motion.a>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6.5, duration: 1 }}
      >
        <span className="text-[9px] sm:text-[10px] text-gray-600 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-6 sm:h-8 bg-gradient-to-b from-teal-500/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          style={{ originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
        />
        <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
      </motion.div>

      {/* ── Floating terminal icon ────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-6 right-4 sm:right-8 z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400/60" />
      </motion.div>
    </div>
  );
}
