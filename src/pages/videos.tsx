import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { createSlug } from "./articles";
import { HeroBanner } from "@/components/HeroBanner";

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/videos");
  return {
    props: { pageData: result.data },
  };
};

export const VideoCard = ({ page }: { page: any }) => {
  const slug = createSlug(page.attributes.name);
  return (
    <>
      <Card className="m-6 justify-center border-2 border-blue-secondary">
        <Link href={`/videos/${slug}`}>
          <Image
            src="https://picsum.photos/200/150"
            alt={page.attributes.name}
            width={200}
            height={200}
            className="w-full rounded-t-md object-cover"
          />
        </Link>
        <CardContent className="p-2 text-center">
          <CardTitle className="p-2 text-blue-primary">
            <Link href={`/videos/${slug}`}>{page.attributes.name}</Link>
          </CardTitle>
          <CardDescription className="p-2 text-grey-primary">
            {page.attributes.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="justify-center">
          <Link
            className={"text-xs font-semibold text-blue-secondary"}
            href={`/videos/${slug}`}
          >
            WATCH HERE
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default function Videos({ pageData }: { pageData: any }) {
  const sortedData = pageData.sort(
    (a: any, b: any) =>
      new Date(b.attributes.updatedAt).getTime() -
      new Date(a.attributes.updatedAt).getTime()
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
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedData.map((page: any) => {
          return <VideoCard key={page.id} page={page} />;
        })}
      </ul>
    </main>
  );
}
