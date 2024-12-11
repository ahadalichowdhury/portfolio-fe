import { Metadata } from "next";

const defaultKeywords = [
  "web developer",
  "software engineer",
  "full-stack developer",
  "React developer",
  "Next.js developer",
  "portfolio",
  "backend development",
  "frontend development",
  "CI/CD",
  "software architecture",
];

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // Replace with your actual domain
  title: {
    default: "Developer Portfolio | Your Name", // Replace with your name
    template: "%s | Your Name", // Replace with your name
  },
  description:
    "Professional portfolio showcasing full-stack development projects, expertise in React, Next.js, and modern web technologies.",
  keywords: defaultKeywords,
  authors: [{ name: "Your Name" }], // Replace with your name
  creator: "Your Name", // Replace with your name
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com", // Replace with your domain
    siteName: "Developer Portfolio",
    title: "Developer Portfolio | Your Name", // Replace with your name
    description:
      "Professional portfolio showcasing full-stack development projects, expertise in React, Next.js, and modern web technologies.",
    images: [
      {
        url: "/og-image.png", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Portfolio | Your Name", // Replace with your name
    description:
      "Professional portfolio showcasing full-stack development projects, expertise in React, Next.js, and modern web technologies.",
    images: ["/og-image.png"], // Add your Twitter card image
    creator: "@yourtwitterhandle", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
