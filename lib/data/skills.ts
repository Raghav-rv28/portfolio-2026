export interface SkillCategory {
  name: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript", "Node.js", "Python", "Go", "Java", "SQL"],
  },
  {
    name: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "Remix",
      "Express.js",
      "FastAPI",
      "GraphQL",
      "gRPC",
      "Tailwind CSS",
      "shadcn/ui",
      "Shopify App Remix",
      "Shopify Polaris",
    ],
  },
  {
    name: "Databases",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "MySQL",
      "DynamoDB",
      "Elasticsearch",
      "Drizzle ORM",
      "Prisma",
      "IndexedDB",
    ],
  },
  {
    name: "Cloud & Infrastructure",
    items: [
      "AWS (EC2, S3, Lambda, RDS, SQS, CloudFormation)",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD (GitHub Actions, Jenkins)",
      "Nginx",
      "Neon (Serverless PostgreSQL)",
    ],
  },
  {
    name: "Tools & Technologies",
    items: [
      "Git",
      "Linux",
      "WebSocket",
      "Message Queues (RabbitMQ, SQS)",
      "Prometheus",
      "Grafana",
      "Jest",
      "Playwright",
      "Vite",
      "Turbopack",
      "Clerk",
      "Shopify UI Extensions",
    ],
  },
  {
    name: "Architecture & Design",
    items: [
      "Microservices",
      "RESTful APIs",
      "System Design",
      "Distributed Systems",
      "Event-Driven Architecture",
      "Domain-Driven Design",
    ],
  },
];

