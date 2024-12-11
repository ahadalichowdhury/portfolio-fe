import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SEO from '@/components/SEO'
import { JsonLd } from 'react-schemaorg'
import { BlogPosting } from 'schema-dts'

// This would typically come from a database or API
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React and Three.js",
    content: "React and Three.js are powerful tools for creating 3D visualizations on the web. In this post, we'll explore the basics of integrating Three.js into a React application. We'll cover setting up a basic scene, adding 3D objects, and animating them. By the end of this tutorial, you'll have a solid foundation for building your own 3D web experiences.\n\nFirst, let's start by installing the necessary dependencies...",
    date: "2023-06-15",
    tags: ["React", "Three.js", "3D", "Web Development"],
    author: "John Doe",
    excerpt: "Learn how to create stunning 3D visualizations in your React applications using Three.js."
  },
  {
    id: 2,
    title: "The Future of Web Development: What to Expect in 2024",
    content: "As we look ahead to 2024, several exciting trends are shaping the future of web development. From AI-powered development tools to the rise of Web Assembly, the landscape is evolving rapidly. In this post, we'll explore key technologies and methodologies that are likely to dominate the field in the coming year.\n\nOne of the most significant trends we're seeing is the increased adoption of AI in development workflows...",
    date: "2023-07-02",
    tags: ["Web Development", "Trends", "Future Tech"],
    author: "Jane Smith",
    excerpt: "Explore upcoming trends and technologies that will shape the future of web development."
  },
  {
    id: 3,
    title: "Optimizing Performance in Next.js Applications",
    content: "Performance is crucial for providing a great user experience in web applications. Next.js, with its built-in optimizations, offers several ways to enhance the performance of your projects. In this post, we'll dive into techniques such as code splitting, lazy loading, and image optimization to squeeze every bit of performance out of your Next.js applications.\n\nLet's start by examining the impact of code splitting on initial load times...",
    date: "2023-07-20",
    tags: ["Next.js", "Performance", "Optimization"],
    author: "Alex Johnson",
    excerpt: "Discover techniques and best practices to boost the performance of your Next.js projects."
  }
]

export default function BlogPost() {
  const router = useRouter()
  const { id } = useParams()
  const post = blogPosts.find(post => post.id === parseInt(id as string))

  if (!post) {
    return <div className="text-green-400">Post not found</div>
  }

  const baseUrl = 'https://yourdomain.com' // Replace with your actual domain
  const postUrl = `${baseUrl}/blogs/${post.id}`

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
            name: post.author,
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
          <p className="text-sm opacity-75 mb-6">Published on {post.date} by {post.author}</p>
          <div className="prose prose-invert prose-green">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </>
  )
}

