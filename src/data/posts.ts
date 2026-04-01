export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string };

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readTime: number;
  content: ContentBlock[];
}

export const posts: Post[] = [
  {
    slug: 'building-cicd-pipeline',
    title: 'Building a Jenkins CI/CD Pipeline from Scratch',
    date: '2025-04-15',
    tags: ['DevOps', 'Jenkins', 'Docker', 'Kubernetes'],
    excerpt:
      'How I designed and shipped a full CI/CD pipeline for a Node.js backend service during my contract at Wouessi Digital. Zero to automated deployments.',
    readTime: 5,
    content: [
      {
        type: 'p',
        text: 'When I joined Wouessi Digital as a contract Software Engineer, one of my first tasks was setting up a CI/CD pipeline for a Node.js backend that processed federal IT procurement contracts. There was no pipeline. Deployments were manual, tests were run locally, and Docker images were built by hand. This is how I fixed that.',
      },
      {
        type: 'h2',
        text: 'The Stack',
      },
      {
        type: 'ul',
        items: [
          'Jenkins for orchestration',
          'Docker for containerization',
          'Kubernetes for deployment',
          'Node.js / TypeScript backend',
          'ESLint + Jest for linting and tests',
        ],
      },
      {
        type: 'h2',
        text: 'Designing the Pipeline',
      },
      {
        type: 'p',
        text: 'The goal was simple: any push to the main branch should automatically install dependencies, lint, run unit tests, build a Docker image, and deploy to the Kubernetes cluster. If any stage fails, the pipeline stops and the deployment never happens.',
      },
      {
        type: 'code',
        lang: 'groovy',
        code: `pipeline {
  agent any
  stages {
    stage('Install') {
      steps { sh 'npm ci' }
    }
    stage('Lint') {
      steps { sh 'npm run lint' }
    }
    stage('Test') {
      steps { sh 'npm test' }
    }
    stage('Build Image') {
      steps {
        sh 'docker build -t procurement-api:$BUILD_NUMBER .'
      }
    }
    stage('Deploy') {
      steps {
        sh 'kubectl set image deployment/procurement-api api=procurement-api:$BUILD_NUMBER'
      }
    }
  }
}`,
      },
      {
        type: 'h2',
        text: 'What I Learned',
      },
      {
        type: 'p',
        text: 'The biggest challenge was keeping the Docker image lean. The first build came in at 1.2GB. After switching to a multi-stage build and using node:20-alpine as the final base, it dropped to 180MB. That alone cut deploy time by more than half.',
      },
      {
        type: 'quote',
        text: 'Automation is not a nice-to-have. A 10-minute manual deploy done 20 times a week is 3+ hours of lost engineering time every month.',
      },
      {
        type: 'p',
        text: 'The other lesson: fail fast. Putting the lint stage before tests and the build stage last means you catch the cheap errors (style violations) before running the expensive ones (full test suite + Docker build). Small ordering decisions compound.',
      },
    ],
  },
  {
    slug: 'typescript-contract-parser',
    title: 'Parsing 7,000 Federal Contracts with TypeScript',
    date: '2025-04-28',
    tags: ['TypeScript', 'Node.js', 'Data Engineering'],
    excerpt:
      'The architecture decisions behind a backend service that extracted, normalized, and exposed 7,000+ federal IT procurement contracts for competitive benchmarking.',
    readTime: 4,
    content: [
      {
        type: 'p',
        text: 'Federal procurement data is publicly available but messy. Inconsistent field names, missing values, varying date formats, acronym-heavy descriptions. Building a backend to make this data useful required a few key design decisions upfront.',
      },
      {
        type: 'h2',
        text: 'The Problem',
      },
      {
        type: 'p',
        text: 'The raw dataset contained 7,000+ IT contract records from the Government of Canada\'s open data portal. The client needed to benchmark their bids against historical contract values and identify which vendors were winning which categories of work.',
      },
      {
        type: 'h2',
        text: 'Normalization Strategy',
      },
      {
        type: 'p',
        text: 'Every record went through a three-stage pipeline: extract, normalize, validate. The normalize step handled the bulk of the complexity. It mapped 40+ inconsistent field names down to a clean schema, parsed dates across 6 different formats, and bucketed vendor names that appeared under multiple spellings.',
      },
      {
        type: 'code',
        lang: 'typescript',
        code: `interface Contract {
  id: string;
  vendor: string;
  value: number;
  category: ContractCategory;
  awardDate: Date;
  ministry: string;
}

function normalize(raw: RawRecord): Contract | null {
  const value = parseFloat(raw.contract_value ?? raw.value ?? '0');
  if (!value || value <= 0) return null;

  return {
    id: raw.reference_number,
    vendor: normalizeVendorName(raw.vendor_name),
    value,
    category: classifyCategory(raw.description),
    awardDate: parseFlexibleDate(raw.award_date),
    ministry: raw.department ?? raw.ministry ?? 'Unknown',
  };
}`,
      },
      {
        type: 'h2',
        text: 'Exposing the Data',
      },
      {
        type: 'p',
        text: 'REST endpoints let the dashboard team query contracts by ministry, vendor, date range, or category without touching the raw files. Filtering happened at the API layer, not the client. That kept payloads small and queries fast.',
      },
      {
        type: 'quote',
        text: 'Good data pipelines are boring by design. The goal is predictable output, not clever code.',
      },
    ],
  },
  {
    slug: 'real-time-telemetry-reliability',
    title: 'Reliability Patterns in Real-Time Telemetry Pipelines',
    date: '2026-01-20',
    tags: ['Research', 'Distributed Systems', 'Real-Time Systems'],
    excerpt:
      'An ongoing look at the patterns that make real-time telemetry pipelines reliable in practice. Signal propagation guarantees, cross-layer failure diagnosis, and idempotent state reporting.',
    readTime: 6,
    content: [
      {
        type: 'p',
        text: 'Real-time telemetry pipelines have a deceptively simple job: move data from sensors to consumers quickly and correctly. In practice, "correctly" is the hard part. This post documents patterns I\'ve been studying and applying while working on monitoring infrastructure at Hydro One.',
      },
      {
        type: 'h2',
        text: 'The Core Problem: Distributed Agreement',
      },
      {
        type: 'p',
        text: 'A telemetry pipeline is a distributed system in miniature. Field devices produce state. A pipeline transports and transforms it. A backend stores and surfaces it. At any moment, these three layers can hold different views of reality. The reliability problem is fundamentally about minimizing the window in which they disagree, and detecting it when they do.',
      },
      {
        type: 'h2',
        text: 'Pattern 1: Structured Input Simulation',
      },
      {
        type: 'p',
        text: 'The most effective validation technique I\'ve used is injecting structured input events at the source and verifying their exact representation at every downstream layer. This is different from unit testing the pipeline logic. It tests the live system end-to-end, including serialization, network transport, and backend ingestion.',
      },
      {
        type: 'code',
        lang: 'python',
        code: `def simulate_alarm_event(device_id: str, point: str, state: bool):
    """
    Inject a synthetic alarm state change and verify
    propagation through the full pipeline.
    """
    payload = {
        "device": device_id,
        "point": point,
        "value": int(state),
        "timestamp": time.time_ns(),
    }
    publish(payload)

    # Poll backend until state propagates or timeout
    deadline = time.monotonic() + MAX_PROPAGATION_SECONDS
    while time.monotonic() < deadline:
        backend_state = query_backend(device_id, point)
        if backend_state == state:
            return True
        time.sleep(POLL_INTERVAL)

    raise PropagationTimeoutError(device_id, point)`,
      },
      {
        type: 'h2',
        text: 'Pattern 2: Cross-Layer Failure Tracing',
      },
      {
        type: 'p',
        text: 'When a telemetry discrepancy is detected, the failure can be in any layer. A systematic trace works from the source outward: verify the device reported the expected value, then verify the pipeline transported it unchanged, then verify the backend ingested and stored it correctly. Skipping layers wastes time and misses intermittent faults.',
      },
      {
        type: 'ul',
        items: [
          'Layer 1 (Device): Did the firmware generate the correct output for the given input?',
          'Layer 2 (Transport): Was the message delivered without corruption or loss?',
          'Layer 3 (Backend): Was the value ingested, parsed, and stored with the correct semantics?',
        ],
      },
      {
        type: 'h2',
        text: 'Pattern 3: Idempotent State Reporting',
      },
      {
        type: 'p',
        text: 'Field devices in unreliable network environments will retransmit. Pipelines that are not idempotent will duplicate state changes, producing phantom alarm events in dashboards. The fix is to key every ingest operation on a deterministic event ID derived from device ID, point, timestamp, and value. Duplicate deliveries get silently deduplicated at the backend.',
      },
      {
        type: 'quote',
        text: 'Reliability is not the absence of failure. It is the containment of failure to a known, recoverable scope.',
      },
      {
        type: 'p',
        text: 'This is still a work in progress. I\'m continuing to document patterns as I encounter and validate them. The goal is a set of testable, language-agnostic patterns for anyone building telemetry infrastructure where correctness is non-negotiable.',
      },
    ],
  },
];
