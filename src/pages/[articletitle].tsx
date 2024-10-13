import React from "react";
import Head from "next/head";
import Image from "next/image";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { Calendar, Clock } from "lucide-react";
import Disclaimer from "@/components/Disclaimer";
import NHSPensionChecklistForm from "@/components/NHSPensionChecklistForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ViewMoreCard } from "@/components/ViewMoreCard";
import { processDate } from "@/lib/dateUtils";
import { createSlug } from "./articles/[page]";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const getStaticPaths = async () => {
  const results: any = await fetchEndpointData(`/blog-posts`);
  return {
    paths: results.data.map((result: { attributes: { title: string } }) => ({
      params: { articletitle: createSlug(result.attributes.title) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const allArticles = await fetchEndpointData(`/blog-posts`);
  const matchingArticle = allArticles.data.find(
    (article: { attributes: { title: string } }) =>
      createSlug(article.attributes.title) === params.articletitle
  );
  const associatedHorizontalBannerId =
    matchingArticle.attributes.horizontal_banners &&
    matchingArticle.attributes.horizontal_banners.data.length > 0
      ? matchingArticle.attributes.horizontal_banners.data[0].id
      : 1;
  const associatedVerticalBannerId =
    matchingArticle.attributes.vertical_banners &&
    matchingArticle.attributes.vertical_banners.data.length > 0
      ? matchingArticle.attributes.vertical_banners.data[0].id
      : 1;
  const associatedHorizontalBanner = await fetchEndpointData(
    `/horizontal-banners/${associatedHorizontalBannerId}`
  );
  const associatedVerticalBanner = await fetchEndpointData(
    `/vertical-banners/${associatedVerticalBannerId}`
  );
  const otherArticles = allArticles.data.filter(
    (article: { id: number }) => article.id !== matchingArticle.id
  );
  return {
    props: {
      pageData: matchingArticle,
      associatedHorizontalBanner: associatedHorizontalBanner.data,
      associatedVerticalBanner: associatedVerticalBanner.data,
      otherArticles: otherArticles,
    },
  };
};

export default function ArticlePage({
  pageData,
  associatedHorizontalBanner,
  associatedVerticalBanner,
  otherArticles,
}: {
  pageData: any;
  associatedHorizontalBanner: any;
  associatedVerticalBanner: any;
  otherArticles: any;
}) {
  const { publishedDate, publishedTime } = processDate(
    pageData.attributes.publish_date
  );

  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>
      {/* <div className="w-full max-w-md sm:max-w-xl md:max-w-4xl mt-5 flex flex-col justify-center"> */}
      <div className="mx-auto mt-5 grid w-full max-w-md grid-cols-1 gap-4 sm:max-w-xl md:max-w-4xl md:grid-cols-2 p-5">
        <div className="col-span-1">
          <div className="text-center text-[30px] leading-9 font-bold text-blue-primary mb-5">
            {pageData.attributes.title}
          </div>
          <div className="flex justify-center space-x-2 text-center text-base text-blue-secondary p-[10px] mb-5">
            <Calendar size={14} />
            {publishedDate}
            <Clock size={14} />
            {publishedTime}
          </div>
          <Image
            src={pageData.attributes.cover.data.attributes.url}
            alt={pageData.attributes.title}
            width={1200}
            height={400}
            layout="responsive"
            className="h-auto w-full object-cover "
          />{" "}
          <div className="text-[18px] leading-7 py-5">{pageData.attributes.content_sections.map(
            (contentParagraph: any) => {
              return (
               <BlocksRenderer content={contentParagraph.content}/>
              );
            }
          )}</div>
          <Disclaimer contentType="article" />
          <div className="my-5 w-full">
            <Image
              src={
                associatedHorizontalBanner.attributes.cover_image.data
                  .attributes.url
              }
              alt="Want to increase your income?"
              width={1200}
              height={400}
              layout="responsive"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-start-2 ">
          <NHSPensionChecklistForm />
          <div className="my-5 hidden md:block">
            <Image
              src={
                associatedVerticalBanner.attributes.cover_image.data.attributes
                  .url
              }
              alt="Want to increase your income?"
              width={1200}
              height={400}
              layout="responsive"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div id="read more" className="mt-5 flex flex-col justify-center bg-gray-100">
        <p className="m-4 mb-1 pb-2 pt-4 text-center text-3xl font-bold text-blue-primary">
          Read More Articles
        </p>
        <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary"></p>
        <div className="px-16 pt-4 h-[625px]">
          <Carousel className="">
            <CarouselContent>
              {otherArticles.map((page: any) => {
                const viewMoreSlug = createSlug(page.attributes.title);
                return (
                  <CarouselItem
                    key={page.id}
                    className="sm:basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <ViewMoreCard
                      page={page}
                      contentType={"article"}
                      slug={viewMoreSlug}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
}
