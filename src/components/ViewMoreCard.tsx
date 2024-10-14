import { Button } from "./ui/button";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { processDate } from "@/lib/dateUtils";

export const ViewMoreCard = ({
  page,
  contentType,
  slug,
}: {
  page: any;
  contentType: string;
  slug: string;
}) => {
  const { publishedDate } =
    contentType === "article"
      ? processDate(page.attributes.publish_date)
      : processDate(page.attributes.publishedAt);

  function getHrefStarter(contentType: string) {
    switch (contentType) {
      case "video":
        return "videos";
      case "article":
        return "blog-posts";
      case "podcast":
        return "podcasts";
      default:
        return "";
    }
  }
  const hrefStarter = getHrefStarter(contentType);

  const trimAfterWords = (text: string, wordLimit: number) => {
    const words = text.split(" "); // Split the text into an array of words
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..."; // Join the first 'wordLimit' words and add ellipsis
    }
    return text; // If there are fewer words than the limit, return the full text
  };

  const trimmedExcerpt = trimAfterWords(page.attributes.excerpt, 25);

  return (
    <>
      <div className="m-6 justify-evenly border-2 border-blue-secondary shadow-custom bg-white rounded-2xl w-[315px] text-center flex flex-col lg:w-[430px]">
        <Link href={`/${hrefStarter}/${slug}`}>
          <Image
            src={page.attributes.cover.data.attributes.url}
            alt={page.attributes.name}
            width={387}
            height={218}
            className="rounded-t-xl h-[218px] object-cover bg-blue-secondary border-blue-secondary border lg:w-[430px] lg:h-[300px]"
          />
        </Link>
        <div className="text-center flex flex-col mx-8 my-4 grow space-y-4">
          <p className="text-blue-primary text-[21px] font-bold">
            <Link href={`/${hrefStarter}/${slug}`}>{page.attributes.title}</Link>
          </p>
          <div className="text-grey-primary text-base"
                  key={page.attributes.excerpt}
                  dangerouslySetInnerHTML={{
                    __html:trimmedExcerpt
                    ,
                  }}
                />
          <div className="grow"></div>
          <Link
            className={"text-xs font-semibold text-blue-secondary"}
            href={`/${hrefStarter}/${slug}`}
          >
            <span className="flex p-2">
              READ MORE <ChevronsRight size={13} />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};
