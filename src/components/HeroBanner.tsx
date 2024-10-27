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
  bannerImage: ImageAttributes | { url: string, name: string };
  bannerText: string;
  subText?: string;
  ctaButton?: ButtonData;
  podcastSubText?: boolean;
}) => {
  return (
    <div className="relative z-10 h-[430px] w-screen overflow-hidden md:h-[409px] xl:h-[570.75px]">
        <Image
          src={bannerImage.url}
          alt={bannerImage.name}
          layout="fill"
          objectFit="cover"
          className="inset-0 object-[right_70%] lg:object-[right_40%] xl:object-[right_30%] xxl:object-[right_25%]"
        />
        <div className="absolute inset-0 bg-blue-primary opacity-80 md:opacity-[0.69] xl:hidden"></div>

      <div className="relative z-10 flex size-full flex-col items-center justify-center text-center md:max-w-[62%] md:items-start md:justify-center md:text-left lg:max-w-[50%] xl:mx-[130px] xl:max-w-[1140px] ">
        <div className="absolute px-4 md:top-1/4 md:px-[30px] xl:top-[30%] xl:w-2/3">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-[35px] xl:mb-5 xl:text-[45px] xl:leading-[54px]">
            {bannerText}
          </h1>
          {subText && (
            <p className="text-[18px] leading-[21.6px] text-blue-light xl:text-xl">
              {subText}
            </p>
          )}
          {podcastSubText && (
            <p className="text-[16px] leading-[21.6px] ">
              <span className="text-orange-400">New episodes every: </span>
              <br />
              <span className="text-white">Monday | Wednesday | Friday</span>
            </p>
          )}
          {ctaButton && (
            <Button className="mt-8 rounded-md bg-orange-400 text-white hover:text-blue-primary ">
              <Link href={ctaButton.url}>{ctaButton.text}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};