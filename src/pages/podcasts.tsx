import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Link from "next/link";
import Image from "next/image";

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/podcasts");
  return {
    props: { pageData: result.data },
  };
};

//todo: figure out pagination
export default function Podcasts({ pageData }: { pageData: any }) {
  const sortedData = pageData.sort(
    (a: any, b: any) =>
      b.attributes.episode_number - a.attributes.episode_number
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
          <span className="text-white text-3xl font-bold p-4">Podcasts </span>
          <span className="text-blue-light text-xl p-2">
            The Dentists Who Invest Podcast Can&apos;t miss financial insights
            for UK dental professionals New episodes every: Monday | Wednesday |
            Friday
          </span>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedData.map((page: any) => {
          const trimmedTitle = page.attributes.title.replace(/\sDWI-EP\d+$/, '');
          return (
            <>
              <Link href={`/podcasts/e${page.attributes.episode_number}`}>
                <Card className="m-6 border-blue-secondary border-2 justify-center">
                  <Image
                    src={page.attributes.artwork_url}
                    alt={page.attributes.name}
                    width={200}
                    height={200}
                    className="object-cover w-full rounded-t-md"
                  />
                  <CardContent className="p-2 text-center">
                    <CardTitle className="text-blue-primary p-2">
                      {page.attributes.name}
                    </CardTitle>
                    <CardDescription className="text-grey-primary p-2">
                      EP{page.attributes.episode_number} {trimmedTitle}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </>
          );
        })}
      </ul>
    </main>
  );
}
