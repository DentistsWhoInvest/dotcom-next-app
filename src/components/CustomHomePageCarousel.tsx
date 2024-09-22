// "use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  let assetDomain = "https://assets.drjamesmartin.co.uk";
  function replaceImageDomain(url: string): string {
    return url.replace(
      "https://storage.googleapis.com/dwi-dotcom-assets",
      assetDomain
    );
  }
  return (
    <div className="mx-auto w-full max-w-xs">
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        ref={emblaRef}
        className="w-full"
      >
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
                    className="h-48 w-full object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-2 flex justify-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`mx-1 size-2 rounded-full ${
              index === current ? "bg-blue-primary" : "bg-blue-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
