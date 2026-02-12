
import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Alex Sterling",
  role: "Senior Full Stack Engineer",
  location: "San Francisco, CA",
  email: "alex@example.com",
  bio: "Passionate architect of digital experiences with 8+ years of expertise in high-performance web applications and AI integration. I build products that bridge the gap between complex data and elegant user interfaces.",
  skills: [
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion", "D3.js"] },
    { category: "Backend", items: ["Node.js", "Go", "PostgreSQL", "Redis", "GraphQL", "Python"] },
    { category: "Cloud/Tools", items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Git"] },
    { category: "AI/ML", items: ["Gemini API", "OpenAI SDK", "LangChain", "Vector Databases"] }
  ],
  projects: [
    {
      id: "1",
      title: "Zenith Dash",
      description: "Real-time analytics dashboard for fintech platforms.",
      longDescription: "A comprehensive analytics suite built with React and D3.js, handling over 1 million data points per second with sub-100ms latency. Integrated with WebSocket streams and optimized for high-density information visualization.",
      tags: ["React", "D3.js", "Node.js", "Redis"],
      image: "https://picsum.photos/800/600?random=1",
      links: { github: "#", live: "#" }
    },
    {
      id: "2",
      title: "Aeon Commerce",
      description: "Next-gen headless e-commerce engine.",
      longDescription: "A headless commerce platform focusing on speed and SEO. Achieved 100/100 Lighthouse scores across the board. Built with Next.js App Router and optimized with edge caching.",
      tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
      image: "https://picsum.photos/800/600?random=2",
      links: { github: "#", live: "#" }
    },
    {
      id: "3",
      title: "Luminal AI",
      description: "AI-powered creative writing assistant.",
      longDescription: "An intelligent text editor that suggests narrative arcs and stylistic improvements using Gemini. Features include real-time sentiment analysis and context-aware character tracking.",
      tags: ["Gemini API", "React", "Python", "Vector DB"],
      image: "https://picsum.photos/800/600?random=3",
      links: { github: "#", live: "#" }
    }
  ],
  experience: [
    {
      company: "TechNova Solutions",
      role: "Lead Frontend Engineer",
      period: "2021 - Present",
      description: "Leading a team of 12 engineers in building next-generation cloud infrastructure management tools. Spearheaded the migration to a micro-frontend architecture."
    },
    {
      company: "DataStream Inc.",
      role: "Senior Full Stack Developer",
      period: "2018 - 2021",
      description: "Developed and maintained real-time data visualization pipelines for fortune 500 clients. Reduced infrastructure costs by 35% through container optimization."
    },
    {
      company: "CloudBound Systems",
      role: "Software Engineer",
      period: "2015 - 2018",
      description: "Worked on core product features using Ruby on Rails and React. Improved page load times by 60% through aggressive caching and asset optimization."
    }
  ]
};
