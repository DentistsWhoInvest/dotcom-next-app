import React from "react";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TextNode = {
  text: string;
  type: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type Paragraph = {
  type: "paragraph";
  children: TextNode[];
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
  data: {
    id: number;
    attributes: ImageAttributes;
  };
};

type InformedInvestorClub = {
  id: number;
  sales_part_1: Paragraph[];
  sales_part_2: any;
  sales_part_3_cost: any;
  description: any;
  sales_cards: {
    reason: string;
    image: ImageData;
  }[];
  video_club: ImageData;
};

type Testimonial = {
  data: {
    id: number;
    attributes: {
      title: string;
      // review: Paragraph[];
      review: any;
      author: string;
      author_job_location: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
};

type AcademyCoursePageData = {
  hero_text: string;
  first_description: any;
  collective_content_description: any;
  // summary: Paragraph[];
  summary: any;
  cta_text: string;
  cta_navigation_url: string;
  sign_off: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  hero_cover: ImageData;
  hero_logo_ribbon: ImageData;
  collective_content_image: ImageData;
  informed_investor_club: InformedInvestorClub;
  testimonial: Testimonial;
  sign_off_testimonial: Testimonial;
  sign_off_cover: ImageData;
};

export const getStaticProps = async () => {
  const populateFields = [
    "hero_cover",
    "hero_logo_ribbon",
    "collective_content_image",
    "informed_investor_club",
    "informed_investor_club.sales_part_1",
    "informed_investor_club.sales_part_2",
    "informed_investor_club.sales_part_3_cost",
    "informed_investor_club.description",
    "informed_investor_club.sales_cards",
    "informed_investor_club.sales_cards.image",
    "informed_investor_club.video_club",
    "testimonial",
    "testimonial.author_thumbnail",
    "sign_off_testimonial",
    "sign_off_testimonial.author_thumbnail",
    "sign_off_cover",
  ];
  const pageData = await fetchEndpointData(`/the-academy-page`, populateFields);

  return {
    props: {
      courseData: pageData.data.attributes,
    },
  };
};

export default function TheAcademyCoursePage({
  courseData,
}: {
  courseData: AcademyCoursePageData;
}) {
  return (
    <>
      <main className="text-lg">
        <section id="topbanner">
          <div className="relative z-10 h-[492px] w-screen overflow-hidden md:h-[402px] lg:h-[542px]">
            <Image
              src={courseData.hero_cover.data.attributes.url}
              alt={"mobile"}
              layout="fill"
              objectFit="cover"
              className="inset-0 object-[left_70%] md:bg-blue-secondary md:object-[right_0%] md:pr-[36px] lg:object-[center_0%] lg:pr-0"
            />
            <div className="relative z-10 flex size-full flex-col items-center justify-center px-5 text-center md:mx-auto md:max-w-[800px] md:items-start md:px-0 md:text-left lg:w-[1140px] lg:max-w-[1140px]">
              <div className="-mt-4 mb-5 text-3xl font-bold text-white md:my-0 md:pl-[40px] md:text-[35px] lg:pl-[130px] lg:text-[45px] lg:leading-[54px]">
                <div className=" md:w-[71.833%]">
                  <div className="p-[10px]">
                    <Image
                      src={courseData.hero_logo_ribbon.data.attributes.url}
                      alt={"ribbon"}
                      height={125}
                      width={640}
                      objectFit="cover"
                      className="sm:aspect-auto md:h-[53px] md:w-[272px] lg:h-[71px] lg:w-[365px]"
                    />
                    <h1 className="mt-[32px] text-left text-[30px] font-bold text-white [text-shadow:_0_0_10px_rgb(0_0_0_/_30%)] md:w-[74.2%] md:leading-[50px] lg:text-[40px]">
                      {courseData.hero_text}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="first-description">
          <div className="m-8 space-y-4 text-lg md:m-[50px] lg:mx-[150px] xl:mx-auto xl:max-w-[1140px] xl:px-[150px]">
            <BlocksRenderer content={courseData.first_description} />
          </div>
        </section>
        <section id="collective-content" className="bg-gray-100">
          <div className="grid grid-cols-1 items-center space-y-8 px-6 py-4 text-lg md:grid-cols-2 md:gap-4 md:space-x-4 md:space-y-0 xl:mx-auto xl:max-w-[1140px] xl:gap-8">
            <Image
              src={courseData.collective_content_image.data.attributes.url}
              alt="Collective content image"
              width={315}
              height={315}
              className="h-auto w-full md:size-[364px] lg:size-[492px] xl:size-[550px] xl:place-self-center"
            />
            <div className="space-y-8 lg:pl-[20px] lg:pr-[120px] xl:pr-[100px]">
              <BlocksRenderer
                content={courseData.collective_content_description}
              />
            </div>
          </div>
        </section>
        <section className="flex justify-center bg-blue-secondary p-2">
          <Image
            src="https://assets.dentistswhoinvest.com/on_the_call_photo_d885beeb5c/on_the_call_photo_d885beeb5c.webp"
            alt="Collective content image"
            width={courseData.collective_content_image.data.attributes.width}
            height={courseData.collective_content_image.data.attributes.height}
          />
        </section>

        <section id="informed-investor-club">
          <div className="flex flex-col items-center space-y-8 p-8">
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2 text-center font-bold">
                <p className="mx-8 flex flex-row justify-center text-xl text-blue-secondary md:text-[30px] md:leading-9">
                  {courseData.informed_investor_club.sales_part_1.map(
                    (item: any, index: number) => {
                      return (
                        <p key={index}>
                          <span>{item.children[0].text}</span>
                          <span
                            id="wrapper"
                            className="relative inline-block overflow-visible"
                          >
                            <span className="text-orange-400">
                              {item.children[1].text}
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
                          <span>{item.children[2].text}</span>
                        </p>
                      );
                    }
                  )}
                </p>
                <p className="text-3xl text-blue-primary md:m-[-20px] md:text-[45px]">
                  <BlocksRenderer
                    content={courseData.informed_investor_club.sales_part_2}
                  />
                </p>
                <p className="font-semibold text-orange-400 md:text-2xl">
                  <BlocksRenderer
                    content={
                      courseData.informed_investor_club.sales_part_3_cost
                    }
                  />
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 lg:mx-[120px] lg:space-y-8 lg:py-5 xl:mx-auto xl:max-w-[1140px] xl:px-[150px]">
                <BlocksRenderer
                  content={courseData.informed_investor_club.description}
                />
              </div>
            </div>
            <div className="m-[10px] grid size-full grid-cols-1 justify-center gap-4 space-y-4 md:grid-cols-4 md:space-y-0 lg:gap-8 lg:px-[50px] xl:px-[200px]">
              {courseData.informed_investor_club.sales_cards.map(
                (card: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex h-[266] w-[295] flex-col items-center space-y-4 rounded-lg bg-blue-secondary p-8 md:h-[266] md:w-[162] md:px-2 md:py-8 xl:px-4"
                    >
                      <Image
                        src={card.image.data.attributes.url}
                        alt="Sales card image"
                        width={90}
                        height={90}
                      />
                      <span className="size-full text-center text-lg font-bold text-white">
                        {card.reason}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>

        <section id="sign off" className="space-y-8 bg-[#dbe2e9] p-8 ">
          <div className="m-auto flex-col space-y-8 lg:flex lg:max-w-[1140px] lg:justify-center">
            <div className="border-4 border-blue-primary p-4 text-center text-blue-primary xl:p-12 ">
              <div className="text-2xl font-bold xl:m-4 xl:text-3xl">
                {" "}
                <BlocksRenderer
                  content={courseData.testimonial.data.attributes.review}
                />
              </div>
              <span className="xl:text-2xl">
                {" "}
                - {courseData.testimonial.data.attributes.author},{" "}
                {courseData.testimonial.data.attributes.author_job_location
                  .split(",")[1]
                  ?.trim()}{" "}
              </span>
            </div>
            <div className="space-y-4 lg:px-[150px]">
              <BlocksRenderer content={courseData.summary} />
            </div>
            <Link
              href={courseData.cta_navigation_url}
              className="flex justify-center"
            >
              <Button className="size-full rounded-md bg-orange-400 px-8 py-4 text-xl text-white hover:text-blue-primary md:size-1/2 lg:size-2/3 lg:px-[60px] lg:py-8 lg:text-[33px]">
                {courseData.cta_text}
              </Button>
            </Link>
            <div className="flex flex-col items-center space-y-8 lg:py-6">
              <BlocksRenderer content={courseData.sign_off} />
            </div>
          </div>
        </section>
        <div className="relative h-[440px] w-full ">
          <div className="absolute inset-0 ">
            <Image
              src={courseData.sign_off_cover.data.attributes.url}
              alt={"Sign off image"}
              layout="fill"
              objectPosition="center"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-blue-primary opacity-70"></div>
          </div>
          <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center space-y-2 p-4 text-center text-white md:p-[50px] lg:px-[150px] xl:max-w-[1140px] xl:place-self-center">
            <div className="text-2xl font-bold md:text-[30px] md:leading-[35px]">
              <BlocksRenderer
                content={courseData.sign_off_testimonial.data.attributes.review}
              />
            </div>
            <p className="text-blue-secondary md:text-xl">
              -{courseData.sign_off_testimonial.data.attributes.author},{" "}
              {courseData.sign_off_testimonial.data.attributes.author_job_location
                .split(",")[1]
                ?.trim()}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
