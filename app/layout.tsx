import Background3D from "@/components/Background3D";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "Welcome to my professional developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-red-600 w-full">
              <Background3D />
              <div className="relative z-10 p-6 min-h-screen w-full ">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
