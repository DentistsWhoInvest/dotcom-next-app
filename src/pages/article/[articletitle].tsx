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
import { Article, ArticleAttributes, createSlug } from "../articles/[page]";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import fs from "fs";
import path from "path";
import Link from "next/link";

const fetchAllItems = async (url: string) => {
  let allItems: any[] = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const populateFields = [
        "horizontal_banners",
        "vertical_banners",
        "horizontal_banners.cover_image",
        "vertical_banners.cover_image",
        "cover",
        "content_sections"
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
  const filePath = path.join(process.cwd(), "public", "articlepages.json");

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

export const getStaticPaths = async () => {
  const fetchedArticles: any = await fetchAllItems(`/blog-posts`);

  await writeToLocal(fetchedArticles);

  const filePath = path.join(process.cwd(), "public", "articlepages.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  return {
    paths: parsedData.map((result: { attributes: { title: string } }) => ({
      params: { articletitle: createSlug(result.attributes.title) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  // const allArticles = await fetchEndpointData(`/blog-posts`);
  const filePath = path.join(process.cwd(), "public", "articlepages.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const allArticles = JSON.parse(jsonData);

  const matchingArticle = allArticles.find(
    (article: { attributes: { title: string } }) =>
      createSlug(article.attributes.title) === params.articletitle
  );
  // const associatedHorizontalBannerId =
  //   matchingArticle.attributes.horizontal_banners &&
  //   matchingArticle.attributes.horizontal_banners.data.length > 0
  //     ? matchingArticle.attributes.horizontal_banners.data[0].id
  //     : 1;
  // const associatedVerticalBannerId =
  //   matchingArticle.attributes.vertical_banners &&
  //   matchingArticle.attributes.vertical_banners.data.length > 0
  //     ? matchingArticle.attributes.vertical_banners.data[0].id
  //     : 1;
  // const associatedHorizontalBanner = await fetchEndpointData(
  //   `/horizontal-banners/${associatedHorizontalBannerId}`
  // );
  // const associatedVerticalBanner = await fetchEndpointData(
  //   `/vertical-banners/${associatedVerticalBannerId}`
  // );
  const otherArticles = allArticles.filter(
    (article: { id: number }) => article.id !== matchingArticle.id
  );
  return {
    props: {
      pageData: matchingArticle,
      // associatedHorizontalBanner: associatedHorizontalBanner.data,
      // associatedVerticalBanner: associatedVerticalBanner.data,
      otherArticles: otherArticles,
    },
  };
};

export default function ArticlePage({
  pageData,
  // associatedHorizontalBanner,
  // associatedVerticalBanner,
  otherArticles,
}: {
  pageData: Article;
  // associatedHorizontalBanner: any;
  // associatedVerticalBanner: any;
  otherArticles: any;
}) {
  const { publishedDate, publishedTime } = processDate(
    pageData.attributes.publish_date
  );

  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="title" content={pageData.attributes.title} />
      </Head>
      <div className="mx-auto mt-5 grid w-full max-w-md grid-cols-1 p-5 sm:max-w-xl md:max-w-[1140px] md:grid-cols-3 md:gap-8 xl:my-5 xl:gap-16">
        <div className="md:col-span-2">
          <div className="mb-5 text-center text-[30px] font-bold leading-9 text-blue-primary md:text-[45px] md:leading-[54px]">
            {pageData.attributes.title}
          </div>
          <div className="mb-5 flex items-center justify-center space-x-2 p-[10px] text-center text-base text-blue-secondary">
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
            className="h-auto w-full object-cover md:h-[273px] md:w-[485px]"
          />
          <div className="articleContent py-5 text-[18px] leading-7 md:text-xl">
            {pageData.attributes.content_sections.map((contentParagraph) => {
              return (
                <BlocksRenderer
                  content={contentParagraph.content}
                  key={contentParagraph.id}
                />
              );
            })}
          </div>
          <Disclaimer contentType="article" />
          <div className="my-5 w-full">
            <Link
              href={
                pageData.attributes.horizontal_banners.data[0].attributes.navigation_url
              }
            >
              <Image
                src={
                  pageData.attributes.horizontal_banners.data[0].attributes
                    .cover_image.data.attributes.url
                }
                alt="Want to increase your income?"
                width={1200}
                height={400}
                layout="responsive"
                className="h-auto w-full object-cover"
              />
            </Link>
          </div>
        </div>
        <div className="md:col-span-1 md:w-[233px] lg:w-[318px] xl:w-[330px]">
          <NHSPensionChecklistForm />
          <div className="my-5 hidden md:block">
            <Link
              href={
                pageData.attributes.vertical_banners.data[0].attributes.navigation_url
              }
            >
              <Image
                src={
                  pageData.attributes.vertical_banners.data[0].attributes
                    .cover_image.data.attributes.url
                }
                alt="Want to increase your income?"
                width={233}
                height={598}
                className="h-[598px] w-[233px] object-cover lg:h-[817px] lg:w-[318px] xl:h-[848px] xl:w-[330px]"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center justify-center bg-gray-100 ">
      <p className="m-4 mb-1 pb-2 pt-4 text-center text-3xl font-bold text-blue-primary">
          Read More
        </p>
        <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary"></p>
        <div className="relative">
        <Carousel id="carousel" className="max-w-[375px] items-center md:max-w-[740px] lg:max-w-[1000px] xl:max-w-[1340px]">
        <CarouselContent className="-ml-4 mb-12" id="carouselcontent">
        {otherArticles.map((page: any) => {
                const viewMoreSlug = createSlug(page.attributes.title);

                return (
                  <CarouselItem
                    key={page.id}
                    className="flex justify-center md:basis-1/2 xl:basis-1/3 "
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
