import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type CourseData = {
  hero_title: string;
  hero_subtext: string;
  hero_description: string;
  testimonials_title: string;
  cta_text: string;
  cta_navigation_url: string;
  hero_cover: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  worse_off: {
    title: string;
    subtext: string;
    sales_cards: {
      reason: string;
      image: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    }[];
  };
  sales_carousel: {
    id: number;
    description: {
      type: string;
      children: {
        text: string;
        type: string;
        bold?: boolean;
      }[];
      cover: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    }[];
  }[];
  freedom: {
    title: string;
    description: any;
  };
  help_for_you: {
    title: string;
    subtext: string;
    sales_cards: {
      reason: string;
      image: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    }[];
  };
  testimonials: {
    data: {
      id: number;
      attributes: {
        title: string;
        review: {
          type: string;
          children: {
            text: string;
            type: string;
          }[];
        }[];
      };
    }[];
  };
};

export const getStaticProps = async () => {
  const populateFields = [
    "worse_off",
    "worse_off.sales_cards",
    "worse_off.sales_cards.image",
    "sales_carousel",
    "sales_carousel.cover",
    "freedom",
    "help_for_you",
    "help_for_you.sales_cards",
    "help_for_you.sales_cards.image",
    "testimonials",
    "testimonials.author_thumbnail",
    "hero_cover",
  ];

  const pageData = await fetchEndpointData(
    `/page-course-cash-flow-for-dentists`,
    populateFields
  );

  return {
    props: {
      courseData: pageData.data.attributes,
    },
  };
};

type CashflowCoursePageProps = {
  courseData: CourseData;
};

export default function CashflowCoursePage({
  courseData,
}: CashflowCoursePageProps) {
  return (
    <>
      {/* <Head>
        <title>{courseData.hero_title}</title>
        <meta name="description" content={courseData.hero_description} />
      </Head> */}
      <section id="topbanner">
        <div className="relative h-[509px] w-screen overflow-hidden md:h-[396px] lg:h-[504.75px]">
          <Image
            src={courseData.hero_cover.data.attributes.url}
            alt={courseData.hero_title}
            layout="fill"
            objectFit="cover"
            className="inset-0 object-[90%_60%] lg:object-[right_40%] xl:object-[right_30%] xxl:object-[right_25%]"
            />
          <div className="absolute inset-0 z-10 bg-blue-primary opacity-80 md:opacity-65 lg:hidden"></div>

          <div className="relative z-10 flex size-full flex-col items-center justify-center pt-4 text-center md:w-[65%] md:max-w-screen-lg md:items-start md:justify-center md:px-[30px] md:text-left lg:ml-[40px] lg:mr-auto lg:max-w-[1200px] xl:mx-auto">
            <div className="absolute space-y-6 px-8 md:px-3 xl:w-3/5 xl:px-0">
              <h1 className="mx-4 mb-4 text-base font-semibold text-orange-400 md:mx-0 md:w-4/5 md:text-lg lg:text-[25px] xl:mb-5">
                {courseData.hero_subtext}
              </h1>
              <p className="text-[40px] font-bold leading-[48px] text-white md:text-[35px] lg:text-[45px]">
                {courseData.hero_title}
              </p>
              <p className="text-lg text-blue-light md:text-base lg:w-4/5 lg:text-xl">
                {courseData.hero_description}
              </p>
              <Link href={courseData.cta_navigation_url} className="">
                <Button className="mt-8 rounded-md bg-orange-400 px-8 py-6 text-white hover:text-blue-primary md:px-[55px] ">
                  {courseData.cta_text}
                </Button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="worseoff" className="bg-gray-100">
        <div className="flex flex-col items-center space-y-8 px-4 pt-[40px] text-center text-lg">
          <span className="text-3xl font-bold text-blue-primary">
            {courseData.worse_off.title}
          </span>
          <span className="text-blue-secondary">
            {courseData.worse_off.subtext}
          </span>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {courseData.worse_off.sales_cards.map(
              (card: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-4 rounded-2xl bg-white px-12 py-8 shadow-custom-br"
                  >
                    <Image
                      src={card.image.data.attributes.url}
                      alt="Sales card image"
                      width={200}
                      height={200}
                    />
                    <span className="text-[30px] font-bold text-blue-primary">
                      {card.reason}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>
      <section id="salescarousel" className="bg-gray-100 ">
        <div className="flex flex-col items-center space-y-8 pb-8 ">
          {courseData.sales_carousel.map((paragraph: any, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`mx-[30px] mb-2 mt-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-center lg:mx-auto lg:max-w-[1140px] ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <Image
                  src={paragraph.cover.data.attributes.url}
                  alt={paragraph.cover.data.attributes.name}
                  width={315}
                  height={209}
                  className="size-full rounded-[30px] object-cover md:w-1/2 md:p-[10px]"
                />

                <div className="flex flex-col space-y-4 text-justify md:w-1/2 md:p-[10px]">
                  <BlocksRenderer content={paragraph.description} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section id="freedom">
        <div className="flex flex-col space-y-8 p-8 text-center lg:mx-auto lg:max-w-[1140px] lg:py-[70px] lg:text-xl">
          <span className="text-3xl font-bold text-blue-primary lg:text-[45px] lg:leading-[54px]">
            {courseData.freedom.title}
          </span>
          <BlocksRenderer content={courseData.freedom.description} />
        </div>
      </section>

      <section id="helpforyou" className="bg-[#dbe2e9]">
        <div className="flex flex-col space-y-8 p-[30px] text-center lg:mx-auto lg:max-w-[1140px]">
          <span className="text-3xl font-bold text-blue-primary lg:text-[45px] lg:leading-[54px]">
            {courseData.help_for_you.title}
          </span>
          <span className="text-xl">{courseData.help_for_you.subtext}</span>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {courseData.help_for_you.sales_cards.map(
              (card: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="m-2 flex flex-col items-center space-y-4 rounded-3xl bg-white p-[30px] shadow-custom-br lg:px-[10px]"
                  >
                    <Image
                      src={card.image.data.attributes.url}
                      alt="Sales card image"
                      width={200}
                      height={200}
                    />
                    <span className="mx-4 text-[25px] font-bold text-blue-primary ">
                      {card.reason}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      <section id="reviews">
        <p className="space-y-2 px-[30px] pt-[45px] text-center text-3xl font-bold  text-blue-primary md:py-[50px] lg:text-[45px]">
          {courseData.testimonials_title}
        </p>
        <div className="grid grid-cols-1 px-2 md:auto-rows-auto md:grid-cols-2 md:px-[50px] lg:grid-cols-3 xl:mx-[120px] xl:max-w-[1200xp] xl:px-0">
          {courseData.testimonials.data.map(
            (testimonial: any, index: number) => {
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
      <div className="flex flex-col items-center space-y-8 p-8 pb-[60px]">
        <Link
          href={courseData.cta_navigation_url}
          className="rounded-md bg-orange-400 px-8 py-4 text-3xl font-semibold text-white hover:bg-orange-500 lg:px-12 lg:py-6 lg:text-[45px]"
        >
          {courseData.cta_text}
        </Link>
      </div>
    </>
  );
}
