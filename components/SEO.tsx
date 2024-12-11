import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  image?: string
  url: string
  type?: string
}

export default function SEO({ title, description, image, url, type = 'website' }: SEOProps) {
  const siteName = 'Your Developer Portfolio'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <link rel="canonical" href={url} />
    </Head>
  )
}

