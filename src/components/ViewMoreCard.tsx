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

  function getCardTitle (contentType: string) {
    switch (contentType) {
      case "video":
        return page.attributes.name;
      case "article":
        return page.attributes.title;
      case "podcast":
        return page.attributes.title;
      default:
        return "";
    }
  }

  return (
    <>
      <div className="m-6 flex h-[92%] w-[315px] flex-col justify-evenly rounded-2xl border-2 border-blue-secondary bg-white shadow-custom lg:w-[430px]">
        <Link href={`/${hrefStarter}/${slug}`}>
          <Image
            src={
              getImageLink(contentType)
            }
            alt={page.attributes.name}
            width={387}
            height={218}
            className="h-[218px] rounded-t-xl border border-blue-secondary bg-blue-secondary object-cover lg:h-[300px] lg:w-[430px]"
          />
        </Link>
        <div className="mx-8 my-4 flex h-full flex-col space-y-4 text-left">
          <p className="text-[21px] font-bold text-blue-primary">
            <Link
              href={`/${hrefStarter}/${slug}`}
              dangerouslySetInnerHTML={{ __html: getCardTitle(contentType) }}
            ></Link>
          </p>
          {hrefStarter === "blog-posts" && (
            <div
              className="grow text-base text-grey-primary"
              key={page.attributes.excerpt}
              dangerouslySetInnerHTML={{
                __html: trimmedExcerpt,
              }}
            />
          )}
          {hrefStarter === "videos" && (
            <div className="grow text-base text-grey-primary">
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
