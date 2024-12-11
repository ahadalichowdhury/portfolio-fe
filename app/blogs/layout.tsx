import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Developer Portfolio",
  description: "Explore technical articles, tutorials, and insights about web development, software engineering, and modern technologies.",
  openGraph: {
    title: "Blog | Developer Portfolio",
    description: "Explore technical articles, tutorials, and insights about web development, software engineering, and modern technologies.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose prose-green dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}
