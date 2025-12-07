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

type Question = {
  id: number;
  question: string;
  potential_answers: Answer[];
};
type PageMetadata = {
  title: string;
  description: string;
};
type QuizQuestionsAttributes = {
  course_name: string;
  aims: List[];
  course_duration: string;
  slug?: string;
  form_id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  quiz_horizontal_banner: Banner;
  quiz_questions: Question[];
  page_metadata?: PageMetadata;
};

type QuizQuestions = {
  id: number;
  attributes: QuizQuestionsAttributes;
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

export default function Quiz({ pageData }: { pageData: QuizQuestions }) {
  const [error, setError] = React.useState<boolean>(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const { selectedAnswers, setAnswer } = useQuizStore();

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  const handleSelect = (questionId: number, answerId: number) => {
    setAnswer(questionId, answerId);
  };

  const handleSubmitQuiz = () => {
    if (
      Object.keys(selectedAnswers).length !==
      pageData.attributes.quiz_questions.length
    ) {
      setError(true);
      return;
    } else {
      Router.push(`/cpd/${getCourseIdentifier()}/results`);
    }
  };

  return (
    <>
      <Head>
        <title>
          DWI CPD Test:{" "}
          {pageData.attributes.page_metadata?.title ||
            pageData.attributes.course_name}
        </title>
        <meta
          name="title"
          content={
            "DWI CPD Test: " +
            (pageData.attributes.page_metadata?.title ??
              pageData.attributes.course_name)
          }
        />
        <meta
          name="description"
          content={pageData.attributes.page_metadata?.description}
        />
      </Head>
      <section className="bg-gray-50 ">
        <CPDPagesHeader title="Quiz" />
        <section className="mx-3 mt-8 flex flex-col justify-start space-y-8 md:mt-20 lg:mx-auto lg:max-w-[1000px]">
          {pageData.attributes.quiz_questions.map((q, index) => (
            <div key={q.id}>
              <p className="mb-2 text-[18px] font-semibold">
                {index + 1}. {q.question}
              </p>
              <div className="flex flex-col items-start">
                {q.potential_answers.map((a, i) => (
                  <div key={i} className="my-2 flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`question-${q.id}-answer-${a.id}`}
                      name={`question-${q.id}`}
                      checked={isLoaded && selectedAnswers[q.id] === a.id}
                      onChange={() => handleSelect(q.id, a.id)}
                      className="hidden"
                    />

                    <label
                      htmlFor={`question-${q.id}-answer-${a.id}`}
                      className={`flex cursor-pointer items-center space-x-2`}
                    >
                      <span
                        className={`flex size-4 flex-shrink-0 items-center justify-center rounded-full border-2 md:size-6 ${selectedAnswers[q.id] === a.id
                            ? "border-blue-primary bg-blue-secondary"
                            : "border-gray-400 bg-white"
                          }`}
                      />
                      <span className="text-black">{a.answer}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {error && (
            <p className="text-red-500">
              Please select an answer for each question
            </p>
          )}

          <div>
            <button
              onClick={() => handleSubmitQuiz()}
              className="rounded-md bg-orange-600 px-6 py-2.5 text-white transition duration-200 ease-in-out hover:scale-105"
            >
              COMPLETE QUIZ
            </button>
          </div>

          {pageData.attributes.quiz_horizontal_banner.data && (
            <div className="pb-20">
              <Link
                href={
                  pageData.attributes.quiz_horizontal_banner.data.attributes
                    .navigation_url
                }
              >
                <Image
                  src={
                    pageData.attributes.quiz_horizontal_banner.data.attributes
                      .cover_image.data.attributes.url
                  }
                  alt={
                    pageData.attributes.quiz_horizontal_banner.data.attributes
                      .title
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
