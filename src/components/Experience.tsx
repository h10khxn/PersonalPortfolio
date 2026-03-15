import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Calendar, MapPin, Activity, Zap, Shield, Briefcase } from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────────
// Add new roles here — the timeline renders them automatically.

const experiences = [
  {
    id: 'hydro-one',
    company: 'Hydro One Networks Inc.',
    role: 'Protection, Control & Automation Engineering',
    type: 'Co-op',
    period: 'Sep 2025 – Aug 2026',
    duration: '1 Year',
    location: 'Ontario, Canada',
    current: true,
    dotColor: '#f59e0b',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/20',
    accentGlow: 'rgba(245,158,11,0.18)',
    groups: [
      {
        name: 'QA Testing',
        icon: Activity,
        iconBg: 'bg-amber-500/15',
        iconText: 'text-amber-400',
        bullet: 'bg-amber-400',
        items: [
          'Designed and executed end-to-end integration tests to validate real-time data flow between distributed embedded endpoints and centralized backend reporting systems used by control room operations.',
          'Simulated structured input events to verify correct data ingestion, processing, and state propagation across live monitoring infrastructure.',
          'Performed integration and regression testing on real-time telemetry pipelines to ensure accurate alarm reporting, state synchronization, and operational reliability.',
        ],
      },
      {
        name: 'Firmware Development',
        icon: Zap,
        iconBg: 'bg-orange-500/15',
        iconText: 'text-orange-400',
        bullet: 'bg-orange-400',
        items: [
          'Developed, configured, and deployed firmware logic on embedded devices responsible for generating inputs, aggregating station-level signals, and reporting alarm/fault states to centralized systems.',
          'Ensured firmware-level data formatting and signal mapping aligned with backend ingestion requirements, maintaining consistency across distributed system components.',
        ],
      },
      {
        name: 'Systems Reliability',
        icon: Shield,
        iconBg: 'bg-cyan-500/15',
        iconText: 'text-cyan-400',
        bullet: 'bg-cyan-400',
        items: [
          'Validated bidirectional communication interfaces between control systems and field devices, ensuring reliable command dispatch and telemetry feedback.',
          'Diagnosed cross-layer communication failures by tracing data flow across firmware logic, network transmission, and backend processing services.',
          'Supported high-availability operational dashboards by validating telemetry integrity and ensuring timely propagation of critical system events.',
        ],
      },
    ],
    stack: [
      'Distributed Systems',
      'Systems Integration',
      'Real-time Pipelines',
      'Integration Testing',
      'Regression Testing',
      'Embedded Software',
    ],
  },
  // ── Add future roles below this line ─────────────────────────────────────
  {
    id: 'wouessi-digital',
    company: 'Wouessi Digital',
    role: 'Software Engineer',
    type: 'Contract',
    period: 'Mar 2025 – Apr 2025',
    duration: '2 Months',
    location: 'Ontario, Canada',
    current: false,
    dotColor: '#14b8a6',
    accentText: 'text-teal-400',
    accentBg: 'bg-teal-500/10',
    accentBorder: 'border-teal-500/20',
    accentGlow: 'rgba(20,184,166,0.18)',
    groups: [
      {
        name: 'Backend Development',
        icon: Activity,
        iconBg: 'bg-teal-500/15',
        iconText: 'text-teal-400',
        bullet: 'bg-teal-400',
        items: [
          'Built a TypeScript/Node.js backend service to extract, normalize, and process 7,000+ federal IT procurement contracts for competitive benchmarking and spend analysis.',
          'Designed and implemented REST APIs to expose structured contract data to downstream analytics pipelines and internal dashboard integrations.',
          'Optimized document parsing and metadata filtering logic to ensure accurate, scalable insight generation across large procurement datasets.',
        ],
      },
      {
        name: 'CI/CD & Infrastructure',
        icon: Zap,
        iconBg: 'bg-cyan-500/15',
        iconText: 'text-cyan-400',
        bullet: 'bg-cyan-400',
        items: [
          'Engineered a Jenkins CI/CD pipeline to automate dependency installation, linting, unit testing, Docker image builds, and Kubernetes deployments.',
          'Containerized the backend service using Docker and configured Kubernetes manifests for reliable, repeatable deployment across environments.',
        ],
      },
      {
        name: 'Data Processing',
        icon: Shield,
        iconBg: 'bg-indigo-500/15',
        iconText: 'text-indigo-400',
        bullet: 'bg-indigo-400',
        items: [
          'Designed parsing and filtering pipelines to clean and structure raw contract metadata, enabling consistent downstream consumption by reporting tools.',
          'Ensured data integrity and traceability across ingestion, transformation, and API exposure layers to support reliable benchmarking outputs.',
        ],
      },
    ],
    stack: [
      'TypeScript',
      'Node.js',
      'REST APIs',
      'Jenkins',
      'Docker',
      'Kubernetes',
    ],
  }
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-8% 0px' });

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #0c0800 40%, #080810 100%)' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

      {/* Aurora orbs */}
      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none aurora-1"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[110px] pointer-events-none aurora-2"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-2/3 left-1/2 w-[350px] h-[350px] rounded-full blur-[90px] pointer-events-none aurora-3"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Briefcase className="w-7 h-7 text-amber-400" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500">
                EXPERIENCE
              </h2>
            </div>
            <div className="h-px w-24 mx-auto rounded-full bg-gradient-to-r from-amber-400 to-orange-400 mb-5" />
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Industry experience applying software and systems engineering at scale
            </p>
          </motion.div>

          {/* ── Timeline ───────────────────────────────────────────────────── */}
          <div className="relative">

            {/* Full-height connector line */}
            {experiences.length > 1 && (
              <div
                className="absolute left-[7px] sm:left-[7px] top-4 bottom-4 w-px"
                style={{ background: 'linear-gradient(to bottom, rgba(245,158,11,0.5) 0%, rgba(20,184,166,0.5) 100%)' }}
              />
            )}

            <div className="space-y-16">
              {experiences.map((exp, expIndex) => {
                const delay = expIndex * 0.15;
                return (
                  <TimelineEntry
                    key={exp.id}
                    exp={exp}
                    isInView={isInView}
                    delay={delay}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}

// ─── Timeline Entry ────────────────────────────────────────────────────────────

function TimelineEntry({
  exp,
  isInView,
  delay,
}: {
  exp: typeof experiences[0];
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className="flex gap-6 sm:gap-8"
    >
      {/* ── Left: timeline dot ── */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        {/* Node */}
        <div className="relative flex-shrink-0">
          {/* Outer glow pulse */}
          {exp.current && (
            <motion.div
              className="absolute inset-[-4px] rounded-full"
              style={{ background: exp.dotColor, opacity: 0.3 }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <div
            className="w-4 h-4 rounded-full border-2 border-black relative z-10"
            style={{ background: exp.dotColor, boxShadow: `0 0 16px ${exp.dotColor}` }}
          />
        </div>

      </div>

      {/* ── Right: card ── */}
      <div className="flex-1 pb-2">

        {/* Company header */}
        <div
          className={`relative rounded-2xl border ${exp.accentBorder} backdrop-blur-xl p-6 sm:p-7 mb-5 group overflow-hidden`}
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.018) 100%)' }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
            style={{ background: `radial-gradient(ellipse at top left, ${exp.accentGlow} 0%, transparent 60%)` }}
          />

          <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Left */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg ${exp.accentBg} flex items-center justify-center flex-shrink-0`}>
                  <Building2 className={`w-4 h-4 ${exp.accentText}`} />
                </div>
                <span className={`text-sm font-semibold tracking-widest uppercase ${exp.accentText}`}>
                  {exp.company}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                {exp.role}
              </h3>

              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
                  <Calendar className={`w-3 h-3 ${exp.accentText}`} />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
                  <MapPin className={`w-3 h-3 ${exp.accentText}`} />
                  {exp.location}
                </span>
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${exp.accentBg} ${exp.accentText} border ${exp.accentBorder}`}>
                  {exp.type} · {exp.duration}
                </span>
                {exp.current && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Current
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Achievement groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {exp.groups.map((group) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: delay + 0.2 }}
                whileHover={{ scale: 1.015, transition: { duration: 0.18 } }}
                className="relative group rounded-xl border border-white/8 backdrop-blur-xl p-5 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.025)' }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`w-8 h-8 rounded-lg ${group.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${group.iconText}`} />
                  </div>
                  <span className="text-sm font-semibold text-white/90">{group.name}</span>
                </div>
                <ul className="space-y-2.5">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-gray-400 text-xs leading-relaxed">
                      <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${group.bullet}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Stack — code-style tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
          className="flex flex-wrap gap-2 items-center"
        >
          <span className="text-gray-600 font-mono text-xs mr-1 select-none">// stack</span>
          {exp.stack.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.04, y: -1 }}
              className="font-mono text-xs px-2.5 py-1 rounded-md border border-gray-700/80 bg-gray-900/80 text-gray-400 hover:text-gray-200 hover:border-gray-600 transition-colors duration-150 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
}
