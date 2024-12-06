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
      <div
        id={title}
        className=" overflow-hidden bg-white shadow-lg"
      >
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          width={300}
          height={300}
          className="w-[66%] object-cover"
        />
        <div className="flex flex-col items-start p-4">
          <Link href={url} className="text-base font-semibold text-blue-primary">{title}</Link>
          <p>{description}</p>
        </div>
      </div>
    );
  };

const LargeCard = ({
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
        className="flex flex-col overflow-hidden bg-white shadow-lg"
      >
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          width={300}
          height={300}
          className="h-auto w-1/4 object-cover lg:w-full"
        />
        <div className="flex flex-col items-start p-4">
          <p className="mb-2 bg-blue-primary px-3 py-1 text-xs font-semibold uppercase text-white">
            {type}
          </p>
          <Link href={url} className="text-base font-semibold text-blue-primary">{title}</Link>
        </div>
      </div>
    );
  };
  

const MediumCard = ({
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
        className="flex flex-row overflow-hidden bg-white shadow-lg lg:flex-col"
      >
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          width={300}
          height={300}
          className="h-auto w-1/4 object-cover lg:w-full"
        />
        <div className="flex flex-col items-start p-4">
          <p className="mb-2 bg-blue-primary px-3 py-1 text-xs font-semibold uppercase text-white">
            {type}
          </p>
          <Link href={url} className="text-base font-semibold text-blue-primary">{title}</Link>
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
