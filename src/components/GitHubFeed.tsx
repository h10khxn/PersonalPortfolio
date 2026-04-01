import { useEffect, useState, useRef, type ComponentType } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, GitCommit, GitBranch, GitPullRequest, Star, ExternalLink, RefreshCw, BookOpen } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: {
    commits?: { message: string; sha: string }[];
    ref?: string;
    ref_type?: string;
    head?: string;
    pull_request?: { title: string; merged: boolean; html_url: string };
    action?: string;
  };
}

interface GitHubRepo {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
  description: string | null;
}


interface FeedItem {
  id: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  iconColor: string;
  iconBg: string;
  label: string;
  repo: string;
  repoUrl: string;
  time: string;
  link?: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────────

interface LangStat { lang: string; pct: number; color: string }

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

function computeLangStats(repos: GitHubRepo[]): LangStat[] {
  const counts: Record<string, number> = {};
  for (const r of repos) if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (!total) return [];
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([lang, n]) => ({ lang, pct: Math.round((n / total) * 100), color: LANG_COLORS[lang] ?? '#8b949e' }));
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 2592000)}mo ago`;
}

function parseEvents(events: GitHubEvent[]): FeedItem[] {
  const items: FeedItem[] = [];

  for (const ev of events) {
    if (items.length >= 5) break;
    const repoName = ev.repo.name.replace('h10khxn/', '');
    const repoUrl = `https://github.com/${ev.repo.name}`;

    if (ev.type === 'PushEvent') {
      const branch = (ev.payload.ref ?? '').replace('refs/heads/', '') || 'main';
      const sha = ev.payload.head?.slice(0, 7);
      const msg = ev.payload.commits?.length
        ? ev.payload.commits[0].message.split('\n')[0].slice(0, 72)
        : `Pushed ${sha ? sha : 'commits'} to ${branch}`;
      items.push({
        id: ev.id,
        icon: GitCommit,
        iconColor: 'text-teal-400',
        iconBg: 'bg-teal-500/15',
        label: msg,
        repo: repoName,
        repoUrl,
        time: timeAgo(ev.created_at),
        link: sha ? `https://github.com/${ev.repo.name}/commit/${ev.payload.head}` : repoUrl,
      });
    } else if (ev.type === 'CreateEvent' && ev.payload.ref_type === 'branch') {
      items.push({
        id: ev.id,
        icon: GitBranch,
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/15',
        label: `Created branch "${ev.payload.ref}"`,
        repo: repoName,
        repoUrl,
        time: timeAgo(ev.created_at),
        link: repoUrl,
      });
    } else if (ev.type === 'CreateEvent' && ev.payload.ref_type === 'repository') {
      items.push({
        id: ev.id,
        icon: BookOpen,
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/15',
        label: `Created repository`,
        repo: repoName,
        repoUrl,
        time: timeAgo(ev.created_at),
        link: repoUrl,
      });
    } else if (ev.type === 'PullRequestEvent' && ev.payload.pull_request) {
      const pr = ev.payload.pull_request;
      items.push({
        id: ev.id,
        icon: GitPullRequest,
        iconColor: pr.merged ? 'text-violet-400' : 'text-cyan-400',
        iconBg: pr.merged ? 'bg-violet-500/15' : 'bg-cyan-500/15',
        label: pr.title.slice(0, 72),
        repo: repoName,
        repoUrl,
        time: timeAgo(ev.created_at),
        link: pr.html_url,
      });
    } else if (ev.type === 'WatchEvent') {
      items.push({
        id: ev.id,
        icon: Star,
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/15',
        label: `Starred repository`,
        repo: repoName,
        repoUrl,
        time: timeAgo(ev.created_at),
        link: repoUrl,
      });
    }
  }

  return items;
}

// ─── Skeleton ───────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="w-8 h-8 rounded-lg bg-white/5 animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/5 rounded animate-pulse w-3/4" />
            <div className="h-2.5 bg-white/5 rounded animate-pulse w-1/3" />
          </div>
          <div className="h-2.5 bg-white/5 rounded animate-pulse w-12 flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

function RepoSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-3">
          <div className="h-3.5 bg-white/5 rounded animate-pulse w-2/3" />
          <div className="h-2.5 bg-white/5 rounded animate-pulse w-full" />
          <div className="h-2.5 bg-white/5 rounded animate-pulse w-1/2" />
        </div>
      ))}
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────────

export default function GitHubFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-8% 0px' });

  const [items, setItems] = useState<FeedItem[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [langStats, setLangStats] = useState<LangStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchAll = async () => {
    setLoading(true);
    setError(false);
    try {
      const [evRes, repoRes] = await Promise.all([
        fetch('https://api.github.com/users/h10khxn/events/public?per_page=30'),
        fetch('https://api.github.com/users/h10khxn/repos?sort=pushed&per_page=20'),
      ]);
      if (!evRes.ok || !repoRes.ok) throw new Error();
      const [events, repoData] = await Promise.all([
        evRes.json() as Promise<GitHubEvent[]>,
        repoRes.json() as Promise<GitHubRepo[]>,
      ]);
      setItems(parseEvents(events));
      setRepos(repoData.slice(0, 3));
      setLangStats(computeLangStats(repoData));
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  if (error && !loading) return null;

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #080810 0%, #060610 50%, #080810 100%)' }}
    >
      {/* Top fade */}
      <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

      {/* Aurora orbs */}
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none aurora-2"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none aurora-1"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="w-7 h-7 text-violet-400" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-violet-500">
                ACTIVITY
              </h2>
            </div>
            <div className="h-px w-24 mx-auto rounded-full bg-gradient-to-r from-violet-400 to-indigo-400 mb-5" />
            <p className="text-gray-500 text-base max-w-md mx-auto">
              Live feed from{' '}
              <a
                href="https://github.com/h10khxn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                @h10khxn
              </a>
            </p>
          </motion.div>

          {/* Activity feed card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl border border-violet-500/15 backdrop-blur-xl overflow-hidden mb-6"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)' }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-400 font-mono">live</span>
                {lastUpdated && (
                  <span className="text-xs text-gray-600 font-mono">· {lastUpdated}</span>
                )}
              </div>
              <motion.button
                onClick={fetchAll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors disabled:opacity-40"
              >
                <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                Refresh
              </motion.button>
            </div>

            {/* Events list */}
            <div className="p-4">
              {loading ? (
                <Skeleton />
              ) : items.length === 0 ? (
                <p className="text-center text-gray-600 text-sm py-8">No recent activity found.</p>
              ) : (
                <div className="space-y-1">
                  {items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                        className="group flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-white/8 hover:bg-white/[0.03] transition-all duration-200"
                      >
                        <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={14} className={item.iconColor} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-300 truncate leading-snug">{item.label}</p>
                          <a
                            href={item.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-600 hover:text-violet-400 transition-colors font-mono"
                          >
                            {item.repo}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-600 font-mono">{item.time}</span>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-gray-300"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {!loading && items.length > 0 && (
              <div className="px-5 py-3 border-t border-white/5 flex justify-end">
                <a
                  href="https://github.com/h10khxn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet-400 transition-colors"
                >
                  View full profile <ExternalLink size={11} />
                </a>
              </div>
            )}
          </motion.div>

          {/* Language distribution */}
          {!loading && langStats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <p className="text-xs text-gray-600 font-mono mb-3">// languages</p>
              {/* Segmented bar */}
              <div className="flex h-2.5 rounded-full overflow-hidden gap-px mb-3">
                {langStats.map(({ lang, pct, color }) => (
                  <motion.div
                    key={lang}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ width: `${pct}%`, background: color, transformOrigin: 'left' }}
                    title={`${lang} ${pct}%`}
                    className="h-full"
                  />
                ))}
              </div>
              {/* Labels */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {langStats.map(({ lang, pct, color }) => (
                  <div key={lang} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-xs text-gray-400">{lang}</span>
                    <span className="text-xs text-gray-600 font-mono">{pct}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recently active repos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p className="text-xs text-gray-600 font-mono mb-3">// recently active</p>
            {loading ? (
              <RepoSkeleton />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {repos.map((repo, i) => (
                  <motion.a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                    className="group flex flex-col gap-2.5 p-4 rounded-xl border border-white/6 bg-white/[0.025] hover:border-violet-500/25 hover:bg-white/[0.04] transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium text-gray-200 group-hover:text-violet-300 transition-colors truncate">
                        {repo.name}
                      </span>
                      <ExternalLink size={12} className="text-gray-600 group-hover:text-violet-400 transition-colors flex-shrink-0 mt-0.5" />
                    </div>
                    {repo.description && (
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{repo.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-1">
                      {repo.language ? (
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: LANG_COLORS[repo.language] ?? '#8b949e' }}
                          />
                          <span className="text-xs text-gray-500">{repo.language}</span>
                        </div>
                      ) : <span />}
                      <span className="text-xs text-gray-600 font-mono">{timeAgo(repo.pushed_at)}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}
