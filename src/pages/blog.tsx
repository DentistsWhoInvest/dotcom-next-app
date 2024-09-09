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
import he from "he";

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

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/blog-posts");
  return {
    props: { pageData: result.data },
  };
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
          <span className="text-white text-3xl font-bold p-4">Blog </span>
          <span className="text-blue-light text-xl p-2">
            Read to understand how you can accelerate your financial goals​
          </span>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedData.map((page: any) => {
          const slug = createSlug(page.attributes.title);
          return (
            <li key={page.id}>
              <Link href={`/articles/${slug}`}>
                <Card className="m-6 border-blue-secondary border-2 justify-center">
                  <Image
                    src={page.attributes.cover.data.attributes.url}
                    alt={page.attributes.name}
                    width={200}
                    height={200}
                    className="object-cover w-full rounded-t-md"
                  />
                  <CardContent className="p-2 text-center">
                    <CardTitle className="text-blue-primary p-2">
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
