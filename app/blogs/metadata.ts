import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Posts | Developer Portfolio',
  description: 'Explore my latest thoughts, tutorials, and insights on web development, programming, and technology.',
  keywords: ['web development', 'programming', 'technology', 'tutorials', 'coding', 'software engineering'],
  openGraph: {
    title: 'Blog Posts | Developer Portfolio',
    description: 'Explore my latest thoughts, tutorials, and insights on web development, programming, and technology.',
    type: 'website',
    images: [
      {
        url: '/blog-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blog Posts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Posts | Developer Portfolio',
    description: 'Explore my latest thoughts, tutorials, and insights on web development, programming, and technology.',
  },
}
