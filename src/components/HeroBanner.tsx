import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

type BannerImage = {
  url: string;
  alt?: string;
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
  bannerImage: BannerImage;
  bannerText: string;
  subText?: string;
  ctaButton?: ButtonData;
  podcastSubText?: boolean;
}) => {
  return (
    <div className="relative h-[430px] w-full overflow-hidden md:h-[409px] xl:h-[570.75px]">
      <div className="absolute inset-0 xl:hidden">
        <Image
          src={bannerImage.url}
          alt={"mobile"}
          layout="fill"
          objectFit="cover"
          objectPosition="right 50%"
          priority
        />
        <div className="absolute inset-0 bg-blue-primary opacity-70"></div>
      </div>
      <div className="absolute inset-0 hidden xl:block">
        <Image
          src={bannerImage.url}
          alt={"desktop"}
          layout="fill"
          objectFit="cover"
          objectPosition=""
          priority
        />
      </div>
      <div className="relative z-10 flex size-full flex-col items-center justify-center text-center md:max-w-[62%] md:items-start md:justify-center md:text-left lg:max-w-[50%] xl:mx-[130px] xl:max-w-[40%] ">
        <div className="absolute px-4 md:top-[30%] md:px-[30px] xl:top-[40%] ">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-[35px] xl:mb-5 xl:text-[45px]">
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
              <span className="text-white">
                Monday | Wednesday | Friday</span>
            </p>
          )}
        </div>

        {ctaButton && (
          <Button className="mt-8 rounded-md bg-orange-400 text-white hover:text-blue-primary ">
            <Link href={ctaButton.url}>{ctaButton.text}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
