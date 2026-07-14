
export const profile = {
  name: "Krishnansh Puri",
  firstName: "Krishnansh",
  lastName: "Puri",
  role: "Software Developer",
  tagline: "Full-stack engineer & competitive programmer building fast, intelligent web systems.",
  location: "Jalandhar, India",
  email: "krishnanshpuri@gmail.com",
  phone: "+91 95306 77487",
  resumeUrl: "https://customer-assets.emergentagent.com/job_creative-portfolio-1521/artifacts/mnsgryza_resume_A1.pdf",
  socials: [
    { label: "GitHub", handle: "github.com/krishnanshpuri", url: "https://github.com/", icon: "github" },
    { label: "LinkedIn", handle: "linkedin.com/in/krishnanshpuri", url: "https://linkedin.com/", icon: "linkedin" },
    { label: "LeetCode", handle: "Knight · 1858", url: "https://leetcode.com/", icon: "code" },
    { label: "Codeforces", handle: "Expert · 1642", url: "https://codeforces.com/", icon: "terminal" },
  ],
};

export const stats = [
  { label: "CGPA", value: "9.63", suffix: "/10" },
  { label: "LeetCode", value: "1858", suffix: "Knight" },
  { label: "Codeforces", value: "1642", suffix: "Expert" },
  { label: "Problems Solved", value: "800", suffix: "+" },
];

export const about = {
  bio: [
    "I'm a Computer Science undergrad at NIT Jalandhar who loves turning hard problems into clean, performant software.",
    "From training Deep Q-Learning agents to shipping full-stack SEO platforms, I build across the stack — and compete on LeetCode & Codeforces to keep my algorithms sharp.",
  ],
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Dr. B. R. Ambedkar National Institute of Technology, Jalandhar",
    period: "2024 — 2028",
    cgpa: "9.63 / 10",
  },
  terminalLines: [
    "$ whoami",
    "krishnansh_puri --role software-developer",
    "$ cat education.json",
    '{ "degree": "B.Tech CSE", "college": "NIT Jalandhar", "cgpa": "9.63/10" }',
    "$ ./run --status",
    "> Rank 1 in CS department. Available for internships.",
  ],
};

export const skillGroups = [
  {
    title: "Languages",
    icon: "code-2",
    items: ["C++", "Python", "C", "TypeScript", "JavaScript", "HTML / CSS", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    icon: "layers",
    items: ["React.js", "Express.js", "Node.js", "PyTorch", "Tailwind CSS"],
  },
  {
    title: "Databases & Tools",
    icon: "database",
    items: ["MongoDB", "Mongoose", "Git", "GitHub", "VS Code", "Vercel"],
  },
];

export const marqueeStack = [
  "C++", "Python", "TypeScript", "JavaScript", "React.js", "Node.js", "Express.js",
  "PyTorch", "MongoDB", "Mongoose", "Tailwind CSS", "Git", "SQL", "Vercel", "C",
];

export const projects = [
  {
    name: "RankPilot",
    subtitle: "AI SEO Rank Tracker",
    featured: true,
    description:
      "Full-stack SEO platform with a scalable Express.js + TypeScript backend, MongoDB/Mongoose and JWT auth. Automated daily keyword tracking and AI-driven analysis via 3 REST pipelines using SERP API, Google Gemini API and BrowserBase — deployed as Vercel serverless functions with node-cron.",
    tech: ["Express.js", "TypeScript", "MongoDB", "React", "Gemini API", "Vercel"],
    video: "/videos/seo-demo.mp4",
    links: { demo: "https://seo-rank-tracker-six.vercel.app/", github: "https://github.com/KrishnanshPuri/SEO_Rank_Tracker" },
  },
  {
    name: "Autonomous Snake AI",
    subtitle: "Deep Q-Learning Agent",
    featured: false,
    description:
      "A self-learning agent that masters Snake with zero human input. Trained a DQN feed-forward net (11→256→3) in PyTorch, reaching a stable 21.498 mean score over 500+ games using Bellman optimization and multiplicative ε-decay.",
    tech: ["Python", "PyTorch", "Deep Q-Learning"],
    links: { demo: "", github: "https://github.com/KrishnanshPuri/snake_ai_game" },
  },
  {
    name: "Graph Algorithm Simulator",
    subtitle: "Interactive Visualizer",
    featured: false,
    description:
      "Zero-lag, real-time visualization of Dijkstra's, Bellman-Ford and Floyd-Warshall rendering 50+ nodes simultaneously. Built a polished, responsive React tool with custom color themes and resizable panels.",
    tech: ["React.js", "Algorithms", "Data Viz"],
    links: { demo: "https://path-finder-lake-phi.vercel.app/", github: "https://github.com/KrishnanshPuri/Path_finder" },
  },
];

export const experience = [
  {
    org: "Hackmol 6.0",
    role: "Software Developer",
    date: "April 2025",
    badge: "Top 10 / 200+ Teams",
    points: [
      "Reduced average stray-animal reporting time by 30% with a live, mobile-friendly tracking interface in React.js & Tailwind CSS.",
      "Shipped 5+ core features on schedule by driving Git-based peer code reviews across a 4-member team.",
    ],
  },
  {
    org: "Level Supermind 2025",
    role: "Software Developer",
    date: "Jan 2025",
    badge: "National Finalist",
    points: [
      "Cut user data-interpretation time by 15% with a responsive, CSS-animated dashboard visualizing real-time social media metrics.",
    ],
  },
  {
    org: "CyberNauts, NIT Jalandhar",
    role: "Core Team Member",
    date: "Oct 2024 — Present",
    badge: "Community",
    points: [
      "Attained a 95% positive feedback rate by coordinating cross-functional logistics and marketing for 200+ students.",
    ],
  },
];

export const achievements = [
  "Rank 1 in the CS department & across the institute for academic excellence at NIT Jalandhar.",
  "Semifinalist at Flipkart GRID 7.0 — outcompeting 5000+ teams nationwide.",
  "LeetCode Knight (1858, 800+ problems) & Codeforces Expert (1642).",
];