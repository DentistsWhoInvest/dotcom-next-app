import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
};

type ButtonData = {
  text: string;
  url: string;
  description: string;
};

/**
 *
 * @param bannerImage should be data.attributes
 * @returns
 */
export const HeroBanner = ({
  bannerImage,
  bannerText,
  ctaButton = undefined,
  subText,
  podcastSubText = false,
}: {
  bannerImage: ImageAttributes | { url: string; name: string };
  bannerText: string;
  subText?: string;
  ctaButton?: ButtonData;
  podcastSubText?: boolean;
}) => {
  return (
    <div className="relative z-10 h-[430px] w-screen overflow-hidden md:h-[409px] lg:h-[570.75px]">
      <Image
        src={bannerImage.url}
        alt={bannerImage.name}
        layout="fill"
        objectFit="cover"
        className="inset-0 object-[right_70%] lg:object-[right_40%] xl:object-[right_30%] xxl:object-[right_25%]"
        priority
      />
      <div className="absolute inset-0 bg-blue-primary opacity-80 md:opacity-[0.69] lg:hidden"></div>
      <div className="relative z-10 flex size-full flex-col items-center justify-center px-5 text-center md:w-[65%] md:max-w-screen-lg md:items-start md:px-[30px] md:text-left lg:mx-auto lg:w-[1140px] lg:grow lg:px-0">
        <h1 className="-mt-4 mb-5 text-3xl font-bold text-white md:mb-6 md:mt-[-60px] md:text-[35px] lg:mb-5 lg:mt-[-12px] lg:w-1/2 lg:text-[45px] lg:leading-[54px]">
          {bannerText}
        </h1>
        {subText && (
          <p className="text-[18px] leading-[21.6px] text-blue-light md:leading-[25.2px] lg:w-1/2 lg:text-xl">
            {subText}
          </p>
        )}
        {podcastSubText && (
          <p className="mt-10 text-[16px] leading-[21.6px] md:text-[18px] md:leading-[25.2px]">
            <span className="text-orange-400">New episodes every: </span>
            <br />
            <span className="text-white">Monday | Wednesday | Friday</span>
          </p>
        )}
        {ctaButton && (
            <Button className="mt-8 rounded-md bg-orange-600 px-[55px] py-6 text-base text-white hover:bg-orange-500">
            <Link href={ctaButton.url} aria-label={ctaButton.description}>{ctaButton.text}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
