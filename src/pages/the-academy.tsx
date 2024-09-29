import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import { TestimonialCard } from "@/components/TestimonialCard";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

//create type based on sample data
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
  sales_part_2: Paragraph[];
  sales_part_3_cost: Paragraph[];
  description: Paragraph[];
  sales_cards: {
    reason: string;
    image: ImageData;
  }[];
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
  first_description: Paragraph[];
  collective_content_description: Paragraph[];
  // summary: Paragraph[];
  summary: any;
  cta_text: string;
  cta_navigation_url: string;
  sign_off: Paragraph[];
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
      <section id="topbanner">
        <div className="flex flex-col items-center justify-center bg-gradient-to-l from-blue-primary to-blue-secondary text-white">
          <Image
            src={courseData.hero_logo_ribbon.data.attributes.url}
            alt={"Hero banner"}
            width={courseData.hero_cover.data.attributes.width}
            height={courseData.hero_cover.data.attributes.height}
          />
          <h1 className="text-4xl font-bold">{courseData.hero_text}</h1>
        </div>
      </section>
      <section id="first-description">
        <div className="flex flex-col justify-center">
          {courseData.first_description.map((paragraph, index) => (
            <p key={index}>{paragraph.children[0].text}</p>
          ))}
        </div>
      </section>
      <section id="collective-content">
        <div className="flex flex-col items-center space-y-8 p-8">
          {courseData.collective_content_description.map((paragraph, index) => (
            <p key={index}>{paragraph.children[0].text}</p>
          ))}
          <Image
            src={courseData.collective_content_image.data.attributes.url}
            alt="Collective content image"
            width={courseData.collective_content_image.data.attributes.width}
            height={courseData.collective_content_image.data.attributes.height}
          />
        </div>
      </section>

      <section id="informed-investor-club">
        <div className="flex flex-col items-center space-y-8 p-8">
          <h2 className="text-2xl font-bold">Informed Investor Club</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
              {courseData.informed_investor_club.sales_part_1.map(
                (paragraph, index) => (
                  <p key={index}>{paragraph.children[0].text}</p>
                )
              )}
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
              {courseData.informed_investor_club.sales_part_2.map(
                (paragraph, index) => (
                  <p key={index}>{paragraph.children[0].text}</p>
                )
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
              {courseData.informed_investor_club.sales_part_3_cost.map(
                (paragraph, index) => (
                  <p key={index}>{paragraph.children[0].text}</p>
                )
              )}
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
              {courseData.informed_investor_club.description.map(
                (paragraph, index) => (
                  <p key={index}>{paragraph.children[0].text}</p>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            {courseData.informed_investor_club.sales_cards.map(
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

      <section id="testimonial and sign off"></section>

      <section id="sign off">
        <div>
          {courseData.testimonial.data.attributes.review.map(
            (paragraph: any, index: number) => (
              <p key={index}>{paragraph.children[0].text}</p>
            )
          )}
        </div>
        - {courseData.testimonial.data.attributes.author},{" "}
        {courseData.testimonial.data.attributes.author_job_location
          .split(",")[1]
          ?.trim()}
        <div className="space-y-2">
          <BlocksRenderer content={courseData.summary} />
        </div>
        <Button className="m-2 rounded-md bg-orange-400 px-4 py-3 text-white hover:text-blue-primary">
          <Link href={courseData.cta_navigation_url}>
            {courseData.cta_text}
          </Link>{" "}
        </Button>
        <div className="flex flex-col items-center space-y-8 p-8">
          {courseData.sign_off.map((paragraph, index) => (
            <p key={index}>{paragraph.children[0].text}</p>
          ))}
        </div>
        {/* <div className="flex flex-col items-center space-y-8 p-8"> */}
        <div className="relative h-[440px] w-full ">
          {" "}
          <Image
            src={courseData.sign_off_cover.data.attributes.url}
            alt="Sign off image"
            layout="fill"
            objectPosition="center"
            objectFit="cover"
            priority
          />
          <div className="absolute left-0 top-0 z-10 flex h-full flex-col justify-center space-y-2 p-12 text-center text-white">
            <div className="text-xl font-bold">
              <BlocksRenderer
                content={courseData.sign_off_testimonial.data.attributes.review}
              />
            </div>
            - {courseData.sign_off_testimonial.data.attributes.author},{" "}
            {courseData.sign_off_testimonial.data.attributes.author_job_location
              .split(",")[1]
              ?.trim()}
          </div>
        </div>
      </section>
    </>
  );
}
