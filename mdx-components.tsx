import type { MDXComponents } from "mdx/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const components: MDXComponents = {
  // Map HTML elements to custom components
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-black mb-6 text-foreground mt-12 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-black mb-5 text-foreground mt-10 first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-bold mb-4 text-foreground mt-8 first:mt-0" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-6 text-lg leading-relaxed text-foreground/90 first:mt-20" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-foreground/90" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground/90" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-lg leading-relaxed" {...props}>
      {children}
    </li>
  ),
  code: ({ children, ...props }) => (
    <code
      className="px-2 py-1 bg-accent/20 text-foreground rounded font-mono text-sm border border-accent/30"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="p-4 mb-4 rounded-lg bg-accent/10 border-2 border-accent/30 overflow-x-auto"
      {...props}
    >
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-accent-foreground underline decoration-2 underline-offset-4 hover:text-accent-foreground/80 font-semibold"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-accent pl-4 py-2 my-4 italic text-foreground/80"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // Export components for use in MDX
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

