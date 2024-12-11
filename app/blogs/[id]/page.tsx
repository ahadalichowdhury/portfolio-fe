"use client"

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SEO from '@/components/SEO'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'
import { Copy, Check } from 'lucide-react'

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
  author?: string;
}

// Copy button component
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className="absolute right-2 top-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4 text-gray-400" />
      )}
    </button>
  )
}

// Custom components for markdown rendering
const MarkdownComponents = {
  // Custom code block rendering with syntax highlighting
  code({ className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''
    const codeString = String(children).replace(/\n$/, '')
    
    if (language) {
      return (
        <div className="relative group">
          <CopyButton text={codeString} />
          <SyntaxHighlighter
            style={dracula}
            language={language}
            PreTag="div"
            className="rounded-md my-4 bg-gray-900 !p-4"
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      )
    }
    
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  // Custom image rendering with Next.js Image component
  img({ src, alt }: any) {
    return (
      <div className="relative w-full h-[400px] my-8">
        <Image
          src={src || ''}
          alt={alt || ''}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )
  },
  // Custom paragraph styling
  p({ children }: any) {
    return <p className="mb-4 leading-relaxed">{children}</p>
  },
  // Custom heading styles
  h1({ children }: any) {
    return <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
  },
  h2({ children }: any) {
    return <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
  },
  h3({ children }: any) {
    return <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
  },
  // Custom list styling
  ul({ children }: any) {
    return <ul className="list-disc list-inside mb-4 ml-4">{children}</ul>
  },
  ol({ children }: any) {
    return <ol className="list-decimal list-inside mb-4 ml-4">{children}</ol>
  },
  // Custom blockquote styling
  blockquote({ children }: any) {
    return (
      <blockquote className="border-l-4 border-green-400 pl-4 my-4 italic">
        {children}
      </blockquote>
    )
  },
}

export default function BlogPost() {
  const router = useRouter()
  const { id } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:3001/api/blogs/${id}`)
        if (!response.ok) {
          throw new Error('Blog post not found')
        }
        const data = await response.json()
        setPost(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post')
        setPost(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchBlogPost()
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-green-400">
        <p className="text-xl mb-4">{error || 'Post not found'}</p>
        <Button 
          onClick={() => router.back()} 
          className="bg-green-500 text-black hover:bg-green-400"
        >
          Back to Blogs
        </Button>
      </div>
    )
  }

  const baseUrl = 'https://yourdomain.com' // Replace with your actual domain
  const postUrl = `${baseUrl}/blogs/${post._id}`

  return (
    <>
      <SEO
        title={`${post.title} | Your Developer Portfolio`}
        description={post.excerpt}
        url={postUrl}
        type="article"
      />
      <JsonLd<BlogPosting>
        item={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          author: {
            "@type": "Person",
            name: post.author || 'Anonymous',
          },
          description: post.excerpt,
          url: postUrl,
        }}
      />
      <div className="min-h-screen flex flex-col text-green-400 py-8 px-4 max-w-3xl mx-auto">
        <Button 
          onClick={() => router.back()} 
          className="mb-6 bg-green-500 text-black hover:bg-green-400 self-start"
        >
          Back to Blogs
        </Button>
        <article>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-green-500/20 text-green-400">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm opacity-75 mb-6">
            Published on {new Date(post.date).toLocaleDateString()} 
            {post.author && ` by ${post.author}`}
          </p>
          <div className="markdown-content text-green-400/90">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </>
  )
}
