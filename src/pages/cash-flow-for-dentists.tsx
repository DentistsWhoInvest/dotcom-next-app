import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TestimonialCard } from "@/components/TestimonialCard";

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
    description: {
      type: string;
      children: {
        text: string;
        type: string;
      }[];
    }[];
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
        <div className="relative h-[440px] w-full">
          {" "}
          <Image
            className="object-cover"
            src={
              "https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
            }
            alt={"Hero banner"}
            layout="fill"
            objectPosition="center"
            objectFit="cover"
            priority
          />
          <div className="absolute left-0 top-0 z-10 flex h-full flex-col justify-center space-y-2 p-12 text-center">
            <span className="font-semibold text-orange-400">
              {courseData.hero_subtext}
            </span>
            <span className="text-3xl font-bold text-white">
              {courseData.hero_title}
            </span>
            <span className="text-blue-light">
              {courseData.hero_description}
            </span>
            <Button className="rounded-md bg-orange-400 font-bold text-white hover:bg-orange-500">
              <Link href={courseData.cta_navigation_url}>Learn More</Link>
            </Button>{" "}
          </div>
        </div>
      </section>

      <section id="worseoff" className="bg-gray-100">
        <div className="flex flex-col items-center space-y-8 p-8">
          <span className="text-3xl font-bold text-blue-primary">
            {courseData.worse_off.title}
          </span>
          <span className="text-blue-secondary">
            {courseData.worse_off.subtext}
          </span>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {courseData.worse_off.sales_cards.map(
              (card: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg"
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
      <section id="salescarousel">
        <div className="flex flex-col items-center space-y-8 p-8">
          {courseData.sales_carousel.map((paragraph: any, index: number) => {
            const subtitle = paragraph.description[0].children[0].text;
            const remainder = paragraph.description.slice(1);
            return (
              <div
                key={index}
                className="grid grid-cols-1 gap-8 md:grid-cols-2"
              >
                <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
                  <Image
                    src={paragraph.cover.data.attributes.url}
                    alt="Sales card image"
                    width={200}
                    height={200}
                  />
                  <span className="text-lg font-bold text-blue-primary">
                    {subtitle}
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
                  {remainder.map((paragraph: any, index: number) => {
                    return <p key={index}>{paragraph.children[0].text}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section id="freedom">
        <div className="flex flex-col items-center space-y-8 p-8">
          <span className="text-3xl font-bold text-blue-primary">
            {courseData.freedom.title}
          </span>
          <span>
            {courseData.freedom.description.map(
              (paragraph: any, index: number) => {
                return <p key={index}>{paragraph.children[0].text}</p>;
              }
            )}
          </span>
        </div>
      </section>

      <section id="helpforyou" className="bg-gray-100">
        <div className="flex flex-col items-center space-y-8 p-8">
          <span className="text-3xl font-bold text-blue-primary">
            {courseData.help_for_you.title}
          </span>
          <span className="text-blue-secondary">
            {courseData.help_for_you.subtext}
          </span>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {courseData.help_for_you.sales_cards.map(
              (card: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg"
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
        {courseData.testimonials.data.map((testimonial: any) => {
          return (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          );
        })}
      </section>
      <div className="flex flex-col items-center space-y-8 p-8">
        <Button className="rounded-md bg-orange-400 font-bold text-white hover:bg-orange-500">
          <Link href={courseData.cta_navigation_url}>
            {courseData.cta_text}
          </Link>
        </Button>
      </div>
    </>
  );
}
