import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-green-400 p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          Welcome to My Dev Universe
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in animation-delay-200">
          I&apos;m a passionate developer crafting digital solutions and bringing
          ideas to life through code. Let&apos;s build the
          future of technology together!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
          <Button
            asChild
            className="bg-green-500 text-black hover:bg-green-400 w-full sm:w-auto"
          >
            <Link href="/portfolio">View My Projects</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-green-400 border-green-400 hover:bg-green-400/10 w-full sm:w-auto"
          >
            <Link href="/about">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
