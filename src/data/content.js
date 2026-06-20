// =============================================================
//  EDIT EVERYTHING HERE
//  This is the single source of truth for all portfolio content.
//  Replace the placeholder values below with your real info.
// =============================================================

export const profile = {
  name: "Abhit Kumar",
  firstName: "Abhit",
  // Rotating job titles animated in the hero.
  roles: [
    "Front-End Developer",
    "Backend Engineer",
    "Software Engineer",
    "DevOps Engineer",
  ],
  tagline: "I build bold, fast, and delightful web experiences.",
  location: "Delhi, India",
  email: "krabhit910@gmail.com",
  // Used by the resume download button -> place your file at public/resume.pdf
  resumeUrl:
    "https://drive.google.com/file/d/1pjMgjfK5OMbRSUtlf7vDxpDpS3mO1FdG/view?usp=drive_link",
  // Short intro shown in the hero, can include a couple of sentences.
  intro:
    "Developer who turns ambitious ideas into polished products. I care about clean architecture, buttery interactions, and shipping things people love to use.",
  // Quick stats shown in the hero / about
  stats: [
    { label: "Experience", value: "6 months" },
    { label: "Projects shipped", value: "10+" },
  ],
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const about = {
  heading: "About me",
  paragraphs: [
    "I'm a software developer who enjoys building reliable, end-to-end products — from clean user interfaces to the APIs, databases, and automation that keep them running.",
    "My toolkit spans C++, Python, and JavaScript/TypeScript with React and Node on top. I care about clean architecture, solid data design, and the small details that make software feel fast and dependable.",
    "Whether it's building responsive front-ends, designing RESTful back-end services and databases, or automating delivery with CI/CD pipelines, I like owning a feature end-to-end — from first commit to production.",
  ],
  highlights: [
    "Pixel-perfect, accessible interfaces",
    "Scalable, well-tested back-ends",
    "Design systems & component libraries",
    "Performance & Core Web Vitals",
  ],
};

export const education = [
  {
    degree: "B.Tech in Information Technology",
    school: "Delhi Technological University",
    period: "2022 — 2026",
    grade: "CGPA: 8.034 / 10",
    description:
      "Specialized in software engineering and web technologies. Built several full-stack projects and explored DSA, DBMS, and systems.",
    tags: ["DSA", "DBMS", "Web Dev", "OOP"],
  },
  {
    degree: "Senior Secondary (Class XII)",
    school: "S B Mills Senior Secondary School",
    period: "2020 — 2021",
    grade: "Percentage: 94%",
    description:
      "Science stream (PCM) with Computer Science. Built my first websites and discovered a love for programming.",
    tags: ["Physics", "Maths", "Computer Science"],
  },
  {
    degree: "Secondary School (Class X)",
    school: "S B Mills Senior Secondary School",
    period: "2018 — 2019",
    grade: "Percentage: 89.8%",
    description:
      "Built a strong foundation in maths and science, and wrote my very first lines of code in the school computer lab.",
    tags: ["Maths", "Science", "Computer"],
  },
];

// Skill groups -> rendered as a grid. The flat list is used for the marquee.
export const skillGroups = [
  {
    title: "Languages",
    items: ["C++", "Python", "JavaScript"],
  },
  {
    title: "Frontend",
    items: [
      "React",
      "HTML5",
      "CSS3",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "Redux",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "RESTful API",
      "JWT",
      "PostgreSQL",
      "MongoDB",
      "SQL",
      "DBMS",
      "Cloudinary",
      "ImageKit",
    ],
  },
  {
    title: "DevOps & Tools",
    items: [
      "Docker",
      "Vercel",
      "Git",
      "GitHub",
      "CI/CD",
      "Jenkins",
      "Automations",
    ],
  },
  {
    title: "System Design",
    items: ["HLD", "LLD"],
  },
];

export const projects = [
  {
    title: "FastBlog — AI-Powered Blogging",
    description:
      "An AI-powered blogging platform that offers personalized content recommendations and a sleek user interface. Writers can draft, refine, and publish posts faster with smart AI assistance built right in.",
    tags: ["React", "Node.js", "MongoDB", "AI"],
    accent: "violet",
    featured: true,
    links: { live: "https://fast-blog-gray.vercel.app/", code: "https://github.com/Abhitkumar89/FastBlog" },
  },
  {
    title: "Study-Notion",
    description:
      "A full-featured EdTech platform for online courses, including authentication, payments, and an interactive dashboard for students and instructors.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    accent: "pink",
    featured: false,
    links: { live: "https://study-notion-frontend-sigma-five.vercel.app/", code: "https://github.com/Abhitkumar89/Study-Notion" },
  },
  {
    title: "MoveOn — The Ride Sharing",
    description:
      "A full-stack ride-sharing app like Uber with live tracking, real-time updates, JWT auth, and smooth animations.",
    tags: ["React", "Node.js", "Socket.IO", "JWT"],
    accent: "cyan",
    featured: false,
    links: { live: "", code: "https://github.com/Abhitkumar89/MoveOn" },
  },
  {
    title: "Password Generator",
    description:
      "A responsive password generator with custom length, special characters, and one-click copy-paste. Built for quick, secure password creation right in the browser.",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    accent: "amber",
    featured: false,
    links: { live: "", code: "https://github.com/Abhitkumar89/PassWordGenerator" },
  },
  {
    title: "AI-Based Rheumatoid Arthritis Detection",
    description:
      "A medical imaging system using a hybrid CNN-LSTM (VGG16) model to classify RA severity into 5 diagnostic stages with 91.8% accuracy. Deployed as a Flask app with OpenCV preprocessing.",
    tags: ["Python", "TensorFlow", "Flask", "OpenCV", "VGG16", "LSTM"],
    accent: "lime",
    featured: false,
    links: { live: "", code: "https://github.com/Abhitkumar89" },
  },
  {
    title: "Snake Game",
    description:
      "A classic, responsive Snake game built in the browser with keyboard controls, score tracking, and smooth animations.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    accent: "cyan",
    featured: false,
    links: { live: "", code: "https://github.com/Abhitkumar89/SnakeGame" },
  },
];

export const experience = [
  {
    role: "Software Development Intern",
    company: "Amdocs",
    period: "Jan — June 2026",
    description: "Gurgaon, India",
    points: [
      "Built an end-to-end hotfix packaging automation from scratch — Designed and implemented a Jenkins (Groovy) pipeline in Python that automates building customer-ready patch releases: pulls code changes from version control, locates the matching build artifacts, and assembles, validates, and packages them into a deployable archive — replacing a manual 2-3 hour process with a one-click build.",
      "Integrated live enterprise data sources with production-grade safeguards — Connected the pipeline to live Perforce and four read-only SMB/CIFS network shares on a shared Linux agent, using openpyxl to parse release tracking Excel data, secure credential-file login, try/finally guaranteed unmounts to avoid stale mounts, and config driven paths — then tested and fixed real edge cases against actual release data.",
      "Eliminated manual CI status tracking by building an automated pipeline-monitoring and reporting system across 2- Jenkins pipelines that validates build states (Success/Failed/Unstable) and parses test logs via REST APIs, delivering real-time build status, live ETA for in-progress jobs, and scheduled daily reports to Microsoft Teams and Outlook."
    ],
    tags: [
      "Jenkins",
      "Python",
      "Groovy",
      "CI/CD",
      "Perforce",
      "Linux",
      "REST API",
      "Automation"
    ]
  }
];

export const socials = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "Email", href: "mailto:krabhit910@gmail.com", icon: "mail" },
];

// EmailJS configuration — sign up at https://www.emailjs.com and paste your
// values here to make the contact form actually send emails.
// Leave the placeholders to run the form in "demo" mode (shows success without sending).
export const emailjsConfig = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
};
