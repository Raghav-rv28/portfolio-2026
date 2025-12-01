export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export const experience: Experience[] = [
  {
    company: "TechCorp Inc.",
    role: "Senior Software Engineer",
    startDate: "2022-01",
    endDate: "Present",
    achievements: [
      "Led architecture redesign of core API, reducing latency by 40% and improving scalability to handle 10x traffic",
      "Built distributed task queue system processing 10M+ tasks/day with 99.9% reliability",
      "Mentored team of 5 engineers and established coding standards and best practices",
      "Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes",
      "Designed and implemented microservices architecture, reducing system complexity and improving maintainability",
    ],
  },
  {
    company: "StartupXYZ",
    role: "Full-Stack Engineer",
    startDate: "2020-06",
    endDate: "2021-12",
    achievements: [
      "Developed real-time collaboration platform supporting 100+ concurrent users per document",
      "Built RESTful APIs serving 1M+ requests/day with sub-100ms response times",
      "Optimized database queries reducing page load time by 60%",
      "Implemented automated testing increasing code coverage from 40% to 85%",
      "Collaborated with product team to ship features 30% faster using agile methodologies",
    ],
  },
  {
    company: "BigTech Solutions",
    role: "Software Engineer",
    startDate: "2018-07",
    endDate: "2020-05",
    achievements: [
      "Developed and maintained multiple microservices handling critical business logic",
      "Built internal tooling reducing manual processes by 50%",
      "Participated in on-call rotation maintaining 99.95% uptime for production systems",
      "Contributed to open-source projects with 500+ GitHub stars",
      "Improved application performance by 35% through code optimization and caching strategies",
    ],
  },
];

