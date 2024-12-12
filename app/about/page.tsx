import { Button } from "@/components/ui/button";
import { Facebook, Github, Linkedin, Mail, X } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn about my journey as a software engineer, my expertise in backend development, and my experience with scalable software architecture and CI/CD pipelines.",
  openGraph: {
    title: "About Me | Developer Portfolio",
    description: "Learn about my journey as a software engineer, my expertise in backend development, and my experience with scalable software architecture and CI/CD pipelines.",
  },
  twitter: {
    title: "About Me | Developer Portfolio",
    description: "Learn about my journey as a software engineer, my expertise in backend development, and my experience with scalable software architecture and CI/CD pipelines.",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {/* Profile Image */}
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-green-500 mb-8 overflow-hidden">
        <Image
          src="https://media.licdn.com/dms/image/v2/D5603AQG3WTuIOAOozA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729247894434?e=2147483647&v=beta&t=2nru4vrUATBvf3E3Mt_4pPMLBARVLbwrgFy8gnWkz0U"
          alt="Profile"
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      {/* About Text */}
      <div className="max-w-2xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in text-green-400">
          About Me
        </h1>
        <p className="text-lg mb-6 animate-fade-in animation-delay-200 text-green-400">
          I am a software engineer, focused on backend development. I design a
          lot of software which is scalable, maintainable, and I create CI/CD
          pipelines to increase productivity.
        </p>
        <div className="space-y-4 animate-fade-in animation-delay-200">
          <p className="text-green-400">
            With several years of experience in the industry, I&#39;ve worked on a
            variety of projects ranging from small business websites to
            large-scale enterprise applications. I&#39;m always eager to learn new
            technologies and push the boundaries of what&#39;s possible on the web.
          </p>
        </div>
      </div>

      {/* Social Links - First Row */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <a href="https://www.facebook.com/smahadalichowdhury1" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="min-w-[140px] border-green-500 
                bg-white dark:bg-green-400 
                text-green-400 dark:text-black 
                hover:bg-black dark:hover:bg-black 
                hover:text-green-400 dark:hover:text-green-400 
                hover:border-green-500 
                transition-all duration-300">
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </a>
        <a href="https://github.com/ahadalichowdhury" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="min-w-[140px] border-green-500 
                bg-white dark:bg-green-400 
                text-green-400 dark:text-black 
                hover:bg-black dark:hover:bg-black 
                hover:text-green-400 dark:hover:text-green-400 
                hover:border-green-500 
                transition-all duration-300">
            <Github className="mr-2 h-4 w-4" />
            Github
          </Button>
        </a>
        <a href="https://www.linkedin.com/in/ahadchowdhury" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="min-w-[140px] border-green-500 
                bg-white dark:bg-green-400 
                text-green-400 dark:text-black 
                hover:bg-black dark:hover:bg-black 
                hover:text-green-400 dark:hover:text-green-400 
                hover:border-green-500 
                transition-all duration-300">
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </Button>
        </a>
      </div>

      {/* Social Links - Second Row */}
      <div className="flex flex-wrap justify-center gap-4">
        <a href="https://x.com/homo_ant" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="min-w-[140px] border-green-500 
                bg-white dark:bg-green-400 
                text-green-400 dark:text-black 
                hover:bg-black dark:hover:bg-black 
                hover:text-green-400 dark:hover:text-green-400 
                hover:border-green-500 
                transition-all duration-300">
            <X className="mr-2 h-4 w-4" />
            Twitter
          </Button>
        </a>
        <a href="mailto:smahadalichowdhury@gmail.com" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="min-w-[140px] border-green-500 
                bg-white dark:bg-green-400 
                text-green-400 dark:text-black 
                hover:bg-black dark:hover:bg-black 
                hover:text-green-400 dark:hover:text-green-400 
                hover:border-green-500 
                transition-all duration-300">
            <Mail className="mr-2 h-4 w-4" />
            Gmail
          </Button>
        </a>
      </div>
    </div>
  );
}
