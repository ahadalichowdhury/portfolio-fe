import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostContent from "../components/BlogPostContent";

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(`http://localhost:3001/api/blogs/${params.slug}`)
    if (!response.ok) {
      return {}
    }
    const post = await response.json()
    
    return {
      title: `${post.title} | Developer Blog`,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} | Developer Blog`,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author || 'Your Name'],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: `${post.title} | Developer Blog`,
        description: post.excerpt,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {}
  }
}

async function getBlogPost(slug: string) {
  try {
    const response = await fetch(`http://localhost:3001/api/blogs/${slug}`)
    if (!response.ok) {
      return null
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}
