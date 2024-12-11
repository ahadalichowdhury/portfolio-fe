"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from 'next/link'
import SEO from '@/components/SEO'

// This would typically come from a database or API
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React and Three.js",
    excerpt: "Learn how to create stunning 3D visualizations in your React applications using Three.js.",
    date: "2023-06-15",
    tags: ["React", "Three.js", "3D", "Web Development"]
  },
  {
    id: 2,
    title: "The Future of Web Development: What to Expect in 2024",
    excerpt: "Explore upcoming trends and technologies that will shape the future of web development.",
    date: "2023-07-02",
    tags: ["Web Development", "Trends", "Future Tech"]
  },
  {
    id: 3,
    title: "Optimizing Performance in Next.js Applications",
    excerpt: "Discover techniques and best practices to boost the performance of your Next.js projects.",
    date: "2023-07-20",
    tags: ["Next.js", "Performance", "Optimization"]
  },
  // Add more blog posts here...
]

const ITEMS_PER_PAGE = 6

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = blogPosts.filter(post =>
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (!selectedTag || post.tags.includes(selectedTag))
  )

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

  return (
    <>
      <SEO
        title="Blog Posts | Your Developer Portfolio"
        description="Explore my latest thoughts and insights on web development, programming, and technology."
        url="https://yourdomain.com/blogs" // Replace with your actual domain
      />
      <div className="min-h-screen flex flex-col text-green-400 py-8 px-4">
        <h1 className="text-4xl font-bold mb-6 animate-fade-in">My Blog Posts</h1>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="flex-grow p-2 bg-gray-800/50 border border-green-500/20 rounded-md text-green-400 placeholder-green-400/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
          <select
            value={selectedTag || ""}
            onChange={(e) => {
              setSelectedTag(e.target.value || null)
              setCurrentPage(1)
            }}
            className="p-2 bg-gray-800/50 border border-green-500/20 rounded-md text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {paginatedPosts.map((post) => (
            <Card 
              key={post.id}
              className="bg-gray-800/50 backdrop-blur-md border-green-500/20 text-green-400 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
            >
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-green-500/20 text-green-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-75">{post.date}</span>
                  <Link href={`/blogs/${post.id}`} className="text-green-400 hover:text-green-300 underline">
                    Read more
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
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
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

