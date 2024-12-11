export const generateBlogPostSchema = (post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Your Name", // Replace with your name or organization
      logo: {
        "@type": "ImageObject",
        url: "https://yourdomain.com/logo.png", // Replace with your logo URL
      },
    },
  };
};
