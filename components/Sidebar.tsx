"use client"

import { useState } from 'react'
import { Code, User, Briefcase, Menu, BookOpen } from 'lucide-react'
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const menuItems = [
  { icon: Code, label: "Home", href: "/" },
  { icon: User, label: "About Me", href: "/about" },
  { icon: Briefcase, label: "Projects", href: "/portfolio" },
  { icon: BookOpen, label: "Blogs", href: "/blogs" },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SidebarTrigger 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-green-400 p-2 rounded-md"
      >
        <Menu />
      </SidebarTrigger>
      <Sidebar 
        className={`w-64 bg-slate-700/90 dark:bg-gray-800/50 backdrop-blur-md border-r border-green-500/20 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <SidebarHeader className="border-b border-green-500/20 p-4">
          <h2 className="text-2xl font-bold text-center text-green-400 dark:text-green-400">Dev Portfolio</h2>
        </SidebarHeader>
        <SidebarContent className="flex flex-col justify-center h-full py-4">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href}
                  className="w-full justify-start px-4 text-green-400 hover:bg-green-400/10 transition-colors"
                >
                  <Link href={item.href} className="flex items-center gap-3 py-3" onClick={() => setIsOpen(false)}>
                    <item.icon className="h-5 w-5" />
                    <span className="text-lg">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  )
}
