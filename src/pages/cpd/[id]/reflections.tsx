import React, { use, useEffect } from "react";
import Head from "next/head";
import CPDPagesHeader from "@/components/CPDPagesHeader";
import Link from "next/link";
import Image from "next/image";
import { useQuizStore } from "@/stores/quizStore";
import Router from "next/router";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { fetchCPD } from "@/lib/cpdFetchUtil";

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

type PageMetadata = {
  title: string;
  description: string;
};

type QuizReflectionsAttributes = {
  course_name: string;
  reflections: Reflections[];
  course_duration: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  reflections_horizontal_banner: Banner;
  page_metadata?: PageMetadata;
};

type QuizReflections = {
  id: number;
  attributes: QuizReflectionsAttributes;
};

export const getStaticPaths = async () => {
  const results = await fetchCPD();
  return {
    paths: results.map((result: { id: string }) => ({
      params: { id: result.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const CPDData = await fetchCPD();
  const CPDQuestions = CPDData.find(
    (course: { id: string }) => course.id.toString() === params.id
  );

  return {
    props: {
      pageData: CPDQuestions,
    },
  };
};

export default function Reflections({
  pageData,
}: {
  pageData: QuizReflections;
}) {
  const { selectedAnswers, reflectionAnswers, setReflectionAnswers } =
    useQuizStore();

  const [error, setError] = React.useState<boolean>(false);
  const [errorType, setErrorType] = React.useState<string>("");

  useEffect(() => {
    if (Object.keys(selectedAnswers).length === 0) {
      window.location.href = `/cpd/${pageData.id}/aims`;
    }
  });

  const handleSubmitQuiz = () => {
    setErrorType("");
    setError(false);
    const hasEmptyAnswer = Object.values(reflectionAnswers).some(
      (reflection) => reflection.answer.length === 0
    );
    if (
      Object.keys(reflectionAnswers).length !==
        pageData.attributes.reflections.length ||
      hasEmptyAnswer
    ) {
      setErrorType("missingreflection");
      setError(true);
      return;
    }
    const hasTooLongAnswer = Object.values(reflectionAnswers).some(
      (reflection) => reflection.answer.length > 350
    );

    if (hasTooLongAnswer) {
      setErrorType("toolong");
      setError(true);
      return;
    } else {
      Router.push(`/cpd/${pageData.id}/congratulations`);
    }
  };

  return (
    <>
      <Head>
        <title>
          DWI CPD Reflections:{" "}
          {pageData.attributes.page_metadata?.title ||
            pageData.attributes.course_name}
        </title>
        <meta
          name="title"
          content={
            "DWI CPD: " +
            (pageData.attributes.page_metadata?.title ??
              pageData.attributes.course_name)
          }
        />
        <meta
          name="description"
          content={pageData.attributes.page_metadata?.description}
        />
      </Head>

      <section className="w-full bg-gray-50">
        <CPDPagesHeader title="Reflections" />
        <section className="mx-3 mt-12 flex flex-col justify-start space-y-8 lg:mx-auto lg:max-w-[1000px]">
          <div className="font-semibold">
            Please complete your reflections to receive your CPD/CE
          </div>
          <div className="space-y-4">
            {pageData.attributes.reflections.map((question, index) => (
              <div key={index + 1} className="space-y-2">
                <div className="mx-2 pb-2">
                  {index + 1}. {question.reflection_question}
                </div>
                <textarea
                  className="h-[170px] w-full border-2 border-blue-primary p-4 lg:h-32"
                  placeholder=""
                  value={
                    reflectionAnswers.find(
                      (item) => item.questionId === question.id
                    )?.answer || ""
                  }
                  onChange={(e) =>
                    setReflectionAnswers(
                      question.id,
                      question.reflection_question,
                      e.target.value
                    )
                  }
                />
                <div
                  className={`flex justify-end text-sm ${
                    reflectionAnswers[question.id]?.answer.length > 350
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  {reflectionAnswers[question.id]?.answer
                    ? reflectionAnswers[question.id]?.answer.length
                    : 0}{" "}
                  / 350
                </div>
              </div>
            ))}
          </div>
          {error &&
            (errorType === "toolong" ? (
              <p className="text-red-500">
                Please limit your answers to 350 characters.
              </p>
            ) : (
              <p className="text-red-500">Please answer each question.</p>
            ))}
          <div>
            <button
              onClick={() => handleSubmitQuiz()}
              className="rounded-md bg-orange-600 px-6 py-2.5 text-white transition duration-200 ease-in-out hover:scale-105"
            >
              COMPLETE REFLECTIONS
            </button>
          </div>

          {pageData.attributes.reflections_horizontal_banner.data && (
            <div className="pb-20">
              <Link
                href={
                  pageData.attributes.reflections_horizontal_banner.data
                    .attributes.navigation_url
                }
              >
                <Image
                  src={
                    pageData.attributes.reflections_horizontal_banner.data
                      .attributes.cover_image.data.attributes.url
                  }
                  alt={
                    pageData.attributes.reflections_horizontal_banner.data
                      .attributes.title
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
