import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string | null;
  ogUrl?: string;
}

const DEFAULT_TITLE = 'Movie MB';
const DEFAULT_DESCRIPTION =
  'Explore filmes populares, busque seus favoritos e crie sua lista personalizada de filmes.';
const DEFAULT_KEYWORDS = 'filmes, movies, cinema, TMDB, favoritos';

export const useSEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}: SEOProps = {}) => {
  useEffect(() => {
    // Document title
    const fullTitle = title ? `${title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    document.title = fullTitle;

    // Meta tags helpers
    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOGTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Set meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);

    // Open Graph tags
    setOGTag('og:title', ogTitle || fullTitle);
    setOGTag('og:description', ogDescription || description);
    setOGTag('og:type', 'website');

    if (ogImage) {
      setOGTag('og:image', ogImage);
    }

    if (ogUrl) {
      setOGTag('og:url', ogUrl);
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', ogTitle || fullTitle);
    setMetaTag('twitter:description', ogDescription || description);

    if (ogImage) {
      setMetaTag('twitter:image', ogImage);
    }

    // Cleanup function to reset to defaults when component unmounts
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl]);
};
