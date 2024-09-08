import { fetchEndpointData } from "@/lib/fetchUtils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/videos");
  return {
    props: { pageData: result.data },
  };
};

//replace image url with actual image url
export default function Videos({ pageData }: { pageData: any }) {
  console.log("pageData banner", pageData.horizontal_banner);
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

      <ul>
        {pageData.map((page: any) => {
          return (
            <>
              <Card className="m-6 border-blue-secondary border-2 justify-center">
                <Image
                  src="https://picsum.photos/200/150"
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
                    {page.attributes.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link
                    className={"text-blue-secondary text-xs font-semibold"}
                    href={`/videos/${page.id}`}
                  >
                    WATCH HERE
                  </Link>
                </CardFooter>
              </Card>
            </>
          );
        })}
      </ul>
    </main>
  );
}
