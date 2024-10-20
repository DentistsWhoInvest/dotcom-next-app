// generate-sitemap.js
const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const fetch = require('node-fetch'); // Make sure to have node-fetch installed

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: 'https://www.dentistswhoinvest.com' });

  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/100k', changefreq: 'monthly', priority: 0.7 },
    { url: '/404', changefreq: 'monthly', priority: 0.7 },
    { url: '/cash-flow-for-dentists', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    { url: '/courses', changefreq: 'monthly', priority: 0.7 },
    { url: '/privacy-policy', changefreq: 'monthly', priority: 0.7 },
    { url: '/terms-and-conditions', changefreq: 'monthly', priority: 0.7 },
    { url: '/the-academy', changefreq: 'monthly', priority: 0.7 },
    { url: '/the-informed-investors-club', changefreq: 'monthly', priority: 0.7 },
    { url: '/videos', changefreq: 'monthly', priority: 0.7 },
    { url: '/articles', changefreq: 'monthly', priority: 0.7 },
    { url: '/podcast', changefreq: 'monthly', priority: 0.7 },
    // Putting articles and podcasts for simplicity
  ];

  // Fetch dynamic pages
  // for each todo: replace with correct api
  // make sure it gets all pages, taking into account pagination
  // and update the slugs so the correct url is generated
  const fetchVideoPages = async () => {
    const videosResponse = await fetch('https://yourapi.com/posts'); // Replace with your API
    const data = await videosResponse.json();

    // Use your custom logic to generate URLs
    return data.map(post => {
      // Example custom URL generation
      const slug = post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      return {
        url: `/posts/${slug}-${post.id}`, // Custom logic for URL
        changefreq: 'weekly',
        priority: 0.8,
      };
    });
  };
  const fetchPodcastPages = async () => {
    const podcastsResponse = await fetch('https://yourapi.com/posts'); // Replace with your API
    const data = await podcastsResponse.json();

    // Use your custom logic to generate URLs
    return data.map(post => {
      // Example custom URL generation
      const slug = post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      return {
        url: `/posts/${slug}-${post.id}`, // Custom logic for URL
        changefreq: 'weekly',
        priority: 0.8,
      };
    });
  };
  const fetchArticlePages = async () => {
    const articlesResponse = await fetch('https://yourapi.com/posts'); // Replace with your API
    const data = await articlesResponse.json();

    // Use your custom logic to generate URLs
    return data.map(post => {
      // Example custom URL generation
      const slug = post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      return {
        url: `/posts/${slug}-${post.id}`, // Custom logic for URL
        changefreq: 'weekly',
        priority: 0.8,
      };
    });
  };

  //await all dynamic pages
//   const videoPages = await fetchVideoPages();
//   const podcastPages = await fetchPodcastPages();
//   const articlePages = await fetchArticlePages();

  // Combine static and dynamic pages
//   const allPages = [...staticPages, ...videoPages, ...podcastPages, ...articlePages];
  const allPages = [...staticPages];

  // Write pages to the sitemap
  allPages.forEach(page => {
    sitemap.write(page);
  });

  sitemap.end();

  // Write the sitemap to sitemap.xml file
  const sitemapXML = await streamToPromise(sitemap).then(data => data.toString());
  fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemapXML);
  console.log('Sitemap generated: /public/sitemap.xml');
};

// Run the sitemap generation
generateSitemap().catch(console.error);
