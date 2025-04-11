import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import Link from "next/link";
import { createSlug } from "../articles/[page]";
import { HeroBanner } from "@/components/HeroBanner";
import { useState } from "react";
import path from "path";
import fs from "fs";
import { PaginationNav } from "@/components/PaginationNav";

type Tag = {
  id: number;
  tag_name: string;
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
  alternativeText: string | null;
  caption: string | null;
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
  data: {
    id: number;
    attributes: ImageAttributes;
  };
};
type HorizontalBannerAttributes = {
  createdAt: string;
  updatedAt: string;
  title: string;
  navigation_url: string;
  is_internal: boolean;
  cover_image: ImageData;
};

type HorizontalBannerData = {
  id: number;
  attributes: HorizontalBannerAttributes;
};

type HorizontalBanner = {
  data: HorizontalBannerData;
};

type VideoAttributes = {
  name: string;
  uri: string;
  duration: number;
  modified_time: string;
  status: string;
  is_playable: boolean;
  hash: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  tags: Tag[];
  horizontal_banner: HorizontalBanner;
  cpd_course: any;
};

export type Video = {
  id: number;
  attributes: VideoAttributes;
};

type VideosResponse = Video[];

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
  const filePath = path.join(process.cwd(), "public", "videos.json");

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

export async function getStaticPaths() {
  const fetchedVideos = await fetchAllItems("/videos");

  await writeToLocal(fetchedVideos);

  const filePath = path.join(process.cwd(), "public", "videos.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);
  const totalVideos = parsedData;
  const videosPerPage = 15;
  const totalPages = Math.ceil(totalVideos.length / videosPerPage);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: String(i + 1) },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: any) => {
  const filePath = path.join(process.cwd(), "public", "videos.json");
  const page = parseInt(params.page, 10) || 1;
  const videosPerPage = 15;

  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const allVideos = JSON.parse(jsonData);

    const startIndex = (page - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;

    const paginatedVideos = allVideos.slice(startIndex, endIndex);

    return {
      props: {
        pageData: paginatedVideos,
        currentPage: page,
        totalPages: Math.ceil(allVideos.length / videosPerPage),
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

export const VideoCard = ({ page }: { page: Video }) => {
  const slug = createSlug(page.attributes.name);
  const videoId = page.attributes.uri.replace("/videos/", "");
  const [thumbnailLink, setThumbnailLink] = useState("");
  const getVimeoThumbnail = async (videoId: string) => {
    const response = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`
    );
    const data = await response.json();
    const highResThumbnail = data.thumbnail_url.replace(
      /-d_[0-9]+x[0-9]+/,
      "-d_1280"
    );
    setThumbnailLink(highResThumbnail);
  };
  getVimeoThumbnail(videoId);
  return (
    <>
      <div className="m-6 flex w-[315px] flex-col justify-evenly rounded-2xl border-2 border-blue-secondary bg-white text-center shadow-custom lg:w-[430px]">
        <Link href={`/videos/${slug}`}>
          <Image
            src={thumbnailLink}
            alt={page.attributes.name}
            width={387}
            height={218}
            className="h-[218px] rounded-t-xl border border-blue-secondary bg-blue-secondary object-cover lg:h-[300px] lg:w-[430px]"
          />
        </Link>
        <div className="mx-8 my-4 flex grow flex-col space-y-4 text-center">
          <p className="text-[21px] font-bold text-blue-primary">
            <Link href={`/videos/${slug}`}>{page.attributes.name}</Link>
          </p>
          <p className="text-sm text-grey-primary">
            {page.attributes.description}
          </p>
          <div className="grow"></div>
          <Link
            className={"mb-5 text-xs font-semibold text-blue-secondary "}
            href={`/videos/${slug}`}
          >
            WATCH HERE
          </Link>
        </div>
      </div>
    </>
  );
};

export default function Videos({
  pageData,
  currentPage,
  totalPages,
}: {
  pageData: VideosResponse;
  currentPage: number;
  totalPages: number;
}) {
  const sortedData = pageData.sort(
    (a: any, b: any) =>
      new Date(b.attributes.createdAt).getTime() -
      new Date(a.attributes.createdAt).getTime()
  );

  return (
    <main className={`flex flex-col bg-[#f0f3f6]`}>
      <HeroBanner
        bannerImage={{
          url: "https://assets.dentistswhoinvest.com/james_recording_green_screen_3de155024b/james_recording_green_screen_3de155024b.webp",
          name: "james_recording_green_screen_3de155024b",
        }}
        bannerText={"Videos/CPD"}
        subText="Free Verifiable CPD for UK Dentists"
      />
      <ul className="grid grid-cols-1 gap-4 self-center py-[30px] md:grid-cols-2 md:pt-[40px] lg:pt-[50px] xl:grid-cols-3 xl:pt-[70px]">
        {sortedData.map((page: any) => {
          return <VideoCard key={page.id} page={page} />;
        })}
      </ul>
      <div className="mt-6 self-center pb-10">
        <div>
          <PaginationNav
            navPath="videos"
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </main>
  );
}
