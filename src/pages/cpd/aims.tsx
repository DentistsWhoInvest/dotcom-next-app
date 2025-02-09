import React from "react";
import Head from "next/head";
import CPDPagesHeader from "@/components/CPDPagesHeader";
import Link from "next/link";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Clock } from "lucide-react";
import { fetchEndpointData } from "@/lib/fetchUtils";

type TextNode = {
  text: string;
  type: string;
};

type ListItem = {
  type: "list-item";
  children: TextNode[];
};

type List = {
  type: "list";
  format: "unordered" | "ordered";
  children: ListItem[];
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

type CoverImage = {
  data: ImageData;
};

type BannerAttributes = {
  createdAt: string;
  updatedAt: string;
  title: string;
  navigation_url: string;
  is_internal: boolean;
  cover_image: CoverImage;
};

type BannerData = {
  id: number;
  attributes: BannerAttributes;
};

type Banner = {
  data: BannerData;
};

type Answer = {
  id: number;
  answer: string;
  is_correct: boolean;
};

type PageMetadata = {
  title: string;
  description: string;
};

type QuizAims = {
  course_name: string;
  aims: any;
  course_duration: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  overview_horizontal_banner: Banner;
  page_metadata: PageMetadata
};

export const getStaticProps = async () => {
  const populateFields = [
    "overview_horizontal_banner",
    "overview_horizontal_banner.cover_image",
    "page_metadata"
  ];
  const CPDQuestions = await fetchEndpointData(
    `/cpd-courses/1`,
    populateFields
  );

  return {
    props: {
      pageData: CPDQuestions.data.attributes,
    },
  };
};

export default function Aims({ pageData }: { pageData: QuizAims }) {
  return (
    <>
      <Head>
        <title>{pageData.page_metadata.title}</title>
        <meta name="description" content={pageData.page_metadata.description} />
      </Head>
      <section className="w-full bg-gray-50">
        <CPDPagesHeader title="Description" />
        <section className="mx-3 space-y-12 lg:mx-auto lg:max-w-[1000px]">
          <div className="privacy-policy mt-8 flex flex-col items-start justify-center gap-4 border-2 border-blue-primary bg-white px-2 pb-12 pt-8 md:mt-20 md:px-20">
            <div className="flex flex-col md:flex-row">
              <span className="font-semibold ">
                Aims & Objectives:
              </span>
              <span className="flex flex-row text-blue-secondary">
                <Clock
                  size={20}
                  className="mr-2 place-self-center text-blue-secondary md:ml-8"
                />{" "}
                {pageData.course_duration} Verifiable CPD/CE
              </span>
            </div>
            <ul className="show-bulleted-disc flex flex-col gap-2">
                <BlocksRenderer key="1" content={pageData.aims} />
            </ul>
          </div>

          <Link href={"/cpd/quiz"} className="">
            <button className="mt-12 rounded-md bg-orange-600 px-6 py-2.5 text-white transition duration-200 ease-in-out hover:scale-105">
              TAKE THE CPD/CE QUIZ
            </button>
          </Link>
          {pageData.overview_horizontal_banner.data && (
            <div className="pb-20">
              <Link
                href={
                  pageData.overview_horizontal_banner.data.attributes
                    .navigation_url
                }
              >
                <Image
                  src={
                    pageData.overview_horizontal_banner.data.attributes
                      .cover_image.data.attributes.url
                  }
                  alt={
                    pageData.overview_horizontal_banner.data.attributes.title
                  }
                  width={1200}
                  height={400}
                  layout="responsive"
                  className="h-auto"
                />
              </Link>
            </div>
          )}
        </section>
      </section>
    </>
  );
}
