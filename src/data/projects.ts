export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  content: string;
}

export const projects: Project[] = [
  {
    id: "distributed-task-queue",
    name: "Distributed Task Queue System",
    description: "High-performance distributed task queue built with Node.js and Redis, handling 10M+ tasks/day",
    techStack: ["Node.js", "TypeScript", "Redis", "Docker", "AWS SQS", "PostgreSQL"],
    githubUrl: "https://github.com/alexchen/task-queue",
    liveUrl: "https://taskqueue.example.com",
    content: `# Distributed Task Queue System

A production-ready distributed task queue system designed for high-throughput workloads.

## Features
- Horizontal scaling with worker pools
- Priority queues and delayed jobs
- Automatic retries with exponential backoff
- Real-time monitoring dashboard
- Rate limiting and job deduplication

## Architecture
Built on Redis for job storage and coordination, with PostgreSQL for persistent
logging and analytics. Workers can be scaled independently based on queue depth.

## Performance
- Handles 10M+ tasks per day
- Sub-100ms job processing latency
- 99.9% uptime SLA
- Supports job priorities and scheduling

## Tech Stack
- Node.js & TypeScript
- Redis Cluster
- PostgreSQL
- Docker & Kubernetes
- AWS SQS (fallback)

GitHub: https://github.com/alexchen/task-queue
Live Demo: https://taskqueue.example.com`,
  },
  {
    id: "real-time-collaboration",
    name: "Real-Time Collaboration Platform",
    description: "WebSocket-based collaborative editor with conflict resolution and presence awareness",
    techStack: ["React", "Node.js", "WebSocket", "MongoDB", "AWS", "Docker"],
    githubUrl: "https://github.com/alexchen/collab-editor",
    liveUrl: "https://collab.example.com",
    content: `# Real-Time Collaboration Platform

A real-time collaborative editing platform with operational transformation for
conflict-free concurrent editing.

## Features
- Real-time collaborative editing
- Operational transformation for conflict resolution
- Presence awareness (see who's typing)
- Version history and rollback
- WebSocket-based architecture

## Technical Highlights
- Custom OT algorithm implementation
- Efficient diff and patch operations
- WebSocket connection pooling
- MongoDB for document persistence
- Redis for session management

## Performance
- Supports 100+ concurrent users per document
- Sub-50ms latency for operations
- Automatic reconnection and sync

GitHub: https://github.com/alexchen/collab-editor
Live Demo: https://collab.example.com`,
  },
  {
    id: "microservices-orchestrator",
    name: "Microservices Orchestration Framework",
    description: "Service mesh and orchestration layer for managing 50+ microservices",
    techStack: ["Go", "Kubernetes", "gRPC", "Prometheus", "Grafana", "Istio"],
    githubUrl: "https://github.com/alexchen/service-orchestrator",
    content: `# Microservices Orchestration Framework

A comprehensive orchestration framework for managing microservices at scale.

## Features
- Service discovery and registration
- Load balancing and circuit breakers
- Distributed tracing
- Health checks and auto-recovery
- Configuration management

## Architecture
Built on Kubernetes with custom operators for service lifecycle management.
Integrates with Istio for service mesh capabilities.

## Capabilities
- Manages 50+ microservices
- Automatic scaling based on metrics
- Blue-green deployments
- Canary releases
- Centralized logging and monitoring

GitHub: https://github.com/alexchen/service-orchestrator`,
  },
  {
    id: "api-gateway",
    name: "High-Performance API Gateway",
    description: "Custom API gateway handling 1M+ requests/day with rate limiting and authentication",
    techStack: ["Node.js", "TypeScript", "Redis", "JWT", "Nginx", "AWS"],
    githubUrl: "https://github.com/alexchen/api-gateway",
    liveUrl: "https://api.example.com",
    content: `# High-Performance API Gateway

A custom-built API gateway designed for high throughput and low latency.

## Features
- Request routing and load balancing
- Rate limiting per API key/user
- JWT authentication and authorization
- Request/response transformation
- API versioning
- Request logging and analytics

## Performance
- Handles 1M+ requests per day
- P99 latency < 50ms
- 99.99% uptime
- Horizontal scaling support

## Security
- OAuth 2.0 integration
- API key management
- IP whitelisting
- DDoS protection
- Request validation

GitHub: https://github.com/alexchen/api-gateway
Live Demo: https://api.example.com`,
  },
  {
    id: "monitoring-dashboard",
    name: "Infrastructure Monitoring Dashboard",
    description: "Real-time monitoring dashboard for cloud infrastructure with custom alerting",
    techStack: ["React", "TypeScript", "Grafana", "Prometheus", "WebSocket", "D3.js"],
    githubUrl: "https://github.com/alexchen/monitoring-dashboard",
    content: `# Infrastructure Monitoring Dashboard

A comprehensive monitoring solution for cloud infrastructure and applications.

## Features
- Real-time metrics visualization
- Custom alerting rules
- Multi-cloud support (AWS, GCP, Azure)
- Cost tracking and optimization
- Incident management

## Integrations
- Prometheus for metrics collection
- Grafana for visualization
- PagerDuty for alerting
- Slack notifications
- Custom webhook support

## Capabilities
- Monitor 100+ services
- Track 1000+ metrics
- Real-time dashboards
- Historical data analysis
- Automated incident response

GitHub: https://github.com/alexchen/monitoring-dashboard`,
  },
];

