import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import he from "he";
import { HeroBanner } from "@/components/HeroBanner";
import fs from "fs";
import path from "path";
import { PaginationNav } from "@/components/PaginationNav";

type TextNode = {
  text: string;
  type: string;
};

type Paragraph = {
  type: "paragraph";
  children: TextNode[];
};

type ContentSection = {
  id: number;
  content: any;
};

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

type ImageAttributes = {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
};

type ImageData = {
  id: number;
  attributes: ImageAttributes;
};

type BannerAttributes = {
  createdAt: string;
  updatedAt: string;
  title: string;
  navigation_url: string;
  is_internal: boolean;
  cover_image: { data: ImageData };
};

type BannerData = {
  id: number;
  attributes: BannerAttributes;
};

type ContributorAttributes = {
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  title: string;
};

type ContributorData = {
  id: number;
  attributes: ContributorAttributes;
};

export type ArticleAttributes = {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  publish_date: string;
  cover: {
    data: ImageData;
  };
  thumbnail: {
    data: ImageData | null;
  };
  vertical_banners: {
    data: BannerData[];
  };
  horizontal_banners: {
    data: BannerData[];
  };
  content_sections: ContentSection[];
  contributors: {
    data: ContributorData[];
  };
  page_metadata: PageMetadata;
};

export type PageMetadata = {
    id: number;
    title: string;
    description: string;
    url: string;
    image: {
      data: ImageData;
    };
}

export type Article = {
  id: number;
  attributes: ArticleAttributes;
};

type ArticleResponse = Article[];

//would be nice to move to /lib, but doesn't seem to work if put in fetch utils?
export function createSlug(title: string) {
return he
    .decode(title)
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-word characters except hyphens
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Remove leading hyphens
    .replace(/-+$/, ""); // Remove trailing hyphens
}

// export const getStaticProps = async () => {
//   const result = await fetchEndpointData("/blog-posts");
//   return {
//     props: { pageData: result.data },
//   };
// };

const fetchAllItems = async (url: string) => {
  let allItems: any[] = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetchEndpointData(url, undefined, true, {
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

function writeToLocal(result: any[]) {
  const filePath = path.join(process.cwd(), "public", "articles.json");

  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(result), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// figure out a way for the first page to not be /podcast/1 but just /podcast
export async function getStaticPaths() {
  const fetchedArticles = await fetchAllItems("/blog-posts");

  await writeToLocal(fetchedArticles);

  const filePath = path.join(process.cwd(), "public", "articles.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);
  const totalArticles = parsedData;
  const articlesPerPage = 12;
  const totalPages = Math.ceil(totalArticles.length / articlesPerPage);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: String(i + 1) },
  }));

  return { paths, fallback: false };
}

// export async function getStaticProps({ params }: { params: { page: string } }) {
//   const page = parseInt(params.page, 10);
//   const podcastsPerPage = 12;
//   const result = await fetchEndpointData("/podcasts", undefined, true, {page, pageSize: podcastsPerPage});

//   return {
//     props: { pageData: result.data },
//   };
// }

export const getStaticProps = async ({ params }: any) => {
  const filePath = path.join(process.cwd(), "public", "articles.json");
  const page = parseInt(params.page, 10) || 1;
  const articlesPerPage = 12; // Adjust as needed

  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const allArticles: Article[] = JSON.parse(jsonData);
    //adjust to sort by date
    const sortedData = allArticles.sort(
      (a: Article, b: Article) =>
        new Date(b.attributes.publishedAt).getTime() -
        new Date(a.attributes.publishedAt).getTime()
    );

    // Calculate the start and end indices for pagination
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;

    // Extract the relevant items based on pagination
    const paginatedArticles = allArticles.slice(startIndex, endIndex);

    return {
      props: {
        pageData: paginatedArticles,
        currentPage: page,
        totalPages: Math.ceil(allArticles.length / articlesPerPage),
        pageSize: articlesPerPage
      },
    };
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return {
      props: {
        pageData: [],
        currentPage: page,
        totalPages: 0,
        pageSize: articlesPerPage,
      },
    };
  }
};

//todo: figure out pagination
export default function Articles({
  pageData,
  currentPage,
  totalPages,
  pageSize,
}: {
  pageData: ArticleResponse;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}) {
  //assuming we want most recent articles first, but this can be changed
  const sortedData = pageData.sort(
    (a: any, b: any) =>
      new Date(b.attributes.publish_date).getTime() -
      new Date(a.attributes.publish_date).getTime()
  );

  return (
    <>
      <Head>
        <title>Dentists Who Invest Articles page {currentPage}</title>
        <meta name="title" content={`Dentists Who Invest Articles page ${currentPage}`} />
        <meta name="description" content={`Page of ${pageSize} dental and finance articles. Page ${currentPage}/${totalPages}`} />
        {/* todo: add this in backend model */}
        <meta name="keywords" content="Dentistry, Finance, Article, News" />
        {/* todo: add proper author, not always James, default to James if empty. */}
        
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={`Dentists Who Invest Articles page ${currentPage}`} />
        <meta property="og:description" content={`Page of ${pageSize} dental and finance articles. Page ${currentPage}/${totalPages}`} />
        <meta property="og:url" content={`https://www.dentistswhoinvest.com/articles/${currentPage}`}/>
        <meta property="og:image" content="https://assets.dentistswhoinvest.com/blog_hero_cover_95c157286b/blog_hero_cover_95c157286b.webp"/>
        <meta property="og:site_name" content="Dentists Who Invest"/>

      </Head>
      <main className={`flex flex-col`}>
        <HeroBanner
          bannerText={"Articles"}
          subText={
            "Read to understand how you can accelerate your financial goals​"
          }
          bannerImage={{
            url: "https://assets.dentistswhoinvest.com/blog_hero_cover_95c157286b/blog_hero_cover_95c157286b.webp",
            name: "blog_hero_cover_95c157286b",
          }}
        />
        <div className="py-[40px] text-center text-3xl font-bold text-blue-secondary lg:py-[70px] lg:text-[45px]">
          All Articles
        </div>
        <ul className="grid grid-cols-1 gap-4 self-center md:grid-cols-2 xl:mx-[40px] xl:grid-cols-3">
          {sortedData.map((page: Article) => {
            const slug = createSlug(page.attributes.title);
            return (
              <li key={page.id}>
                <Link href={`/article/${slug}`}>
                  <div className="m-6 flex w-[315px] grow flex-col justify-evenly rounded-2xl border-2 border-blue-secondary bg-white text-center shadow-custom md:h-[500px] lg:h-[567px] lg:w-[430px]">
                    <Image
                      src={page.attributes.cover.data.attributes.url}
                      alt={page.attributes.title}
                      width={311}
                      height={311}
                      className="h-[311px] rounded-t-xl border border-blue-secondary bg-blue-secondary object-cover md:h-[442px] lg:size-[430px]"
                    />
                    <div
                      className="grow px-5 pt-5 text-center text-xl text-blue-primary"
                      dangerouslySetInnerHTML={{ __html: page.attributes.title }}
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 self-center pb-10">
          <div>
            <PaginationNav
              navPath="articles"
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </main>
    </>
  );
}
