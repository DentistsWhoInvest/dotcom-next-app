import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
          className="w-full object-cover"
          src={
            "https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
          }
          alt={"Hero banner"}
          width={"320"}
          height={"440"}
        />

        <div className="absolute left-0 top-0 z-10 flex size-full flex-col items-center justify-center p-16">
          <span className="p-4 text-3xl font-bold text-white">Articles </span>
          <span className="p-2 text-xl text-blue-light">
            Read to understand how you can accelerate your financial goals​
          </span>
        </div>
      </div>
      <div className="p-4 text-center text-3xl font-bold text-blue-secondary">
        All Articles
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedData.map((page: any) => {
          const slug = createSlug(page.attributes.title);
          return (
            <li key={page.id}>
              <Link href={`/articles/${slug}`}>
                <Card className="m-6 justify-center border-2 border-blue-secondary">
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
