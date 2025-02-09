import React from "react";
import Head from "next/head";
import type { Video } from "../videos";
import CPDPagesHeader from "@/components/CPDPagesHeader";
import Link from "next/link";
import Image from "next/image";
import { useQuizStore } from "@/stores/quizStore";
import { fetchEndpointData } from "@/lib/fetchUtils";

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

type QuizCongratulations = {
  course_name: string;
  form_id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  form_horizontal_banner: Banner;
  page_metadata: PageMetadata;
};

export const getStaticProps = async () => {
  const populateFields = [
    "form_horizontal_banner",
    "form_horizontal_banner.cover_image",
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

export default function Congratulations({ pageData }: { pageData: QuizCongratulations }) {
  const { reflectionAnswers } = useQuizStore();

  return (
    <>
      <Head>
        <title>{pageData.page_metadata.title}</title>
        <meta name="description" content={pageData.page_metadata.description} />
      </Head>
      <section className="w-full bg-gray-50">
        <CPDPagesHeader title="Congratulations" />
        form should come from active campaign
        <div className="lg:mx-auto lg:max-w-[1000px]">
          {pageData.form_horizontal_banner.data && (
            <div className="mx-3 pb-20 lg:mx-0">
              <Link
                href={
                  pageData.form_horizontal_banner.data.attributes.navigation_url
                }
              >
                <Image
                  src={
                    pageData.form_horizontal_banner.data.attributes.cover_image
                      .data.attributes.url
                  }
                  alt={pageData.form_horizontal_banner.data.attributes.title}
                  width={1200}
                  height={400}
                  layout="responsive"
                  className="h-auto"
                />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
