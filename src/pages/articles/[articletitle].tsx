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
import { createSlug } from "../articles";

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
  //id might not be the right thing to look for? Horizontal/vertical might be different
  console.log("matchingArticle", matchingArticle);
  const associatedHorizontalBannerId =
    matchingArticle.attributes.horizontal_banners &&
    matchingArticle.attributes.horizontal_banners.data.length > 0
      ? matchingArticle.attributes.horizontal_banners.data[0].id
      : 1;
  const associatedHorizontalBanner = await fetchEndpointData(
    `/horizontal-banners/${associatedHorizontalBannerId}`
  );
  const associatedVerticalBanner = await fetchEndpointData(
    `/vertical-banners/${associatedHorizontalBannerId}`
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
  console.log("otherArticles", otherArticles);

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
      <div className="w-full max-w-md sm:max-w-xl md:max-w-4xl mt-5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="text-center text-blue-primary font-bold text-xl">
            {pageData.attributes.title}
          </div>
          <div className="text-center text-blue-secondary flex space-x-2 text-sm justify-center">
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
            className="w-full h-auto object-cover "
          />{" "}
          {pageData.attributes.content_sections[0].content.map(
            (contentParagraph: any) => {
              return (
                <div
                  key={contentParagraph.id}
                  dangerouslySetInnerHTML={{
                    __html: contentParagraph.children[0].text,
                  }}
                />
              );
            }
          )}
          <Disclaimer contentType="article" />
          <div className="w-full my-5">
            <Image
              src={
                associatedHorizontalBanner.attributes.cover_image.data
                  .attributes.url
              }
              alt="Want to increase your income?"
              width={1200}
              height={400}
              layout="responsive"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="md:col-start-2">
          <div className="w-full my-5 hidden md:block">
            <Image
              src={
                associatedVerticalBanner.attributes.cover_image.data.attributes
                  .url
              }
              alt="Want to increase your income?"
              width={1200}
              height={400}
              layout="responsive"
              className="w-full h-auto object-cover"
            />
          </div>
          <NHSPensionChecklistForm />
        </div>
      </div>
      <div className="bg-gray-100 flex flex-col justify-center my-5">
        <p className="text-blue-primary text-3xl font-bold m-4 mb-1 pt-4 pb-2 text-center">
          Read More Articles
        </p>
        <p className="border-blue-secondary border-solid border-t-[3px] flex self-center w-1/2"></p>
        <div className="px-16 pt-4">
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
