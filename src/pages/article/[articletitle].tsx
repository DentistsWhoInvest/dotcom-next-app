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
import { Article, ArticleAttributes, createSlug } from "./articles/[page]";
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
  pageData: Article;
  associatedHorizontalBanner: any;
  associatedVerticalBanner: any;
  otherArticles: any;
}) {
  const { publishedDate, publishedTime } = processDate(
    pageData.attributes.publish_date
  );
  console.log("pageData", pageData);
  console.log("associatedHorizontalBanner", associatedHorizontalBanner);
  console.log("associatedVerticalBanner", associatedVerticalBanner);
  

  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="title" content={pageData.attributes.title} />
      </Head>
      <div className="mx-auto mt-5 grid w-full max-w-md grid-cols-1 gap-4 sm:max-w-xl md:max-w-[1140px] md:grid-cols-3 p-5 md:gap-2 xl:my-5">
        <div className="col-span-2">
          <div className="text-center text-[30px] leading-9 font-bold text-blue-primary mb-5 md:text-[45px] md:leading-[54px]">
            {pageData.attributes.title}
          </div>
          <div className="flex justify-center space-x-2 text-center text-base text-blue-secondary p-[10px] mb-5 items-center">
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
            className="h-auto w-full object-cover md:w-[485px] md:h-[273px]"
          />{" "}
          <div className="text-[18px] leading-7 py-5 md:text-xl">
            {/* {pageData.attributes.content_sections.map(
              (contentParagraph) => {
                return <BlocksRenderer content={contentParagraph.content} key={contentParagraph.id} />;
              }
            )} */}
          </div>
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
        <div className="md:col-span-1 w-[233px] lg:w-[318px] xl:w-[330px]">
          <NHSPensionChecklistForm />
          <div className="my-5 hidden md:block">
            <Image
              src={
                associatedVerticalBanner.attributes.cover_image.data.attributes
                  .url
              }
              alt="Want to increase your income?"
              width={233}
              height={598}
              className="h-[598px] w-[233px] object-cover lg:h-[817px] lg:w-[318px] xl:h-[848px] xl:w-[330px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-center bg-gray-100">
        <p className="m-4 mb-1 pb-2 pt-4 text-center text-3xl font-bold text-blue-primary">
          Read More
        </p>
        <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary"></p>
        <div className="relative">
          <Carousel>
            <CarouselContent className="mb-12">
              {otherArticles.map((page: any) => {
                const viewMoreSlug = createSlug(page.attributes.title);

                return (
                  <CarouselItem
                    key={page.id}
                    className="sm:basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
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
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 ">
              <CarouselPrevious className="relative !-left-0" />
              <CarouselNext className="relative !-right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
}
