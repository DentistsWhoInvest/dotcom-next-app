import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Thought = {
  id: number;
  title: string;
  cover: {
    data: {
      attributes: {
        alternativeText: string;
        formats: {
          large: {
            url: string;
          };
        };
        height: number;
        width: number;
      };
    };
  };
};

//todo make sure the dots are updating correctly
export const CustomHomePageCarousel = ({ thoughts }: any) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true});

  let assetDomain = "https://assets.dentistswhoinvest.com";
  function replaceImageDomain(url: string): string {
    return url.replace(
      "https://storage.googleapis.com/dwi-dotcom-assets",
      assetDomain
    );
  }
  return (
    <div className="mx-auto w-full max-w-[700px] py-8 md:max-w-[800px] lg:max-w-[904px]">
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        ref={emblaRef}
        className="w-full "
      >
        <div className="flex flex-col items-center">
          <CarouselContent>
            {thoughts.map((thought: Thought, index: number) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden rounded-3xl">
                  <CardContent className="p-0">
                    <Image
                      src={replaceImageDomain(
                        thought.cover.data.attributes.formats.large.url
                      )}
                      alt={thought.cover.data.attributes.alternativeText}
                      width={400}
                      height={300}
                      className="size-full object-cover md:max-h-[528px] md:max-w-[800px] lg:h-[412px] lg:max-w-[904px] xl:h-[442px]"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4">
          <CarouselDots /></div>
        </div>
      </Carousel>
    </div>
  );
};
