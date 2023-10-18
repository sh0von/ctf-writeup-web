import { NextSeo } from 'next-seo';

const SEO = ({ title, description, canonical }) => {
  const defaultImage = 'Uhttps://og-image-rest-generator.fly.dev/seo-banner?title=OG:IMAGE%20REST%20Generator%20-%20Free%20And%20Open%20Source!&author=darkterminal&head=Young%20Tyrex%20Release&writer=Punk%20Storyteller'; // Replace with the actual URL of your default image

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
            url: defaultImage, // Default image URL
            width: 1200,
            height: 630,
            alt: 'Your Default Image Alt Text', // Alt text for the default image
          },
          // Add more Open Graph images if needed
        ],
      }}
    />
  );
};

export default SEO;
