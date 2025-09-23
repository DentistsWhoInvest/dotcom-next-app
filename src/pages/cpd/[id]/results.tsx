import React from "react";
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

type Question = {
  id: number;
  question: string;
  potential_answers: Answer[];
};
type PageMetadata = {
  title: string;
  description: string;
};
type QuizResultsAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug?: string;
  quiz_result_pass_horizontal_banner: Banner;
  quiz_result_fail_horizontal_banner: Banner;
  quiz_questions: Question[];
  page_metadata?: PageMetadata;
};

type QuizResults = {
  id: number;
  attributes: QuizResultsAttributes;
};

export const getStaticPaths = async () => {
  const results = await fetchCPD();
  const paths: any[] = [];
  
  results.forEach((result: { id: string; attributes: { slug?: string } }) => {
    if (result.attributes.slug) {
      const cleanSlug = result.attributes.slug.startsWith('/') 
        ? result.attributes.slug.slice(1) 
        : result.attributes.slug;
      paths.push({ params: { id: cleanSlug } });
    } else {
      paths.push({ params: { id: result.id.toString() } });
    }
  });
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const CPDData = await fetchCPD();
  
  // First try to find by slug (with or without leading slash), then by ID
  let CPDQuestions = CPDData.find((course: { attributes: { slug?: string } }) => {
    if (!course.attributes.slug) return false;
    const cleanSlug = course.attributes.slug.startsWith('/') 
      ? course.attributes.slug.slice(1) 
      : course.attributes.slug;
    return cleanSlug === params.id;
  });
  
  // If not found by slug, try by ID
  if (!CPDQuestions) {
    CPDQuestions = CPDData.find((course: { id: string }) => 
      course.id.toString() === params.id
    );
  }
  
  return {
    props: {
      pageData: CPDQuestions,
    },
  };
};

export default function Results({ pageData }: { pageData: QuizResults }) {
  const { selectedAnswers, resetAnswers } = useQuizStore();

  // Helper function to get the course identifier (slug or id)
  const getCourseIdentifier = () => {
    if (pageData.attributes.slug) {
      // Remove leading slash if present
      return pageData.attributes.slug.startsWith('/') 
        ? pageData.attributes.slug.slice(1) 
        : pageData.attributes.slug;
    }
    return pageData.id;
  };

  const correctAnswers = pageData.attributes.quiz_questions.filter((q) =>
    q.potential_answers.find(
      (a) => a.is_correct && a.id === selectedAnswers[q.id]
    )
  );

  const numberOfCorrectAnswers = correctAnswers.length;

  const isSuccessful =
    numberOfCorrectAnswers >= pageData.attributes.quiz_questions.length / 2;

  function handleRetake() {
    resetAnswers();
    Router.push(`/cpd/${getCourseIdentifier()}/quiz`);
  }

  return (
    <>
      <Head>
        <title>DWI CPD Result</title>
        <meta name="title" content="DWI CPD Result" />
        <meta
          name="description"
          content={pageData.attributes.page_metadata?.description}
        />
      </Head>
      <section className="w-full bg-gray-50">
        <CPDPagesHeader title="Results" />
        <section className="mx-3 mt-12 flex flex-col items-center space-y-12 lg:mx-auto lg:max-w-[1000px]">
          <div
            className={`flex size-40 items-center justify-center rounded-full border-8 ${
              isSuccessful
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            }`}
          >
            <span className="text-4xl font-semibold">
              {numberOfCorrectAnswers}/
              {pageData.attributes.quiz_questions.length}
            </span>
          </div>
          {isSuccessful && (
            <div className="flex max-w-[700px] flex-col items-center space-y-4 text-center">
              <p className="pb-4 text-3xl font-semibold text-blue-primary">
                Congratulations!
              </p>
              <p className="pb-10 text-lg text-blue-primary">
                You have successfully passed this quiz. Please use the button
                below to complete your reflections and receive your CPD/CE
                certificate.
              </p>
              <Link
                href={`/cpd/${getCourseIdentifier()}/reflections`}
                className="place-self-center"
              >
                <button className="m-2 rounded-md bg-orange-600 px-6 py-3 text-white transition duration-200 ease-in-out hover:scale-105">
                  COMPLETE REFLECTIONS
                </button>
              </Link>
            </div>
          )}

          {!isSuccessful && (
            <div className="flex max-w-[700px] flex-col items-center space-y-4 text-center">
              <p className="text-xl font-semibold text-blue-primary">
                Unfortunately, you did not score highly enough to pass this quiz
                (pass mark: 60% and above).
              </p>
              <p className="pb-10 text-lg text-blue-primary">
                Please review the content material and retake the quiz when you
                feel ready.
              </p>
              <button
                onClick={() => handleRetake()}
                className="m-2 place-self-center rounded-md bg-orange-600 px-6 py-3 text-white transition duration-200 ease-in-out hover:scale-105"
              >
                RETAKE QUIZ
              </button>
            </div>
          )}
          {isSuccessful &&
            pageData.attributes.quiz_result_pass_horizontal_banner.data && (
              <div className="pb-20">
                <Link
                  href={
                    pageData.attributes.quiz_result_pass_horizontal_banner.data
                      .attributes.navigation_url
                  }
                >
                  <Image
                    src={
                      pageData.attributes.quiz_result_pass_horizontal_banner
                        .data.attributes.cover_image.data.attributes.url
                    }
                    alt={
                      pageData.attributes.quiz_result_pass_horizontal_banner
                        .data.attributes.title
                    }
                    width={1200}
                    height={400}
                    layout="responsive"
                    className="h-auto"
                  />
                </Link>
              </div>
            )}
          {!isSuccessful &&
            pageData.attributes.quiz_result_fail_horizontal_banner.data && (
              <div className="pb-20">
                <Link
                  href={
                    pageData.attributes.quiz_result_fail_horizontal_banner.data
                      .attributes.navigation_url
                  }
                >
                  <Image
                    src={
                      pageData.attributes.quiz_result_fail_horizontal_banner
                        .data.attributes.cover_image.data.attributes.url
                    }
                    alt={
                      pageData.attributes.quiz_result_fail_horizontal_banner
                        .data.attributes.title
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
