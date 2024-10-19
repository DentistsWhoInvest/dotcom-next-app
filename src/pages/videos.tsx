import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import Link from "next/link";
import { createSlug } from "./articles/[page]";
import { HeroBanner } from "@/components/HeroBanner";

type Tag = {
  id: number;
  tag_name: string;
};

type HorizontalBannerAttributes = {
  createdAt: string;
  updatedAt: string;
  title: string;
  navigation_url: string;
  is_internal: boolean;
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
};

export type Video = {
  id: number;
  attributes: VideoAttributes;
};

type VideosResponse = Video[];

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/videos");
  return {
    props: { pageData: result.data },
  };
};

export const VideoCard = ({ page }: { page: Video }) => {
  const slug = createSlug(page.attributes.name);
  const videoId = page.attributes.uri.replace("/videos/", "");
  return (
    <>
      <div className="m-6 justify-evenly border-2 border-blue-secondary shadow-custom bg-white rounded-2xl w-[315px] text-center flex flex-col lg:w-[430px]">
        <Link href={`/videos/${slug}`}>
          <Image
            src={`https://vumbnail.com/${videoId}.jpg`}
            alt={page.attributes.name}
            width={387}
            height={218}
            className="rounded-t-xl h-[218px] object-cover bg-blue-secondary border-blue-secondary border lg:w-[430px] lg:h-[300px]"
          />
        </Link>
        <div className="text-center flex flex-col mx-8 my-4 grow space-y-4">
          <p className="text-blue-primary text-[21px] font-bold">
            <Link href={`/videos/${slug}`}>{page.attributes.name}</Link>
          </p>
          <p className="text-grey-primary text-sm">
            {page.attributes.description}
          </p>
          <div className="grow"></div>
            <Link
              className={"text-xs font-semibold text-blue-secondary mb-5 "}
              href={`/videos/${slug}`}
            >
              WATCH HERE
            </Link>
        </div>
      </div>
    </>
  );
};

export default function Videos({ pageData }: { pageData: VideosResponse }) {
  const sortedData = pageData.sort(
    (a: any, b: any) =>
      new Date(b.attributes.createdAt).getTime() -
      new Date(a.attributes.createdAt).getTime()
  );

  return (
    <main className={`flex flex-col bg-[#f0f3f6]`}>
      <HeroBanner
        bannerImage={{
          url: "https://storage.googleapis.com/dwi-dotcom-assets/james_recording_green_screen_3de155024b/james_recording_green_screen_3de155024b.webp",
        }}
        bannerText={"Videos"}
        subText="Reflective insights on finance and wealth"
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 self-center">
        {sortedData.map((page: any) => {
          return <VideoCard key={page.id} page={page} />;
        })}
      </ul>
    </main>
  );
}
