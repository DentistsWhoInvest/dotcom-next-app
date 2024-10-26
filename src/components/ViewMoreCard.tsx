import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  const trimmedExcerpt =
    hrefStarter === "blog-posts" && trimAfterWords(page.attributes.excerpt, 25);

  function getImageLink(contentType: string) {
    switch (contentType) {
      case "video":
        const videoId = page.attributes.uri.replace("/videos/", "");

        return `https://vumbnail.com/${videoId}.jpg`;
      case "article":
        return page.attributes.cover.data.attributes.url;
      case "podcast":
        return page.attributes.artwork_url;
      default:
        return "";
    }
  }

  return (
    <>
      <div className="m-6 justify-evenly border-2 border-blue-secondary shadow-custom bg-white rounded-2xl w-[315px] flex flex-col lg:w-[430px] h-[92%]">
        <Link href={`/${hrefStarter}/${slug}`}>
          <Image
            src={
              getImageLink(contentType)
            }
            alt={page.attributes.name}
            width={387}
            height={218}
            className="rounded-t-xl h-[218px] object-cover bg-blue-secondary border-blue-secondary border lg:w-[430px] lg:h-[300px]"
          />
        </Link>
        <div className="text-left flex flex-col mx-8 my-4 space-y-4 h-full">
          <p className="text-blue-primary text-[21px] font-bold">
            <Link
              href={`/${hrefStarter}/${slug}`}
              dangerouslySetInnerHTML={{ __html: page.attributes.title }}
            ></Link>
          </p>
          {hrefStarter === "blog-posts" && (
            <div
              className="text-grey-primary text-base grow"
              key={page.attributes.excerpt}
              dangerouslySetInnerHTML={{
                __html: trimmedExcerpt,
              }}
            />
          )}
          {hrefStarter === "videos" && (
            <div className="text-grey-primary text-base grow">
              {" "}
              {page.attributes.description}
            </div>
          )}
          <Link
            className="text-xs font-semibold text-blue-secondary "
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
