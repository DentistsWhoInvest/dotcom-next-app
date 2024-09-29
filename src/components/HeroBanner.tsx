import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

type BannerImage = {
  url: string;
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
  ctaButton,
  subText,
}: {
  bannerImage: BannerImage;
  bannerText: string;
  subText?: string;
  ctaButton?: ButtonData;
}) => {
  return (
    <div className="relative h-[490px] w-full overflow-hidden md:h-[449px] xl:h-[660.75px]">
      <div className="absolute inset-0 xl:hidden">
        <Image
          src={bannerImage.url}
          alt={"mobile"}
          layout="fill"
          objectFit="cover"
          objectPosition="right 50%"
          priority
        />
        <div className="absolute inset-0 bg-blue-primary opacity-60"></div>
      </div>
      <div className="absolute inset-0 hidden xl:block">
        <Image
          src={bannerImage.url}
          alt={"desktop"}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          priority
        />
      </div>
      <div className="relative z-10 mt-8 flex size-full flex-col items-center justify-center px-4 text-center text-white md:justify-center md:px-8 lg:px-16 xl:mx-24 xl:max-w-[33%] xl:items-start xl:text-left">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
          {bannerText}
        </h1>
        {subText && <p className="p-2 text-xl text-blue-light">{subText}</p>}

        {ctaButton && (
          <Button className="mt-8 rounded-md bg-orange-400 text-white hover:text-blue-primary ">
            <Link href={ctaButton.url}>{ctaButton.text}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
