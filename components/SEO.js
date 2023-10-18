import { NextSeo } from 'next-seo';

const SEO = ({ title, description, canonical, ogImage }) => {
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
          {
            url: ogImage, // Explicitly provide the 'og:image'
            width: 1200,
            height: 630,
            alt: 'Your Open Graph Image Alt Text',
          },
          // Add more Open Graph images if needed
        ],
      }}
    />
  );
};

export default SEO;
