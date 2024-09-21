import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { createSlug } from "../articles";
import { Video } from "lucide-react";
import { VideoCard } from "../videos";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const getStaticPaths = async () => {
  const results: any = await fetchEndpointData(`/videos`);
  return {
    paths: results.data.map((result: { attributes: { name: string } }) => ({
      params: { videotitle: createSlug(result.attributes.name) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const allVideos = await fetchEndpointData(`/videos`);
  const matchingVideo = allVideos.data.find(
    (video: { attributes: { name: string } }) =>
      createSlug(video.attributes.name) === params.videotitle
  );
  const associatedBanner = await fetchEndpointData(
    `/horizontal-banners/${matchingVideo.attributes.horizontal_banner.data.id}`
  );
  const otherVideos = allVideos.data.filter(
    (video: { id: number }) => video.id !== matchingVideo.id
  );

  return {
    props: {
      pageData: matchingVideo,
      associatedBanner: associatedBanner,
      otherVideos: otherVideos,
    },
  };
};

export default function VideoPage({
  pageData,
  associatedBanner,
  otherVideos,
}: {
  pageData: any;
  associatedBanner: any;
  otherVideos: any[];
}) {
  //the uri has the pattern of /videos/1, /videos/2, etc and we want to remove the /videos/ part
  const videoUri = pageData.attributes.uri.replace("/videos/", "");

  return (
    <>
      <Head>
        <title>{pageData.attributes.name}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>
      <div className="mx-auto mt-5 w-full max-w-md sm:max-w-xl md:max-w-4xl">
        <div className="flex flex-col justify-center bg-gray-100">
          <div className="m-6 aspect-video">
            <iframe
              src={`https://player.vimeo.com/video/${videoUri}`}
              width="640"
              height="360"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="left-0 top-0 h-full w-full"
            ></iframe>
          </div>
          <h2 className="mx-6 text-xl font-bold text-blue-primary">
            {pageData.attributes.name}
          </h2>
          <div className="m-5">
            <div
              dangerouslySetInnerHTML={{
                __html: pageData.attributes.description,
              }}
            />
          </div>
        </div>

        <div className="my-5 w-full">
          <Image
            src={
              associatedBanner.data.attributes.cover_image.data.attributes.url
            }
            alt="Want to increase your income?"
            width={1200}
            height={400}
            layout="responsive"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="text-sm italic">
          <span className="font-bold">Disclaimer: </span>
          All content on this channel is for education purposes only and does
          not constitute an investment recommendation or individual financial
          advice. For that, you should speak to a regulated, independent
          professional. The value of investments and the income from them can go
          down as well as up, so you may get back less than you invest. The
          views expressed on this channel may no longer be current. The
          information provided is not a personal recommendation for any
          particular investment. Tax treatment depends on individual
          circumstances and all tax rules may change in the future. If you are
          unsure about the suitability of an investment, you should speak to a
          regulated, independent professional.
        </div>

        <div className="my-5 flex flex-col justify-center bg-gray-100">
          <p className="m-4 mb-1 pb-2 pt-4 text-center text-3xl font-bold text-blue-primary">
            Watch More
          </p>
          <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary"></p>
          <div className="px-16">
            <Carousel className="">
              <CarouselContent>
                {otherVideos.map((page: any) => {
                  return (
                    <CarouselItem
                      key={page.id}
                      className="sm:basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <VideoCard page={page} />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious/>
              <CarouselNext/>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
