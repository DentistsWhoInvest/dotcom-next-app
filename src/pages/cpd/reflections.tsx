import React, { use } from "react";
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
//
//   return {
//     props: {
//       pageData: matchingVideo,
//       otherVideos: otherVideos,
//     },
//   };
// };

export default function Reflections({}: //   pageData,
{
  //   pageData: Video;
}) {
  const pageData = {
    attributes: {
      name: "Reflections",
      description: "",
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
      reflections_questions: [
        {
          id: 1,
          question_title: "What did you learn on the course?",
        },
        {
          id: 2,
          question_title: "How will you apply this to your practice?",
        },
        {
          id: 3,
          question_title:
            "What will you do differently as a result of this course?",
        },
        {
          id: 4,
          question_title: "What would you like to learn more about?",
        },
        {
          id: 5,
          question_title: "What are you going to do next?",
        },
        {
          id: 6,
          question_title: "Any other thoughts, reflections",
        },
      ],
    },
  };

  const { reflectionAnswers, setReflectionAnswers } = useQuizStore();
  console.log(reflectionAnswers);
  const [error, setError] = React.useState<boolean>(false);

  const handleSubmitQuiz = () => {
    if (
      Object.keys(reflectionAnswers).length !==
      pageData.attributes.reflections_questions.length
    ) {
      setError(true);
      return;
    } else {
      Router.push("/cpd/congratulations");
    }
  };

  return (
    <>
      <Head>
        <title>{pageData.attributes.name}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>

      <section className="w-full ">
        <CPDPagesHeader title="Reflections" />
        <section className="mt-12 flex flex-col justify-start space-y-12 lg:mx-auto lg:max-w-[1000px]">
          <div className="font-semibold">
            Please complete your reflections to receive your CPD/CE
          </div>
          <div className="space-y-4">
            {pageData.attributes.reflections_questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <div className="">
                  {question.id}. {question.question_title}
                </div>
                <textarea
                  className="h-32 w-full border border-blue-primary p-4"
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
            <p className="text-red-500">
              Please select answer each question
            </p>
          )}
          <div>
            <button
              onClick={() => handleSubmitQuiz()}
              className="rounded-md bg-orange-600 px-6 py-2.5 text-white transition duration-200 ease-in-out hover:scale-105"
            >
              COMPLETE REFLECTIONS
            </button>
          </div>

          {pageData.attributes.horizontal_banner.data && (
            <div className="pb-20">
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
        </section>
      </section>
    </>
  );
}
