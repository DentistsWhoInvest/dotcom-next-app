import Image from "next/image";
import Link from "next/link";
import { trimAfterWords } from "./ViewMoreCard";

// desktop: image top, text bottom
// mobile: image left, text right

export type CardSize = "medium" | "large" | "splash";

type CardProps = {
  title: string;
  type: string;
  description?: string;
  url: string;
  imageUrl: string;
  imageAlt: string;
};

export type HomePageContentCardProps = {
  size: string;
  title: string;
  type: string;
  description?: string;
  url: string;
  imageUrl: string;
  imageAlt: string;
};

const SplashCard = ({
  title,
  type,
  description,
  url,
  imageUrl,
  imageAlt,
}: CardProps) => {
  return (
    <div
      id={title}
      className="flex flex-col overflow-hidden bg-white shadow-lg lg:flex-row max-h-[630px] lg:max-h-[380px]"
    >
      <div className="relative aspect-[5/3] w-[full] lg:w-[65.5%] lg:max-h-full max-h-[450px]">
        <Link href={url}>
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            layout="fill"
            className="size-full object-cover lg:object-top"
            priority={true}
          />
        </Link>
      </div>
      <div className="flex flex-col items-start p-4 lg:w-1/3">
        <Link
          href={url}
          className={`pb-4 font-semibold text-blue-primary ${
            description ? "text-lg" : "text-2xl"
          }`}
        >
          {title}
        </Link>
        {description && (
          <>
            <p className="text-sm hidden lg:block">
              {trimAfterWords(description, 45)}
            </p>
            <p className="text-sm block lg:hidden">
              {trimAfterWords(description, 25)}
            </p>
          </>
        )}
        <Link
          href={url}
          className={` text-sm font-semibold text-blue-primary 
            ${description ? "pt-2" : "pt-4"}`}
        >
          {type === "article" && "Read more..."}
          {type === "podcast" && "Listen here"}
          {type === "video" && "Watch here"}
        </Link>
      </div>
    </div>
  );
};

const LargeCard = ({ title, type, url, imageUrl, imageAlt }: CardProps) => {
  return (
    <div
      id={title}
      className="flex flex-col overflow-hidden bg-white shadow-lg max-h-[350px] lg:max-h-[320px]"
    >
      <div className="lg:aspect-[5:4] relative aspect-square max-h-full overflow-hidden">
        <Link href={url}>
          {" "}
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            layout="fill"
            className="size-full object-cover"
            priority={false}
          />
        </Link>
      </div>
      <div className="flex flex-col items-start lg:px-4 px-2 py-2 grow h-2/5">
        <p className="mb-2 bg-blue-primary px-3 text-[10px] font-semibold uppercase text-white">
          {type}
        </p>
        <Link href={url} className="text-base font-semibold text-blue-primary">
          {title}
        </Link>
      </div>
    </div>
  );
};

const MediumCard = ({ title, type, url, imageUrl, imageAlt }: CardProps) => {
  return (
    <div
      id={title}
      className="flex flex-row overflow-hidden bg-white shadow-lg md:flex-col md:max-h-[300px] lg:max-h-[320px]"
    >
      <div className="relative aspect-square max-h-full overflow-hidden max-w-[130px] md:max-w-full w-full">
        <Link href={url}>
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            layout="fill"
            className="w-1/4 object-cover object-[50%_15%]"
            priority={false}
          />
        </Link>
      </div>
      <div className="flex flex-col items-start p-3 grow h-2/5">
        <p className="md:mb-2 mb-4 bg-blue-primary px-3 text-[10px] font-semibold uppercase text-white">
          {type}
        </p>
        <Link href={url} className="text-base font-semibold text-blue-primary">
          {title}
        </Link>
      </div>
    </div>
  );
};

export const HomePageContentCard = ({
  size,
  title,
  type,
  description,
  url,
  imageUrl,
  imageAlt,
}: HomePageContentCardProps) => {
  const trimmedTitle = trimAfterWords(title, 8);
  switch (size) {
    case "splash":
      return (
        <SplashCard
          title={title}
          type={type}
          description={description}
          url={url}
          imageUrl={imageUrl}
          imageAlt={imageAlt}
        />
      );

    case "large":
      return (
        <LargeCard
          title={trimmedTitle}
          type={type}
          description={description}
          url={url}
          imageUrl={imageUrl}
          imageAlt={imageAlt}
        />
      );

    case "medium":
    default:
      return (
        <MediumCard
          title={trimmedTitle}
          type={type}
          description={description}
          url={url}
          imageUrl={imageUrl}
          imageAlt={imageAlt}
        />
      );
  }
};
