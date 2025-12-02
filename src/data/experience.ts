export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export const experience: Experience[] = [
  {
    company: "Dubai Jewellers",
    role: "Senior Software Engineer",
    startDate: "2025-05",
    endDate: "Present",
    achievements: [
      "Lead developer and owner of all core software systems for jewelry inventory, sales, customer, and analytics platforms, driving technical vision and architecture for $5M+/yr SMB",
      "Spearheaded design and implementation of Pure Tracker—a modern, full-stack jewelry inventory management and bookkeeping webapp, leveraging Next.js 16, React 19, PostgreSQL, Drizzle ORM, and Clerk authentication",
      "Modernized legacy business systems—including a critical XP-era inventory app—by orchestrating complex migrations, virtualization (VMware), and rebuilding desktop software as secure, responsive web apps for business continuity",
      "Architected real-time transaction flows, role-based user onboarding, hybrid server/offline caching (IndexedDB, Next.js), and custom analytics dashboards, eliminating manual processes and boosting operational efficiency",
      "Drove performance, reliability, and maintainability by establishing robust DevOps workflows, advanced CI/CD, automated data backup strategies, and mentoring team on best practices in TypeScript, cloud, and testing",
    ],
  },
  {
    company: "Scotiabank",
    role: "Software Engineer",
    startDate: "2024-05",
    endDate: "2025-04",
    achievements: [
      "Developed and maintained software solutions using TypeScript and React.js",
      "Worked on hybrid work model contributing to various banking technology projects",
      "Collaborated with cross-functional teams to deliver high-quality financial technology solutions",
    ],
  },
  {
    company: "Dubai Jewellers",
    role: "Senior Software Engineer",
    startDate: "2023-09",
    endDate: "2024-04",
    achievements: [
      "Developed Shopify Functions extension for Checkout UI to validate user info and check against fraudulent customer database, modifying accepted payment methods dynamically",
      "Built another Shopify extension to change shipping prices based on distance entered by user",
      "Developed Next.js ecommerce solution using Shopify APIs (Storefront API, Admin API) to construct a headless store, driving sales up and improving SEO optimization using RSC & SEO optimizations in Next.js",
      "Solved high chargeback rate issue that caused payment gateways to refuse service by adding extra authentication using Clerk, reCAPTCHA at login, and multi-factor authentication using Google Authenticator at checkout",
      "Developed admin dashboard showing analytics about orders using react-chartjs-2 and AG-grid in Next.js using Shopify Admin API",
      "Built admin login portal for select emails configurable by admins using Firebase Auth and PlanetScale Database with Prisma (MySQL)",
      "Built pipeline in Next.js app allowing customers to login & chat directly with support team, with admin reply functionality and configurable auto-replies in admin dashboard",
    ],
  },
  {
    company: "Resource Software International Ltd. (RSI)",
    role: "Full Stack Cloud Engineer",
    startDate: "2022-05",
    endDate: "2023-08",
    achievements: [
      "Developed enterprise-level microservices applications utilizing React, Node, Next.js, and AWS, driving $2+ million of revenue every year while working on all life cycles of development including identifying system requirements, development, testing and configuring metrics",
      "Spearheaded migration of applications from client-server architecture deployed on AWS to serverless architecture using AWS services like API Gateway, DynamoDB, Lambda, and SAM",
      "Created CloudFormation templates for current deployed architecture using AWS Elastic Beanstalk, S3, SQS, SNS, CloudWatch, AWS Lambda, & Amplify and successfully deployed two environments in two different regions on AWS",
      "Worked on enhancing applications with additional features by developing the full lifecycle of feature changes and driving new customer growth by 14% achieved via end-to-end testing analytics",
      "Created comprehensive set of guidelines and best practices for coding and project structure, fostering better development environment and facilitating adoption of Agile methodology for improved team collaboration",
      "Implemented responsive frontend components using React, elevating user experience to a new level and configuring backend with REST API design using serverless technology like AWS Lambda, API Gateway, and SAM",
    ],
  },
  {
    company: "Bangaree Infotech Solutions",
    role: "Junior Web Developer",
    startDate: "2020-01",
    endDate: "2021-11",
    achievements: [
      "Actively participated in customer meetings to provide valuable insights and ensure successful project implementation",
      "Leveraged React, Node.js, and Flask frameworks to develop robust inventory tracking application for businesses",
      "Demonstrated expertise in creating and managing databases using PostgreSQL, MySQL, and AWS storage solutions such as S3 and DynamoDB, enabling efficient online inventory management for clients",
      "Developed and maintained Python ETL scripts to process raw data, enabling accurate analytics and seamless cloud storage leveraging AWS services",
    ],
  },
];

