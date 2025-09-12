import { Testimonial, Roadmap } from '@/types';

export interface HeroConfig {
  title: {
    main: string;
    highlight: string;
  };
  subtitle: string;
  video: {
    videoId: string;
    title: string;
  };
  cta: {
    text: string;
    subtext: string;
  };
}

export interface InstructorConfig {
  title: string;
  name: string;
  role: string;
  bio: string[];
  credentials: Array<{
    text: string;
    color: string;
  }>;
  avatar?: string;
}

export interface WaitlistConfig {
  title: string;
  subtitle: string;
  form: {
    emailLabel: string;
    emailPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    submitText: string;
    loadingText: string;
  };
  successMessage: {
    title: string;
    description: string;
  };
  disclaimer: string;
}

export interface FooterConfig {
  companyName: string;
  tagline: string;
  socialLinks: Array<{
    name: string;
    href: string;
    icon: string;
  }>;
  copyright: string;
}

export interface SectionConfig {
  hero: {
    title: string;
    backgroundColor: string;
  };
  roadmaps: {
    title: string;
    backgroundColor: string;
  };
  instructor: {
    title: string;
    backgroundColor: string;
  };
  testimonials: {
    title: string;
    backgroundColor: string;
  };
  waitlist: {
    title: string;
    backgroundColor: string;
  };
}

export interface LandingPageConfig {
  hero: HeroConfig;
  roadmaps: {
    title: string;
    subtitle: string;
    data: Roadmap[];
    cta: {
      text: string;
      buttonText: string;
    };
  };
  instructor: InstructorConfig;
  testimonials: {
    title: string;
    subtitle: string;
    data: Testimonial[];
  };
  waitlist: WaitlistConfig;
  footer: FooterConfig;
  sections: SectionConfig;
}

// Landing Page Configuration - Single Source of Truth
export const landingPageConfig: LandingPageConfig = {
  hero: {
    title: {
      main: "Master Code, Design, AI & Leadership —",
      highlight: "Become the CTO of Tomorrow"
    },
    subtitle: "Join the next generation of technical leaders with comprehensive courses designed to build well-rounded CTOs who excel in every aspect of technology leadership.",
    video: {
      videoId: "hw2nv3jIgZs",
      title: "Biggest DSA in Java Course"
    },
    cta: {
      text: "Join the Waitlist",
      subtext: "Be the first to know when courses launch"
    }
  },
  roadmaps: {
    title: "Learning Roadmaps",
    subtitle: "Structured learning paths designed to take you from beginner to expert in the most in-demand skills for modern CTOs",
    data: [
      {
        id: "ai-ml",
        title: "AI/ML",
        description: "Master artificial intelligence and machine learning from fundamentals to advanced applications",
        color: "from-blue-500 to-purple-600",
        steps: [
          { id: "python", title: "Python" },
          { id: "math", title: "Math" },
          { id: "classical-ml", title: "Classical ML" },
          { id: "deep-learning", title: "Deep Learning" },
          { id: "cv-nlp", title: "CV & NLP" },
          { id: "transformers", title: "Transformers" },
          { id: "genai-llms", title: "GenAI & LLMs" },
          { id: "agents", title: "Agents" },
          { id: "mlops", title: "MLOps" }
        ],
      },
      {
        id: "design",
        title: "Design",
        description: "Learn comprehensive design skills from prototyping to advanced visual effects",
        color: "from-pink-500 to-orange-500",
        steps: [
          { id: "figma", title: "Figma" },
          { id: "protopie", title: "ProtoPie/Principle" },
          { id: "after-effects", title: "After Effects/Lottie" },
          { id: "premiere", title: "Premiere Pro/Resolve" },
          { id: "blender", title: "Blender/Photoshop/Illustrator" },
          { id: "runway", title: "Runway/Descript/MidJourney" },
        ],
      },
      {

        id: "coding",

        title: "Coding",

        description: "Comprehensive coding roadmap from zero to hero",

        color: "from-green-500 to-teal-600",

        externalLink: "https://github.com/team-codebug/leetcode/blob/main/ZERO2HERO%20(1).pdf",

        steps: [

          { id: "figma", title: "Figma" },

          { id: "github", title: "GitHub" },

          { id: "resume-writing", title: "Resume Writing" },

          { id: "linkedin-optimization", title: "LinkedIn Optimization" },

          { id: "computer-fundamentals", title: "Computer Fundamentals" },

          { id: "programming-language", title: "Programming Language (Java / JavaScript / Python)" },

          { id: "data-structures-algorithms", title: "Data Structures & Algorithms" },

          { id: "oop", title: "Object-Oriented Programming" },

          { id: "java-generics", title: "Java Generics" },

          { id: "multithreading", title: "Multithreading" },

          { id: "operating-systems", title: "Operating Systems" },

          { id: "networking", title: "Networking" },

          { id: "dbms", title: "DBMS" },

          { id: "postgresql", title: "PostgreSQL" },

          { id: "mongodb", title: "MongoDB" },

          { id: "linux", title: "Linux" },

          { id: "bash-scripting", title: "Bash Scripting" },

          { id: "html", title: "HTML" },

          { id: "css", title: "CSS" },

          { id: "tailwindcss", title: "TailwindCSS" },

          { id: "react", title: "React" },

          { id: "nextjs", title: "Next.js" },

          { id: "nodejs", title: "Node.js" },

          { id: "nestjs", title: "NestJS" },

          { id: "monorepo-management", title: "Monorepo Management (Turborepo / Nx)" },

          { id: "low-level-design", title: "Low-Level Design" },

          { id: "design-patterns", title: "Design Patterns" },

          { id: "uml-interface-design", title: "UML & Interface Design" },

          { id: "distributed-systems", title: "Distributed Systems" },

          { id: "system-design-projects", title: "System Design Projects" },

          { id: "ai-projects", title: "AI Projects" },

          { id: "prompt-engineering", title: "Prompt Engineering" },

          { id: "ai-apis", title: "AI APIs" },

          { id: "docker", title: "Docker" },

          { id: "kubernetes", title: "Kubernetes" },

          { id: "cloud-deployment", title: "Cloud Deployment (AWS / Vercel / Render)" },

          { id: "project-demo-videos", title: "Project Demo Videos" },

          { id: "community-engagement", title: "Community Engagement" },

          { id: "portfolio-building", title: "Portfolio Building (Notion / Devfolio)" },

          { id: "internship-referral-applications", title: "Internship & Referral Applications" },

        ],

      },

      {

        id: "pm",

        title: "PM",

        description: "Master product management skills with technical depth",

        color: "from-purple-500 to-pink-600",

        steps: [

          { id: "tpm", title: "TPM" },

          { id: "ai-for-pm", title: "AI for PM" },

        ],

      },

    ],
    cta: {
      text: "Ready to start your journey? Join our waitlist to get early access to these comprehensive learning paths.",
      buttonText: "Join the Waitlist"
    }
  },
  instructor: {
    title: "Meet Your Instructor",
    name: "Anuj Kumar",
    role: "Tech Leader & Educator | Ex-Adobe, Intuit | Ex-CTO Monet | Instructor @NewtonSchool | NITK",
    avatar: "/images/anuj-kumar-profile-image.jpeg",
    bio: [
      "From starting with basic programming concepts to leading engineering teams at top-tier companies like Adobe and Intuit, my journey has been driven by one core belief: great technology leaders are built through practical, hands-on learning combined with real-world industry experience.",
      "Over the past 9+ years, I've helped build scalable systems serving millions of users, led cross-functional teams, and mentored 1000+ engineers in their career growth. My expertise spans full-stack development, AI/ML implementation, system design, and most importantly - translating technical complexity into business impact.",
      "I founded NextGen-CTO because I realized that most technical education focuses on individual skills in isolation. Modern CTOs need to master the intersection of code, design, AI, and leadership. Through this platform, I'm committed to building the next generation of technical leaders who can drive innovation at scale."
    ],
    credentials: [
      { text: "Ex-Adobe & Intuit", color: "bg-blue-100 text-blue-800" },
      { text: "7000+ Engineers Mentored", color: "bg-green-100 text-green-800" },
      { text: "9+ Years in Tech Leadership", color: "bg-purple-100 text-purple-800" }
    ]
  },
  testimonials: {
    title: "What Our Students Say",
    subtitle: "Join thousands of professionals who have transformed their careers with NextGen-CTO",
    data: [
      {
        id: '1',
        name: 'Sarah Chen',
        role: 'Senior Software Engineer',
        company: 'Google',
        feedback: 'The NextGen-CTO program transformed my understanding of leadership in tech. The AI/ML roadmap was particularly comprehensive and helped me transition from a developer to a technical leader.',
        avatar: '/api/placeholder/64/64',
        rating: 5,
      },
      {
        id: '2',
        name: 'Marcus Rodriguez',
        role: 'Product Manager',
        company: 'Microsoft',
        feedback: 'Incredible depth of content across all domains. The design roadmap opened up new perspectives on user experience that I never considered as a PM. Highly recommend!',
        avatar: '/api/placeholder/64/64',
        rating: 5,
      },
      {
        id: '3',
        name: 'Priya Patel',
        role: 'Tech Lead',
        company: 'Stripe',
        feedback: 'The coding roadmap PDF was a game-changer. It provided a clear path from basics to advanced concepts. The structured approach helped me mentor my team more effectively.',
        avatar: '/api/placeholder/64/64',
        rating: 5,
      },
      {
        id: '4',
        name: 'David Kim',
        role: 'Engineering Manager',
        company: 'Airbnb',
        feedback: 'What sets this program apart is the holistic approach. Learning code, design, AI, and leadership together gave me the complete toolkit I needed to become a well-rounded CTO.',
        avatar: '/api/placeholder/64/64',
        rating: 5,
      },
    ]
  },
  waitlist: {
    title: "Join Waitlist Now",
    subtitle: "Be the first to know when our comprehensive CTO courses launch. Get exclusive early access and special pricing.",
    form: {
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      nameLabel: "Name (Optional)",
      namePlaceholder: "Your name",
      submitText: "Join the Waitlist",
      loadingText: "Joining Waitlist..."
    },
    successMessage: {
      title: "You're In!",
      description: "Thanks for joining! We'll notify you when courses are available."
    },
    disclaimer: "No spam, ever. Unsubscribe at any time."
  },
  footer: {
    companyName: "NextGen-CTO",
    tagline: "Master Code, Design, AI & Leadership",
    socialLinks: [
      {
        name: 'Twitter',
        href: 'https://twitter.com/nextgencto',
        icon: 'twitter'
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/nextgencto',
        icon: 'linkedin'
      },
      {
        name: 'GitHub',
        href: 'https://github.com/nextgencto',
        icon: 'github'
      },
      {
        name: 'YouTube',
        href: 'https://www.youtube.com/@CodingwithCTOBhaiya',
        icon: 'youtube'
      }
    ],
    copyright: "All rights reserved."
  },
  sections: {
    hero: {
      title: "Hero",
      backgroundColor: "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900"
    },
    roadmaps: {
      title: "Roadmaps",
      backgroundColor: "bg-gray-800/50"
    },
    instructor: {
      title: "Instructor",
      backgroundColor: "bg-gray-900"
    },
    testimonials: {
      title: "Testimonials",
      backgroundColor: "bg-gray-800/30"
    },
    waitlist: {
      title: "Waitlist",
      backgroundColor: "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
    }
  }
};