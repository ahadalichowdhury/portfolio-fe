"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Canvas } from '@react-three/fiber'
import { Box, Sphere, Torus } from '@react-three/drei'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const projects = [
  {
    id: 1,
    title: "3D E-commerce Platform",
    description: "An immersive online store with 3D product previews.",
    shape: "box"
  },
  {
    id: 2,
    title: "VR Task Management",
    description: "A virtual reality app for intuitive project planning.",
    shape: "sphere"
  },
  {
    id: 3,
    title: "Interactive Data Visualization",
    description: "3D charts and graphs for complex data sets.",
    shape: "torus"
  },
  // Add more projects here...
]

const ITEMS_PER_PAGE = 6

function ProjectShape({ shape }: { shape: string }) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {shape === "box" && <Box args={[1, 1, 1]}><meshStandardMaterial color="hotpink" /></Box>}
      {shape === "sphere" && <Sphere args={[0.5, 32, 32]}><meshStandardMaterial color="lightblue" /></Sphere>}
      {shape === "torus" && <Torus args={[0.3, 0.2, 16, 32]}><meshStandardMaterial color="lightgreen" /></Torus>}
    </Canvas>
  )
}

export default function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const paginatedProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen flex flex-col text-green-400 py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 animate-fade-in">My Projects</h1>
      <div className="flex-grow grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {paginatedProjects.map((project) => (
          <Card 
            key={project.id}
            className="bg-gray-800/50 backdrop-blur-md border-green-500/20 text-green-400 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
          >
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 mb-4">
                <ProjectShape shape={project.shape} />
              </div>
              <p>{project.description}</p>
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
  )
}

