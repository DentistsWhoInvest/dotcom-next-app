import React, { use } from "react";
import Head from "next/head";
import type { Video } from "../videos";
import CPDPagesHeader from "@/components/CPDPagesHeader";
import Link from "next/link";
import Image from "next/image";
import { useQuizStore } from "@/stores/quizStore";
import Router from "next/router";
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

type Reflections = {
  id: number;
  reflection_question: string;
};

type QuizReflections = {
  course_name: string;
  reflections: Reflections[];
  course_duration: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  reflections_horizontal_banner: Banner;
};

export const getStaticProps = async () => {
  const populateFields = [
    "reflections_horizontal_banner",
    "reflections_horizontal_banner.cover_image",
    "reflections",
    "reflections.reflection_question",
  ];
  const CPDQuestions = await fetchEndpointData(
    `/cpd-courses/1`,
    populateFields
  );
  console.log("CPDQuestions", CPDQuestions.data);

  return {
    props: {
      pageData: CPDQuestions.data.attributes,
    },
  };
};

export default function Reflections({
  pageData,
}: {
  pageData: QuizReflections;
}) {
  console.log("pageData", pageData);
  const { reflectionAnswers, setReflectionAnswers } = useQuizStore();
  console.log(reflectionAnswers);
  const [error, setError] = React.useState<boolean>(false);

  const handleSubmitQuiz = () => {
    if (Object.keys(reflectionAnswers).length !== pageData.reflections.length) {
      setError(true);
      return;
    } else {
      Router.push("/cpd/congratulations");
    }
  };

  return (
    <>
      <Head>
        {/* <title>{pageData.attributes.name}</title> */}
        <title>test</title>
        {/* <meta name="description" content={pageData.attributes.description} /> */}
      </Head>

      <section className="w-full bg-gray-50">
        <CPDPagesHeader title="Reflections" />
        <section className="mx-3 mt-12 flex flex-col justify-start space-y-12 lg:mx-auto lg:max-w-[1000px]">
          <div className="font-semibold">
            Please complete your reflections to receive your CPD/CE
          </div>
          <div className="space-y-4">
            {pageData.reflections.map((question, index) => (
              <div key={index + 1} className="space-y-2">
                <div className="mx-2 pb-4">
                  {index + 1}. {question.reflection_question}
                </div>
                <textarea
                  className="h-32 w-full border-2 border-blue-primary p-4"
                  placeholder=""
                  value={reflectionAnswers[question.id] || ""}
                  onChange={(e) =>
                    setReflectionAnswers(question.id, e.target.value)
                  }
                ></textarea>
              </div>
            ))}
          </div>
          {error && (
            <p className="text-red-500">Please select answer each question</p>
          )}
          <div>
            <button
              onClick={() => handleSubmitQuiz()}
              className="rounded-md bg-orange-600 px-6 py-2.5 text-white transition duration-200 ease-in-out hover:scale-105"
            >
              COMPLETE REFLECTIONS
            </button>
          </div>

          {pageData.reflections_horizontal_banner.data && (
            <div className="pb-20">
              <Link
                href={
                  pageData.reflections_horizontal_banner.data.attributes
                    .navigation_url
                }
              >
                <Image
                  src={
                    pageData.reflections_horizontal_banner.data.attributes
                      .cover_image.data.attributes.url
                  }
                  alt={
                    pageData.reflections_horizontal_banner.data.attributes.title
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
