// generate-sitemap.js
const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const fetch = require('node-fetch'); // Make sure to have node-fetch installed
const GoogleAuth = require('google-auth-library');
const { IAMCredentialsClient } = require('@google-cloud/iam-credentials');
const he = require('he');
require('dotenv').config();

let serviceAccountEmail =
  "build-service@electric-node-426223-s2.iam.gserviceaccount.com";

/**
 * Generates JWT payload for service account.
 *
 * @param {string} url - The URL of the IAP secured resource.
 * @returns {object} - The JWT payload.
 */
async function generateJwtPayload(url) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // 1 hour expiration time

  return {
    iss: serviceAccountEmail,
    sub: serviceAccountEmail,
    email: serviceAccountEmail,
    aud: url,
    iat: iat,
    exp: exp,
  };
}

/**
 * Signs JWT payload using ADC and IAM credentials API.
 *
 * @param {string} resourceUrl - Audience of the JWT, and scope of the JWT token.
 * @returns {Promise<string>} - A signed JWT that can be used to access IAP protected apps.
 */
async function signJwt(url) {
  const iamClient = new IAMCredentialsClient();
  const payload = await generateJwtPayload(url);
  const targetSa = serviceAccountEmail;
  const [response] = await iamClient.signJwt({
    name: `projects/-/serviceAccounts/${targetSa}`,
    payload: JSON.stringify(payload),
  });
  let jwt = response.signedJwt?.trim();
  if (jwt) {
    return jwt;
  } else {
    return "error";
  }
}

async function fetchSitemapEndpointData(
  requestedEndpoint,
  populateFields = ["*"],
  makingPaginatedRequest = false,
  paginationOptions
) {
  const NEXT_ADMIN_STRAPI_URL=process.env.NEXT_ADMIN_STRAPI_URL
  const STRAPI_API_KEY=process.env.STRAPI_API_KEY
  const endpoint = `${NEXT_ADMIN_STRAPI_URL}${requestedEndpoint}`;
  let headers = {
    Authorization: `bearer ${STRAPI_API_KEY}`,
    "Proxy-Authorization": "",
    "Content-Type": "application/json",
  };
  if (process.env["ENV"] !== "dev" || !endpoint.includes("localhost")) {
    let jwt = await signJwt(endpoint);
    headers["Proxy-Authorization"] = `Bearer ${jwt}`;
  }

  function buildUrl(
    endpoint,
    makingPaginatedRequest,
    paginationOptions
  ) {
    const baseUrl = `${endpoint}?populate=${populateFields.join(",")}`;
    if (makingPaginatedRequest && paginationOptions) {
      return `${baseUrl}&pagination[page]=${paginationOptions.page}&pagination[pageSize]=${paginationOptions.pageSize}`;
    } else {
      return baseUrl;
    }
  }
  const url = buildUrl(endpoint, makingPaginatedRequest, paginationOptions);
  const fetchRequest = await fetch(url, { method: "GET", headers });
  const resultJSON = await fetchRequest.json();
  return resultJSON;
}


const fetchAllItems = async (url) => {
  let allItems = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetchSitemapEndpointData(url, undefined, true, {
        page: page,
        pageSize: pageSize,
      });
      const meta = response.meta;
      allItems = allItems.concat(response.data);
      hasMore = page < meta.pagination.pageCount;
      page++;
    } catch (error) {
      console.error("Error fetching items:", error);
      hasMore = false;
    }
  }
  return allItems;
};


function createSlug(title) {
  return he
    .decode(title)
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-word characters except hyphens
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Remove leading hyphens
    .replace(/-+$/, ""); // Remove trailing hyphens
}

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: 'https://www.dentistswhoinvest.com' });

  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/404', changefreq: 'monthly', priority: 0.7 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    
    { url: '/privacy-policy', changefreq: 'monthly', priority: 0.7 },
    { url: '/terms-and-conditions', changefreq: 'monthly', priority: 0.7 },
    
    { url: '/courses', changefreq: 'monthly', priority: 0.7 },
    { url: '/the-academy', changefreq: 'monthly', priority: 0.7 },
    { url: '/cash-flow-for-dentists', changefreq: 'monthly', priority: 0.7 },
    { url: '/100k', changefreq: 'monthly', priority: 0.7 },
    { url: '/the-informed-investors-club', changefreq: 'monthly', priority: 0.7 },
    
    { url: '/videos', changefreq: 'daily', priority: 0.7 },
    { url: '/articles', changefreq: 'daily', priority: 0.7 },
    { url: '/podcast', changefreq: 'daily', priority: 0.7 },
    // Putting articles and podcasts for simplicity
  ];

  // Fetch dynamic pages
  // for each todo: replace with correct api
  // make sure it gets all pages, taking into account pagination
  // and update the slugs so the correct url is generated
  const fetchVideoPages = async () => {
    const videosResponse = await fetchSitemapEndpointData(`/videos`);

    // Use your custom logic to generate URLs
    return videosResponse.data.map(video => {
      // Example custom URL generation
      const slug = createSlug(video.attributes.name)
      return {
        url: `/videos/${slug}`,
        changefreq: 'monthly',
        priority: 0.8,
      };
    });
  };
  const fetchPodcastPages = async () => {
    const podcastsResponse = await fetchAllItems("/podcasts");

    // Use your custom logic to generate URLs
    return podcastsResponse.map(podcast => {
      // Example custom URL generation
      const podcastSlug = createSlug(podcast.attributes.title).replace(/-dwi-ep\d+$/, '')
      const podcastLink = `/episodes/e${podcast.attributes.episode_number}-${podcastSlug}`;     
      return {
        url: `${podcastLink}`,
        changefreq: 'monthly',
        priority: 0.8,
      };
    });
  };
  const fetchArticlePages = async () => {
    const articlesResponse = await fetchAllItems("/blog-posts");

    // Use your custom logic to generate URLs
    return articlesResponse.map(article => {
      // Example custom URL generation
      const slug = createSlug(article.attributes.title);
      return {
        url: `/article/${slug}`,
        changefreq: 'monthly',
        priority: 0.8,
      };
    });
  };
  const fetchTargetedDataCollectionPages = async () => {
    const targetedPagesResponse = await fetchSitemapEndpointData(
      `/targeted-data-collection-pages`
    );
    

    // Use your custom logic to generate URLs
    return targetedPagesResponse.data.map(page => {
      // Example custom URL generation
      const slug = createSlug(page.attributes.title)
      return {
        url: `/${slug}`,
        changefreq: 'monthly',
        priority: 0.8,
      };
    });
  };

  //await all dynamic pages
  const videoPages = await fetchVideoPages();
  const podcastPages = await fetchPodcastPages();
  const articlePages = await fetchArticlePages();
  const targetedPages = await fetchTargetedDataCollectionPages();

  // Combine static and dynamic pages
  const allPages = [...staticPages, ...videoPages, ...podcastPages, ...articlePages, ...targetedPages];

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
