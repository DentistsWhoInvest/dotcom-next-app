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
      <Card className="m-6 border-blue-secondary border-2 justify-center">
        <Link href={`/videos/${slug}`}>
          <Image
            src="https://picsum.photos/200/150"
            alt={page.attributes.name}
            width={200}
            height={200}
            className="object-cover w-full rounded-t-md"
          />
        </Link>
        <CardContent className="p-2 text-center">
          <CardTitle className="text-blue-primary p-2">
            <Link href={`/videos/${slug}`}>{page.attributes.name}</Link>
          </CardTitle>
          <CardDescription className="text-grey-primary p-2">
            {page.attributes.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="justify-center">
          <Link
            className={"text-blue-secondary text-xs font-semibold"}
            href={`/videos/${slug}`}
          >
            WATCH HERE
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

//replace image url with actual image url
export default function Videos({ pageData }: { pageData: any }) {
  const sortedData = pageData.sort(
    (a: any, b: any) =>
      new Date(b.attributes.updatedAt).getTime() -
      new Date(a.attributes.updatedAt).getTime()
  );

  return (
    <main className={`flex flex-col bg-[#f0f3f6]`}>
      <div className="relative">
        <Image
          className="object-cover w-full"
          src={
            "https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
          }
          alt={"Hero banner"}
          width={"320"}
          height={"440"}
        />

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 flex-col p-16">
          <span className="text-white text-3xl font-bold p-4">Videos </span>
          <span className="text-blue-light text-xl p-2">
            Reflective insights on finance and wealth
          </span>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedData.map((page: any) => {
          return <VideoCard key={page.id} page={page} />;
        })}
      </ul>
    </main>
  );
}
