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
      className="flex flex-col overflow-hidden bg-white shadow-lg lg:flex-row max-h-[630px] lg:max-h-[360px]"
    >
      <div className="relative aspect-[5/3] w-full lg:w-2/3 max-h-full">
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          layout="fill"
          className="size-full object-cover lg:object-top"
          priority={true}
        />
      </div>
      <div className="flex flex-col items-start p-4 lg:w-1/3">
        <Link
          href={url}
          className="pb-4 text-lg font-semibold text-blue-primary"
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
        <Link href={url} className="pt-2 text-sm font-semibold text-blue-primary">
          Read More...
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
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          layout="fill"
          className="size-full object-cover"
          priority={false}
        />
      </div>
      <div className="flex flex-col items-start px-4 py-2">
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
      className="flex flex-row overflow-hidden bg-white shadow-lg lg:flex-col lg:max-h-[320px]"
    >
      <div
        className="relative w-1/4 lg:w-full aspect-square max-h-full overflow-hidden"
        
      >
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          layout="fill"
          className="w-1/4 object-cover object-[50%_15%]"
          priority={false}
        />
      </div>
      <div className="flex flex-col items-start p-4">
        <p className="mb-2 bg-blue-primary px-3 py-1 text-xs font-semibold uppercase text-white">
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
  const trimmedTitle = trimAfterWords(title, 7);
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
