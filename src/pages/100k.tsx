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

type SalesCard = {
  id: number;
  reason: string;
  image: { data: ImageData };
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
  sales_cards: SalesCard[];
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
    "sales_cards",
    "sales_cards.image",
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
  function splitInvestmentAndReturnTitle(investmentTitle: string) {
    const maybeAmountInTitle = investmentTitle.match(/£[\d,]+/);
    if (maybeAmountInTitle) {
      const investmentTitleAmount = maybeAmountInTitle[0];
      const investmentTitlePreAmount = investmentTitle.split(
        investmentTitleAmount
      )[0];
      const investmentTitlePostAmount = investmentTitle.split(
        investmentTitleAmount
      )[1];

      return {
        investmentTitleAmount,
        investmentTitlePreAmount,
        investmentTitlePostAmount,
      };
    }
  }

  const splitInvestmentTitle = splitInvestmentAndReturnTitle(
    pageData.attributes.investment_and_return_title
  );

  return (
    <>
      <Head>
        <title>{pageData.attributes.hero_title}</title>
        <meta name="description" />
      </Head>
      <div>
        <section id="topbanner">
          <div className="relative h-[572px] w-full overflow-hidden md:h-[434px] xl:h-[570.75px]">
            <div className="absolute inset-0 md:hidden">
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
            <div className="absolute inset-0 hidden md:block">
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
            <div className="relative z-10 flex size-full flex-col items-center justify-center text-center md:max-w-[62%] md:items-start md:justify-center md:text-left lg:max-w-[50%] xl:mx-[130px] xl:max-w-[38%]">
              <div className="absolute px-4 md:px-[30px]">
                <h1 className="mb-4 text-3xl font-bold text-white md:text-[35px] md:leading-[42px] xl:mb-5 xl:text-[45px]">
                  {pageData.attributes.hero_title}
                </h1>

                <Button className="mt-8 rounded-md bg-[#F58F1D] text-white hover:text-blue-primary md:px-12 md:py-7">
                  <Link href={pageData.attributes.cta_navigation_url}>
                    {" "}
                    {pageData.attributes.hero_cta_text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="sales_pitches" className="">
          <div className="flex flex-col items-center text-left">
            <div
              id="maintext"
              className="show-bullet custom-bullet-question text-lg text-grey-primary md:text-xl"
            >
              {pageData.attributes.sales_pitches.map(
                (sales_pitch: SalesPitch) => {
                  return (
                    <>
                      {sales_pitch.image_placement === "background" &&
                        sales_pitch.cover.data && (
                          <>
                            <div className="relative" key={sales_pitch.id}>
                              <div className="absolute inset-0">
                                <Image
                                  src={sales_pitch.cover.data.attributes.url}
                                  alt={sales_pitch.cover.data.attributes.name}
                                  layout="fill"
                                  objectFit="cover"
                                  objectPosition=""
                                />
                                <div className="absolute inset-0 bg-blue-primary opacity-70"></div>
                              </div>
                              <div className="relative z-10 space-y-4 p-6 text-white md:p-[50px] xl:mx-auto xl:max-w-[1140px] xl:px-0">
                                <BlocksRenderer content={sales_pitch.message} />
                              </div>
                            </div>
                          </>
                        )}

                      <div
                        style={
                          {
                            "--dynamic-bg-color": sales_pitch.background_colour,
                          } as React.CSSProperties
                        }
                        className="space-y-4 bg-dynamicBg xl:w-screen"
                        key={sales_pitch.id}
                      >
                        <div className=" p-6 md:p-[25px] lg:px-[50px] lg:py-[25px] xl:mx-auto xl:max-w-[1140px] xl:px-0">
                          {sales_pitch.image_placement !== "background" && (
                            <div
                              className={` grid space-y-4 md:space-y-0 ${
                                sales_pitch.cover.data
                                  ? "grid-cols-1 md:grid-cols-2 md:gap-8"
                                  : "grid-cols-1"
                              }`}
                            >
                              {sales_pitch.cover.data && (
                                <Image
                                  src={sales_pitch.cover.data.attributes.url}
                                  alt={sales_pitch.cover.data.attributes.name}
                                  width={1200}
                                  height={400}
                                  objectFit="cover"
                                  className={`rounded-3xl ${
                                    sales_pitch.image_placement === "right"
                                      ? "md:order-2"
                                      : "md:order-1"
                                  }`}
                                />
                              )}
                              <div
                                className={`space-y-4 md:flex md:flex-col xl:mx-auto xl:max-w-[1140px] ${
                                  sales_pitch.image_placement === "right"
                                    ? "md:order-1"
                                    : "md:order-2"
                                }`}
                              >
                                <BlocksRenderer content={sales_pitch.message} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  );
                }
              )}
            </div>
          </div>
        </section>

        <section id="investment-return" className="pt-[30px] lg:pb-[30px]">
          <div className="text-center text-[35px] font-bold leading-[42px]">
            <span className=" text-orange-400">
              {splitInvestmentTitle?.investmentTitlePreAmount}
            </span>
            <span
              id="wrapper"
              className="relative inline-block overflow-visible"
            >
              <span className=" text-blue-primary">
                {splitInvestmentTitle?.investmentTitleAmount}
              </span>
              <svg
                className="absolute left-1/2 top-1/2 z-[2] size-[calc(100%+20px)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
              >
                <path
                  d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"
                  stroke="red"
                  stroke-width="9"
                  fill="none"
                  // eslint-disable-next-line tailwindcss/no-custom-classname
                  className="path-1"
                ></path>
              </svg>
              <style jsx>{`
                @keyframes draw {
                  0% {
                    stroke-dasharray: 0, 1500; /* Start with no visible stroke */
                    opacity: 0;
                  }
                  10% {
                    stroke-dasharray: 0, 1500; /* Start with no visible stroke */
                    opacity: 1;
                  }
                  30% {
                    stroke-dasharray: 1500, 0; /* Complete visible stroke */
                    opacity: 1;
                  }
                  80% {
                    stroke-dasharray: 1500, 0; /* Keep the stroke */
                    opacity: 1;
                  }
                  100% {
                    opacity: 0;
                  }
                }

                .path-1 {
                  animation: draw 5s forwards; /* Animate drawing and fading */
                  animation-iteration-count: infinite;
                }
              `}</style>
            </span>
            <span className=" text-orange-400">
              {splitInvestmentTitle?.investmentTitlePostAmount}
            </span>
          </div>
        </section>

        <section id="sales-cards">
          <div className="grid grid-cols-1 gap-4 space-y-4 px-[50px] md:grid-cols-2 md:space-y-0 xl:mx-auto xl:max-w-[1140px] xl:grid-cols-5 xl:px-0 ">
            {pageData.attributes.sales_cards.map(
              (salesCard: SalesCard, index: number) => {
                return (
                  <div
                    className={`flex flex-col items-center space-y-4 ${
                      index === 4
                        ? "md:col-span-2 xl:col-span-1"
                        : "md:col-span-1"
                    }`}
                    key={salesCard.id}
                  >
                    <div className="flex grow flex-col items-center rounded-3xl bg-blue-secondary px-[5px] pb-5 pt-[50px]">
                      <Image
                        src={salesCard.image.data.attributes.url}
                        alt={salesCard.image.data.attributes.name}
                        width={90}
                        height={90}
                      />
                      <h2 className="mt-5 text-center text-sm font-[500] text-white md:px-4 md:py-2 xl:px-1 ">
                        {salesCard.reason}
                      </h2>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        <section id="what-would-extra-100k-mean-to-you">
          <div className="space-y-4 p-6 text-lg md:px-[50px] md:pb-[50px] xl:mx-auto xl:max-w-[1140px] xl:px-0">
            <BlocksRenderer
              content={pageData.attributes.what_would_extra_100k_mean_to_you}
            />
          </div>
        </section>

        <section id="reviews">
          <div className="grid grid-cols-1 md:auto-rows-auto md:grid-cols-2 md:px-[50px] xl:mx-[120px] xl:max-w-[1200xp] xl:grid-cols-3 xl:px-0">
            {pageData.attributes.testimonials.data.map(
              (testimonial: TestimonialData, index: number) => {
                return (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                  />
                );
              }
            )}
          </div>
        </section>
        <div className="flex flex-col items-center space-y-8 p-8 lg:p-[50px]">
          <div className="space-y-4 text-left text-lg lg:text-xl">
            <BlocksRenderer content={pageData.attributes.final_sales_pitch} />
          </div>
          <Link
            href={pageData.attributes.cta_navigation_url}
            className="rounded-md bg-orange-400 px-8 py-4 text-xl text-white hover:bg-orange-500"
          >
            {pageData.attributes.hero_cta_text}
          </Link>
        </div>
      </div>
    </>
  );
}
