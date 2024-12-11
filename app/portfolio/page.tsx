"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const ITEMS_PER_PAGE = 6;

// Helper function to truncate text to a specific number of words
const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

export default function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/api/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and paginate projects locally
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Fetch data when component mounts
  useEffect(() => {
    fetchProjects();
  }, []); // Only fetch once when component mounts

  return (
    <div className="min-h-screen flex flex-col text-green-400 py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 animate-fade-in">My Projects</h1>
      
      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 p-2 bg-gray-800/50 border border-green-500/20 rounded-md text-green-400 placeholder-green-400/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
        </div>
      ) : (
        <>
          {/* Projects Grid */}
          <div className="flex-grow grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {paginatedProjects.map((project) => (
              <Card 
                key={project._id}
                className="bg-gray-800/50 backdrop-blur-md border-green-500/20 text-green-400 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
              >
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <p className="text-sm text-green-400/80 line-clamp-3" title={project.description}>
                    {truncateText(project.description, 20)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Show message if no projects found */}
          {paginatedProjects.length === 0 && !isLoading && (
            <div className="text-center text-green-400 py-8">
              No projects found. Try adjusting your search.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  )
}
