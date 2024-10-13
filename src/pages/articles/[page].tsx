import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Link from "next/link";
import Image from "next/image";
import he from "he";
import { HeroBanner } from "@/components/HeroBanner";
import fs from "fs";
import path from "path";

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
    const allArticles = JSON.parse(jsonData);
    //adjust to sort by date
    const sortedData = allArticles.sort(
      (a: any, b: any) =>
        b.id - a.id
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
      },
    };
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return {
      props: {
        pageData: [],
        currentPage: page,
        totalPages: 0,
      },
    };
  }
};



//todo: figure out pagination
export default function Articles({ pageData }: { pageData: any }) {
  //assuming we want most recent articles first, but this can be changed
  const sortedData = pageData.sort(
    (a: any, b: any) =>
      new Date(b.attributes.publish_date).getTime() -
      new Date(a.attributes.publish_date).getTime()
  );

  return (
    <main className={`flex flex-col`}>

      <HeroBanner bannerText={"Articles"} subText={"Read to understand how you can accelerate your financial goals​"} bannerImage={{
        url: "https://storage.googleapis.com/dwi-dotcom-assets/blog_hero_cover_95c157286b/blog_hero_cover_95c157286b.webp"
      }} />
      <div className="p-4 text-center text-3xl font-bold text-blue-secondary">
        All Articles
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedData.map((page: any) => {
          const slug = createSlug(page.attributes.title);
          return (
            <li key={page.id}>
              <Link href={`/articles/${slug}`}>
                <Card className="m-6 justify-center border-2 border-blue-secondary shadow-lg">
                  <Image
                    src={page.attributes.cover.data.attributes.url}
                    alt={page.attributes.name}
                    width={200}
                    height={200}
                    className="w-full rounded-t-md object-cover"
                  />
                  <CardContent className="p-2 text-center">
                    <CardTitle className="p-2 text-blue-primary">
                      {page.attributes.title}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
