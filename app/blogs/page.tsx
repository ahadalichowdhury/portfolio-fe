"use client"

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from 'next/link'
import SEO from '@/components/SEO'

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
}

interface BlogResponse {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
}

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [blogData, setBlogData] = useState<BlogResponse>({ posts: [], totalPages: 0, currentPage: 1 })
  const [allTags, setAllTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch blog posts
  const fetchBlogPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '6',
        ...(selectedTag && { tag: selectedTag }),
        ...(searchTerm && { search: searchTerm }),
      }).toString();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs?${params}`);
      const data = await response.json();
      setBlogData(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, selectedTag, searchTerm]);

  // Fetch all tags
  const fetchTags = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/tags`);
      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }
      const tags = await response.json();
      setAllTags(tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
      setAllTags([]); // Set empty array on error
    }
  }, []);

  // Fetch data when component mounts and when filters change
  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  // Fetch tags when component mounts
  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <>
      <SEO
        title="Blog Posts | Your Developer Portfolio"
        description="Explore my latest thoughts and insights on web development, programming, and technology."
        url="https://yourdomain.com/blogs"
      />
      <div className="min-h-screen flex flex-col text-green-400 py-8 px-4">
        <h1 className="text-4xl font-bold mb-6 animate-fade-in">My Blog Posts</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-grow p-2 bg-gray-800/50 border border-green-500/20 rounded-md text-green-400 placeholder-green-400/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
          <select
            value={selectedTag || ""}
            onChange={(e) => {
              setSelectedTag(e.target.value || null);
              setCurrentPage(1);
            }}
            className="p-2 bg-gray-800/50 border border-green-500/20 rounded-md text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
          </div>
        ) : (
          <>
            {/* Blog Posts Grid */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {blogData.posts.map((post) => (
                <Card 
                  key={post._id}
                  className="bg-gray-800/50 backdrop-blur-md border-green-500/20 text-green-400 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
                >
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="bg-green-500/20 text-green-400 cursor-pointer"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-75">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <Link href={`${process.env.NEXT_PUBLIC_API_URL}/blogs/${post._id}`} className="text-green-400 hover:text-green-300 underline">
                        Read more
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {blogData.totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {[...Array(blogData.totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        href="#" 
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, blogData.totalPages))}
                      className={currentPage === blogData.totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </>
  );
}
