import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { createSlug } from "../articles/[page]";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Video } from "../video/[page]";
import Disclaimer from "@/components/Disclaimer";
import Link from "next/link";
import { ViewMoreCard } from "@/components/ViewMoreCard";
import fs from "fs";
import path from "path";

const fetchAllItems = async (url: string) => {
  let allItems: any[] = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const populateFields = [
        "horizontal_banner",
        "horizontal_banner.cover_image",
        "cpd_course",
      ];
      const response = await fetchEndpointData(url, populateFields, true, {
        page: page,
        pageSize: pageSize,
      });
      const meta = response.meta;
      allItems = allItems.concat(response.data);
      hasMore = page < meta.pagination.pageCount;
      page++;
    } catch (error) {
      console.error("Error fetching items:", error);
      hasMore = false;
    }
  }
  return allItems;
};

function writeToLocal(result: any[]) {
  const filePath = path.join(process.cwd(), "public", "videos.json");

  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(result), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function getStaticPaths() {
  const fetchedVideos = await fetchAllItems("/videos");

  await writeToLocal(fetchedVideos);

  const filePath = path.join(process.cwd(), "public", "videos.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  return {
    paths: parsedData.map((result: { attributes: { name: string } }) => ({
      params: { videotitle: createSlug(result.attributes.name) },
    })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: any) => {
  const filePath = path.join(process.cwd(), "public", "videos.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const allVideos = JSON.parse(jsonData);
  const matchingVideo = allVideos.find(
    (video: { attributes: { name: string } }) =>
      createSlug(video.attributes.name) === params.videotitle
  );
  const otherVideos = allVideos
    .filter((video: { id: number }) => video.id !== matchingVideo.id)
    .slice(0, 6);

  return {
    props: {
      pageData: matchingVideo,
      otherVideos: otherVideos,
    },
  };
};

export default function VideoPage({
  pageData,
  otherVideos,
}: {
  pageData: Video;
  otherVideos: any[];
}) {
  //the uri has the pattern of /videos/1, /videos/2, etc and we want to remove the /videos/ part
  const videoUri = pageData.attributes.uri.replace("/videos/", "");
  const showCPDQuiz = !!pageData.attributes.cpd_course.data;

  return (
    <>
      <Head>
        <title>{pageData.attributes.name}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>
      <div className="mx-4 my-2 max-w-[1140px] items-center md:mx-[50px] lg:mx-auto xl:pt-8">
        <div className="flex flex-col justify-center bg-gray-100">
          <div className="aspect-video">
            <iframe
              src={`https://player.vimeo.com/video/${videoUri}`}
              width="1920"
              height="1080"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="left-0 top-0 size-full p-2.5"
            ></iframe>
          </div>
          {showCPDQuiz && (
            <Link
              href={`/cpd/${pageData.attributes.cpd_course.data.id}/aims`}
              className="place-self-center"
            >
              <button className="m-2 rounded-md bg-orange-600 px-6 py-3 text-white transition duration-200 ease-in-out hover:scale-105">
                TAKE THE CPD/CE QUIZ
              </button>
            </Link>
          )}
          <h2 className="mx-6 mt-6 text-xl font-bold text-blue-primary md:text-3xl">
            {pageData.attributes.name}
          </h2>
          <div className="m-5 mb-7 md:text-lg xl:text-xl">
            <div
              dangerouslySetInnerHTML={{
                __html: pageData.attributes.description,
              }}
            />
          </div>
        </div>

        {pageData.attributes.horizontal_banner.data && (
          <div className="my-5">
            <Link
              href={
                pageData.attributes.horizontal_banner.data.attributes
                  .navigation_url
              }
            >
              <Image
                src={
                  pageData.attributes.horizontal_banner.data.attributes
                    .cover_image.data.attributes.url
                }
                alt={
                  pageData.attributes.horizontal_banner.data.attributes.title
                }
                width={1200}
                height={400}
                layout="responsive"
                className="h-auto"
              />
            </Link>
          </div>
        )}

        <div className="my-8 xl:mb-16">
          <Disclaimer />
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center justify-center bg-gray-100 ">
        <p className="m-4 mb-1 pb-2 pt-4 text-center text-3xl font-bold text-blue-primary">
          Watch More
        </p>
        <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary"></p>
        <div className="relative">
          <Carousel
            id="carousel"
            className="max-w-[375px] items-center md:max-w-[740px] lg:max-w-[1000px] xl:max-w-[1340px]"
          >
            <CarouselContent className="-ml-4 mb-12" id="carouselcontent">
              {otherVideos.map((page: any) => {
                const viewMoreSlug = createSlug(page.attributes.name);
                return (
                  <CarouselItem
                    key={page.id}
                    className="flex justify-center md:basis-1/2 xl:basis-1/3 "
                    id="carouselitem"
                  >
                    <ViewMoreCard
                      page={page}
                      contentType={"video"}
                      slug={viewMoreSlug}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="absolute inset-x-0 bottom-2 flex justify-center space-x-2 ">
              <CarouselPrevious className="relative !-left-0" />
              <CarouselNext className="relative !-right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
}
