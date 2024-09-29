import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { HeroBanner } from "@/components/HeroBanner";

//probably will need to be moved to a utility file
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
  const filePath = path.join(process.cwd(), "public", "podcasts.json");

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
  const fetchedPodcasts = await fetchAllItems("/podcasts");

  await writeToLocal(fetchedPodcasts);

  const filePath = path.join(process.cwd(), "public", "podcasts.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);
  const totalPodcasts = parsedData;
  const podcastsPerPage = 12;
  const totalPages = Math.ceil(totalPodcasts.length / podcastsPerPage);

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
  const filePath = path.join(process.cwd(), "public", "podcasts.json");
  const page = parseInt(params.page, 10) || 1;
  const podcastsPerPage = 12; // Adjust as needed

  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const allPodcasts = JSON.parse(jsonData);

    // Calculate the start and end indices for pagination
    const startIndex = (page - 1) * podcastsPerPage;
    const endIndex = startIndex + podcastsPerPage;

    // Extract the relevant items based on pagination
    const paginatedPodcasts = allPodcasts.slice(startIndex, endIndex);

    return {
      props: {
        pageData: paginatedPodcasts,
        currentPage: page,
        totalPages: Math.ceil(allPodcasts.length / podcastsPerPage),
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

//and make sure it's the latest episodes first
export default function Podcasts({ pageData }: { pageData: any }) {
  const sortedData = pageData.sort(
    (a: any, b: any) =>
      b.attributes.episode_number - a.attributes.episode_number
  );

  return (
    <main className={`flex flex-col bg-[#f0f3f6]`}>
      <HeroBanner
        bannerImage={{
          url: "https://storage.googleapis.com/dwi-dotcom-assets/james_podcasting_c38220ce04/james_podcasting_c38220ce04.webp",
          alt: "James podcasting",
        }}
        bannerText={"The Dentists Who Invest Podcast "}
        subText={
          "Can't miss financial insights for UK dental professionals"
        }
        podcastSubText={true}
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedData.map((page: any) => {
          const trimmedTitle = page.attributes.title.replace(
            /\sDWI-EP\d+$/,
            ""
          );
          return (
            <>
              <Link href={`/e${page.attributes.episode_number}`}>
                <Card className="m-6 justify-center border-2 border-blue-secondary">
                  <Image
                    src={page.attributes.artwork_url}
                    alt={page.attributes.name}
                    width={200}
                    height={200}
                    className="w-full rounded-t-md object-cover"
                  />
                  <CardContent className="p-2 text-center">
                    <CardTitle className="p-2 text-blue-primary">
                      {page.attributes.name}
                    </CardTitle>
                    <CardDescription className="p-2 text-grey-primary">
                      EP{page.attributes.episode_number} {trimmedTitle}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </>
          );
        })}
      </ul>
      <div>todo: change page options</div>
    </main>
  );
}
