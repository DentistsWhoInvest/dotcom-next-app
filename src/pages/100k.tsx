import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type TextNode = {
  text: string;
  type: string;
  bold?: boolean;
  italic?: boolean;
};

type Paragraph = {
  type: "paragraph";
  children: TextNode[];
};

type Review = Paragraph[];

type TestimonialAttributes = {
  title: string;
  review: Review;
  author: string;
  author_job_location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author_thumbnail: {
    data: {
      id: number;
      attributes: ImageAttributes;
    };
  };
};

type TestimonialData = {
  id: number;
  attributes: TestimonialAttributes;
};

type Testimonials = {
  data: TestimonialData[];
};

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
};

type ImageData = {
  id: number;
  attributes: ImageAttributes;
};

type HeroCover = {
  data: ImageData;
};

type SalesPitch = {
  id: number;
  message: any;
  background_colour: string | null;
  image_placement: string | null;
  cover: { data: ImageData | null };
};

type HundredKPageAttributes = {
  hero_title: string;
  hero_cta_text: string;
  cta_navigation_url: string;
  investment_and_return_title: string;
  what_would_extra_100k_mean_to_you: any;
  final_sales_pitch: any;
  createdAt: string;
  updatedAt: string;
  testimonials: Testimonials;
  hero_cover: HeroCover;
  sales_pitches: SalesPitch[];
};

type HundredKPage = {
  id: number;
  attributes: HundredKPageAttributes;
};

export const getStaticProps = async () => {
  const populateFields = [
    "testimonials",
    "testimonials.author_thumbnail",
    "hero_cover",
    "final_sales_pitch",
    "what_would_extra_100k_mean_to_you",
    "sales_pitches",
    "sales_pitches.cover",
  ];

  const pageData = await fetchEndpointData(
    `/page-add-100k-turnover`,
    populateFields
  );

  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function HundredKPage({ pageData }: { pageData: HundredKPage }) {
  console.log("pageData", pageData);
  console.log("pageData.hero_cover", pageData.attributes.hero_cover);
  console.log("pageData.hero_cover.data", pageData.attributes.hero_cover.data);
  return (
    <>
      <Head>
        <title>{pageData.attributes.hero_title}</title>
        <meta name="description" />
      </Head>
      <div>
        <section id="topbanner">
          <div className="relative h-[430px] w-full overflow-hidden md:h-[409px] xl:h-[570.75px]">
            <div className="absolute inset-0 xl:hidden">
              <Image
                src={pageData.attributes.hero_cover.data.attributes.url}
                alt={"mobile"}
                layout="fill"
                objectFit="cover"
                objectPosition="right 50%"
                priority
              />
              <div className="absolute inset-0 bg-blue-primary opacity-70"></div>
            </div>
            <div className="absolute inset-0 hidden xl:block">
              {" "}
              <Image
                className="object-cover"
                src={pageData.attributes.hero_cover.data.attributes.url}
                alt={"desktop"}
                layout="fill"
                objectFit="cover"
                objectPosition=""
                priority
              />
            </div>
            <div className="relative z-10 flex size-full flex-col items-center justify-center text-center md:max-w-[62%] md:items-start md:justify-center md:text-left lg:max-w-[50%] xl:mx-[130px] xl:max-w-[1140px]">
              <div className="absolute px-4 md:px-[30px]">
                <h1 className="mb-4 text-3xl font-bold text-white md:text-[35px] xl:mb-5 xl:text-[45px]">
                  {pageData.attributes.hero_title}
                </h1>

                <Button className="mt-8 rounded-md bg-orange-400 text-white hover:text-blue-primary ">
                  <Link href={pageData.attributes.cta_navigation_url}>
                    {" "}
                    {pageData.attributes.hero_cta_text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="worseoff" className="">
          <div className="flex flex-col items-center space-y-8 p-8 text-left">
            <div
              id="maintext"
              className="show-bullet custom-bullet-question space-y-4 text-lg text-grey-primary"
            >
              {pageData.attributes.sales_pitches.map(
                (sales_pitch: SalesPitch) => {
                  console.log("sales_pitch", sales_pitch);
                  return (
                    <>
                      {/* adjust image position, including background */}
                      {sales_pitch.cover.data && (
                        <Image
                          src={sales_pitch.cover.data.attributes.url}
                          alt={"todo: add alt text for sales pitch cover image"}
                          width={1200}
                          height={400}
                          objectFit="cover"
                          className="rounded-3xl"
                        />
                      )}
                      <BlocksRenderer content={sales_pitch.message} />
                    </>
                  );
                }
              )}
            </div>
          </div>
        </section>

        <section id="freedom">
          <div className="flex flex-col text-center space-y-8 p-8">
            <span className="text-3xl font-bold text-blue-primary">todo: for the investment of...</span>
            {/* <BlocksRenderer content={pageData.freedom.description} /> */}
          </div>
        </section>

        <section id="reviews">
          <div className="flex flex-col space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            {pageData.attributes.testimonials.data.map(
              (testimonial: TestimonialData, index: number) => {
                console.log("testimonial", testimonial);
                return (
                  <div
                    key={testimonial.id}
                    className={`${
                      index === 2 ? "md:col-span-2 md:w-full" : "md:w-full "
                    }`}
                  >
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                      index={index}
                    />
                  </div>
                );
              }
            )}
          </div>
        </section>
        <div className="flex flex-col items-center space-y-8 p-8">
          <div className="text-left">
            <BlocksRenderer content={pageData.attributes.final_sales_pitch} />
          </div>
          <Link
            href={pageData.attributes.cta_navigation_url}
            className="rounded-md bg-orange-400 bold text-white hover:bg-orange-500 px-8 py-4 text-3xl"
          >
            {pageData.attributes.hero_cta_text}
          </Link>
        </div>
      </div>
    </>
  );
}
