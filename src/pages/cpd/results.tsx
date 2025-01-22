import React from "react";
import Head from "next/head";
import type { Video } from "../videos";
import CPDPagesHeader from "@/components/CPDPagesHeader";
import Link from "next/link";
import Image from "next/image";
import { useQuizStore } from "@/stores/quizStore";
import Router from "next/router";

// export const getStaticProps = async ({ params }: any) => {
//   const populateFields = ["horizontal_banner", "horizontal_banner.cover_image"];
//   const allVideos = await fetchEndpointData(`/videos`, populateFields);

//   return {
//     props: {
//       pageData: matchingVideo,
//       otherVideos: otherVideos,
//     },
//   };
// };

export default function Results({}: //   pageData,
{
  //   pageData: Video;
}) {
  const pageData = {
    attributes: {
      name: "Quiz",
      description: "CPD Quiz",
      horizontal_banner: {
        data: {
          id: 6,
          attributes: {
            createdAt: "2024-08-24T11:47:49.797Z",
            updatedAt: "2024-08-24T12:32:52.498Z",
            title: "Warren Robins Need to Review Your Income Protection",
            navigation_url: "/income-protection",
            is_internal: true,
            cover_image: {
              data: {
                id: 65,
                attributes: {
                  name: "warren-robins-horizontal-banner-small.webp",
                  alternativeText:
                    "Ad of Dentists Who Invest about questioning income protection review with Mr. Warren Robins, an Income Protection expert.",
                  caption:
                    "Time to reassess your income protection? Click to learn how we can help.",
                  width: 2184,
                  height: 540,
                  formats: {
                    large: {
                      ext: ".webp",
                      url: "https://assets.dentistswhoinvest.com/large_warren_robins_horizontal_banner_small_1666bc2a1e/large_warren_robins_horizontal_banner_small_1666bc2a1e.webp",
                      hash: "large_warren_robins_horizontal_banner_small_1666bc2a1e",
                      mime: "image/webp",
                      name: "large_warren-robins-horizontal-banner-small.webp",
                      path: null,
                      size: 20.32,
                      width: 1000,
                      height: 247,
                      sizeInBytes: 20316,
                    },
                    small: {
                      ext: ".webp",
                      url: "https://assets.dentistswhoinvest.com/small_warren_robins_horizontal_banner_small_1666bc2a1e/small_warren_robins_horizontal_banner_small_1666bc2a1e.webp",
                      hash: "small_warren_robins_horizontal_banner_small_1666bc2a1e",
                      mime: "image/webp",
                      name: "small_warren-robins-horizontal-banner-small.webp",
                      path: null,
                      size: 9.3,
                      width: 500,
                      height: 124,
                      sizeInBytes: 9298,
                    },
                    medium: {
                      ext: ".webp",
                      url: "https://assets.dentistswhoinvest.com/medium_warren_robins_horizontal_banner_small_1666bc2a1e/medium_warren_robins_horizontal_banner_small_1666bc2a1e.webp",
                      hash: "medium_warren_robins_horizontal_banner_small_1666bc2a1e",
                      mime: "image/webp",
                      name: "medium_warren-robins-horizontal-banner-small.webp",
                      path: null,
                      size: 15.12,
                      width: 750,
                      height: 185,
                      sizeInBytes: 15120,
                    },
                    thumbnail: {
                      ext: ".webp",
                      url: "https://assets.dentistswhoinvest.com/thumbnail_warren_robins_horizontal_banner_small_1666bc2a1e/thumbnail_warren_robins_horizontal_banner_small_1666bc2a1e.webp",
                      hash: "thumbnail_warren_robins_horizontal_banner_small_1666bc2a1e",
                      mime: "image/webp",
                      name: "thumbnail_warren-robins-horizontal-banner-small.webp",
                      path: null,
                      size: 3.86,
                      width: 245,
                      height: 61,
                      sizeInBytes: 3864,
                    },
                  },
                  hash: "warren_robins_horizontal_banner_small_1666bc2a1e",
                  ext: ".webp",
                  mime: "image/webp",
                  size: 56.02,
                  url: "https://assets.dentistswhoinvest.com/warren_robins_horizontal_banner_small_1666bc2a1e/warren_robins_horizontal_banner_small_1666bc2a1e.webp",
                  previewUrl: null,
                  provider:
                    "@strapi-community/strapi-provider-upload-google-cloud-storage",
                  provider_metadata: null,
                  createdAt: "2024-08-11T15:47:35.148Z",
                  updatedAt: "2024-09-13T07:42:03.808Z",
                },
              },
            },
          },
        },
      },
      quiz_questions: [
        {
          id: 1,
          question_title: "What is the capital of France?",
          answers: [
            { id: 1, answer: "Paris", is_correct: true },
            { id: 2, answer: "London", is_correct: false },
            { id: 3, answer: "Berlin", is_correct: false },
            { id: 4, answer: "Madrid", is_correct: false },
          ],
        },
        {
          id: 2,
          question_title: "What is the capital of Germany?",
          answers: [
            { id: 1, answer: "Paris", is_correct: false },
            { id: 2, answer: "London", is_correct: false },
            { id: 3, answer: "Berlin", is_correct: true },
            { id: 4, answer: "Madrid", is_correct: false },
          ],
        },
        {
          id: 3,
          question_title: "What is the capital of Spain?",
          answers: [
            { id: 1, answer: "Paris", is_correct: false },
            { id: 2, answer: "London", is_correct: false },
            { id: 3, answer: "Berlin", is_correct: false },
            { id: 4, answer: "Madrid", is_correct: true },
          ],
        },
        {
          id: 4,
          question_title: "What is the capital of England?",
          answers: [
            { id: 1, answer: "Paris", is_correct: false },
            { id: 2, answer: "London", is_correct: true },
            { id: 3, answer: "Berlin", is_correct: false },
            { id: 4, answer: "Madrid", is_correct: false },
          ],
        },
        {
          id: 5,
          question_title: "What is the capital of Italy?",
          answers: [
            { id: 1, answer: "Paris", is_correct: false },
            { id: 2, answer: "London", is_correct: false },
            { id: 3, answer: "Berlin", is_correct: false },
            { id: 4, answer: "Rome", is_correct: true },
          ],
        },
      ],
    },
  };

  const { correctAnswers, resetQuiz } = useQuizStore();

  const isSuccessful =
    correctAnswers >= pageData.attributes.quiz_questions.length / 2;

  function handleRetake() {
    resetQuiz();
    Router.push("/cpd/quiz");
  }

  return (
    <>
      <Head>
        <title>{pageData.attributes.name}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>
      <div className="w-full items-center">
        <CPDPagesHeader title="Results" />
        Results
        {isSuccessful && (
          <Link href={"/cpd/reflections"} className="place-self-center">
            <button className="m-2 rounded-md bg-orange-600 px-6 py-3 text-white transition duration-200 ease-in-out hover:scale-105">
              COMPLETE REFLECTIONS
            </button>
          </Link>
        )}
        {
          // update when data comes through}
        }
        {!isSuccessful && (
          <button
            onClick={() => handleRetake()}
            className="m-2 place-self-center rounded-md bg-orange-600 px-6 py-3 text-white transition duration-200 ease-in-out hover:scale-105"
          >
            RETAKE QUIZ
          </button>
        )}
        {pageData.attributes.horizontal_banner.data && (
          <div className="my-5">
            <Link
              href={
                pageData.attributes.horizontal_banner.data.attributes
                  .navigation_url
              }
            >
              <Image
                src={
                  pageData.attributes.horizontal_banner.data.attributes
                    .cover_image.data.attributes.url
                }
                alt={
                  pageData.attributes.horizontal_banner.data.attributes.title
                }
                width={1200}
                height={400}
                layout="responsive"
                className="h-auto"
              />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
