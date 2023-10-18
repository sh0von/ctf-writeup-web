import { NextSeo } from 'next-seo'

const SEO = ({ title, description, canonical }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        type: 'website',
        url: canonical,
        title,
        description,
        images: [
          // Add open graph images if needed
        ]
      }}
    />
  )
}

export default SEO
