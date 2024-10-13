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
        <div className="relative h-[430px] w-full overflow-hidden md:h-[409px] xl:h-[570.75px]">
          <div className="absolute inset-0 xl:hidden">
            <Image
              src={courseData.hero_cover.data.attributes.url}
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
              src={courseData.hero_cover.data.attributes.url}
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
                {courseData.hero_subtext}
              </h1>
              <p className="text-[18px] leading-[21.6px] text-blue-light xl:text-xl">
                {courseData.hero_title}
              </p>
              <p className="text-blue-light">{courseData.hero_description}</p>
              <Button className="mt-8 rounded-md bg-orange-400 text-white hover:text-blue-primary ">
                <Link href={courseData.cta_navigation_url}>
                  {" "}
                  {courseData.cta_text}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="worseoff" className="bg-gray-100">
        <div className="flex flex-col items-center space-y-8 p-8 text-center">
          <span className="text-3xl font-bold text-blue-primary ">
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
                    className="flex flex-col items-center space-y-4 rounded-2xl bg-white p-8 shadow-custom-br"
                  >
                    <Image
                      src={card.image.data.attributes.url}
                      alt="Sales card image"
                      width={200}
                      height={200}
                    />
                    <span className="text-lg font-bold text-blue-primary">
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
                className={`m-8 flex flex-col gap-8 md:flex-row ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <Image
                  src={paragraph.cover.data.attributes.url}
                  alt="Sales card image"
                  width={315}
                  height={209}
                  className="rounded-2xl object-cover"
                />

                <div className="flex flex-col space-y-4">
                  <BlocksRenderer content={paragraph.description} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section id="freedom">
        <div className="flex flex-col text-center space-y-8 p-8">
          <span className="text-3xl font-bold text-blue-primary">
            {courseData.freedom.title}
          </span>
          <BlocksRenderer content={courseData.freedom.description} />
        </div>
      </section>

      <section id="helpforyou" className="bg-[#dbe2e9]">
        <div className="flex flex-col space-y-8 p-8 text-center">
          <span className="text-3xl font-bold text-blue-primary">
            {courseData.help_for_you.title}
          </span>
          <span className="text-xl">{courseData.help_for_you.subtext}</span>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {courseData.help_for_you.sales_cards.map(
              (card: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-4 rounded-2xl bg-white p-8 shadow-custom-br"
                  >
                    <Image
                      src={card.image.data.attributes.url}
                      alt="Sales card image"
                      width={200}
                      height={200}
                    />
                    <span className="text-lg font-bold text-blue-primary">
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
        <p className="p-8 text-center text-3xl font-bold text-blue-primary">
          {courseData.testimonials_title}
        </p>
        <div className="flex flex-col space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
          {courseData.testimonials.data.map(
            (testimonial: any, index: number) => {
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
                  />
                </div>
              );
            }
          )}
        </div>
      </section>
      <div className="flex flex-col items-center space-y-8 p-8">
        <Link
          href={courseData.cta_navigation_url}
          className="rounded-md bg-orange-400 bold text-white hover:bg-orange-500 px-8 py-4 text-3xl"
        >
          {courseData.cta_text}
        </Link>
      </div>
    </>
  );
}
