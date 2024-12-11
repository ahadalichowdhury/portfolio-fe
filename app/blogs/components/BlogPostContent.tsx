"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { JsonLd } from "react-schemaorg";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { BlogPosting } from "schema-dts";
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
  author?: string;
}

// Custom type for the syntax highlighter style
type PrismStyleType = {
  [key: string]: {
    color?: string;
    backgroundColor?: string;
    [key: string]: string | undefined;
  };
};

// Copy button component
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute right-2 top-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4 text-gray-400" />
      )}
    </button>
  );
};

// Custom components for markdown rendering
const MarkdownComponents: Components = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    return (
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={dracula as PrismStyleType}
          PreTag="div"
          className="rounded-lg !bg-gray-900 !p-4"
          {...(props as SyntaxHighlighterProps)}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
        <CopyButton text={String(children)} />
      </div>
    );
  },
  img({ src, alt }) {
    return (
      <div className="relative w-full h-64 my-4">
        <Image
          src={src || ""}
          alt={alt || ""}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    );
  },
  p({ children }) {
    return (
      <p className="mb-4 leading-relaxed text-green-400">
        {children}
      </p>
    );
  },
  h1({ children }) {
    return (
      <h1 className="text-3xl font-bold mb-4 text-green-400">
        {children}
      </h1>
    );
  },
  h2({ children }) {
    return (
      <h2 className="text-2xl font-semibold mb-3 text-green-400">
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="text-xl font-medium mb-2 text-green-400">
        {children}
      </h3>
    );
  },
  ul({ children }) {
    return (
      <ul className="list-disc list-inside mb-4 text-green-400">
        {children}
      </ul>
    );
  },
  ol({ children }) {
    return (
      <ol className="list-decimal list-inside mb-4 text-green-400">
        {children}
      </ol>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-green-600 pl-4 italic my-4 text-green-400">
        {children}
      </blockquote>
    );
  },
} as Components;

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const router = useRouter();
  const blogUrl = `https://yourdomain.com/blogs/${post._id}`;

  return (
    <>
      <JsonLd<BlogPosting>
        item={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          author: {
            "@type": "Person",
            name: post.author || "Your Name",
          },
          datePublished: post.date,
          dateModified: post.date,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": blogUrl,
          },
        }}
      />

      <article className="max-w-4xl mx-auto px-4 py-8 text-green-400">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-green-400">
            {post.title}
          </h1>
          <div className="flex items-center text-green-400 mb-4">
            <span>{post.author || "S. M. Ahad Ali Chowdhury"}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString()}
            </time>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-green-400"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div className="prose dark:prose-invert prose-green dark:prose-green max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/blogs")}
            className="min-w-[140px] border-green-500 
              bg-white dark:bg-green-400 
              text-green-400 dark:text-black 
              hover:bg-black dark:hover:bg-black 
              hover:text-green-400 dark:hover:text-green-400 
              hover:border-green-500 
              transition-all duration-300"
          >
            ← Back to Blogs
          </Button>
        </div>
      </article>
    </>
  );
}
