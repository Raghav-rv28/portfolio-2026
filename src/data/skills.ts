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
      "Express.js",
      "NestJS",
      "FastAPI",
      "GraphQL",
      "gRPC",
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

