import Image from "next/image";
import Link from "next/link";

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

type HomePageContentCardProps = {
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
    <div id={title} className="overflow-hidden bg-white shadow-lg">
      <div className="relative w-full" style={{ aspectRatio: "5 / 3" }}>
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          layout="fill"
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start p-4">
        <Link
          href={url}
          className="pb-4 text-base font-semibold text-blue-primary"
        >
          {title}
        </Link>
        <p className="text-sm">{description}</p>
        <Link href={url} className="text-sm font-semibold text-blue-primary">
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
      className="flex flex-col overflow-hidden bg-white shadow-lg"
    >
      <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          layout="fill"
          className="size-full object-cover"
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

const MediumCard = ({ title, type, url, imageUrl, imageAlt }: CardProps) => {
  return (
    <div
      id={title}
      className="flex flex-row overflow-hidden bg-white shadow-lg lg:flex-col"
    >
      <div className="relative w-1/4" style={{ aspectRatio: "1 / 1" }}>
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          layout="fill"
          className="w-1/4 object-cover"
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
          title={title}
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
          title={title}
          type={type}
          description={description}
          url={url}
          imageUrl={imageUrl}
          imageAlt={imageAlt}
        />
      );
  }
};
