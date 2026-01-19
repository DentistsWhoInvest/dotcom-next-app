import React, { useEffect, useState } from "react";
import Head from "next/head";
import CPDPagesHeader from "@/components/CPDPagesHeader";
import Link from "next/link";
import Image from "next/image";
import { useQuizStore } from "@/stores/quizStore";
import { fetchEndpointData } from "@/lib/fetchUtils";
import TextInput from "@/components/TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { fetchCPD } from "@/lib/cpdFetchUtil";

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

type QuizCongratulationsAttributes = {
  aims: any;
  course_name: string;
  form_id: number;
  slug?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  course_duration: string;
  form_horizontal_banner: Banner;
  page_metadata?: PageMetadata;
};

type QuizCongratulations = {
  id: number;
  attributes: QuizCongratulationsAttributes;
};

interface ShowErrorObject {
  type: string;
  message: string;
}

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

export default function Congratulations({
  pageData,
}: {
  pageData: QuizCongratulations;
}) {
  const { reflectionAnswers, resetReflectionAnswers } = useQuizStore();
  const quizReflectionAnswers = reflectionAnswers[pageData.id] || [];
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && quizReflectionAnswers.length === 0) {
      window.location.href = `/cpd/${pageData.id}/aims`;
    }
  }, [isLoaded, quizReflectionAnswers, pageData.id]);

  const [firstName, setFirstName] = useState<string | "">("");
  const [lastName, setLastName] = useState<string | "">("");
  const [gdcNumberEntry, setGDCNumberEntry] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const gdcNumber = Number(gdcNumberEntry);

  const [error, setError] = useState<ShowErrorObject | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSuccessfullySubmitted, setHasSuccessfullySubmitted] =
    useState<boolean>(false);
  const [certificateLink, setCertificateLink] = useState<string | null>(null);

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const validate = () => {
    setError(null);
    let isError = false;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // todo: add case where it's not numbers
    if (!firstName) {
      setError({ type: "firstname", message: "Please enter your first name" });
      isError = true;
    } else if (!lastName) {
      setError({ type: "lastname", message: "Please enter your last name" });
      isError = true;
    } else if (!gdcNumber) {
      setError({ type: "gdc", message: "Please enter your GDC Number" });
      isError = true;
    } else if (isNaN(gdcNumber)) {
      setError({ type: "gdc", message: "Please enter a valid GDC Number" });
      isError = true;
    } else if (!email) {
      setError({ type: "email", message: "An Email is required" });
      isError = true;
    } else if (!reg.test(email)) {
      setError({ type: "email", message: "The Email is not valid" });
      isError = true;
    }
    return isError;
  };
  async function sendForm() {
    setIsLoading(true);

    const learningObjectives = pageData.attributes.aims.flatMap((aim: any) =>
      aim.children.flatMap((listItem: any) =>
        listItem.children.map((child: any) => child.text)
      )
    );
    const formattedReflectionAnswers = quizReflectionAnswers.map(
      ({ question, answer }) => ({
        question,
        answer,
      })
    );

    const formData = {
      firstName: firstName,
      lastName: lastName,
      GDC_number: gdcNumber,
      courseName: pageData.attributes.course_name,
      courseId: pageData.id,
      emailAddress: email,
      duration: pageData.attributes.course_duration,
      learningObjectives: learningObjectives,
      reflections: formattedReflectionAnswers,
    };
    try {
      const response = await fetch(
        "https://europe-west2-electric-node-426223-s2.cloudfunctions.net/pdf-generator/generate-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("success");
        setIsLoading(false);
        setHasSuccessfullySubmitted(true);
        const text = await response.text();
        setCertificateLink(text);
        resetReflectionAnswers(pageData.id);
      } else {
        console.log("error");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  function OpenCertificate() {
    {
      certificateLink && window.open(certificateLink, "_blank");
    }
  }

  return (
    <>
      <Head>
        <title>
          DWI CPD Complete:{" "}
          {pageData.attributes.page_metadata?.title ||
            pageData.attributes.course_name}
        </title>
        <meta
          name="title"
          content={
            "DWI CPD Complete: " +
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
        <CPDPagesHeader title="Congratulations" />

        <section className="mx-3 space-y-12 lg:mx-auto lg:max-w-[1000px]">
          <div className="mt-8 flex flex-col items-center justify-center gap-4 place-self-center bg-white px-2 pb-12 pt-8 md:mt-20 md:px-14 lg:max-w-[600px]">
            <div className="mx-4 flex flex-col text-center text-2xl font-semibold text-blue-primary md:flex-row">
              Type your details below to receive your certificate via email
            </div>
            <div id="form" className="mt-2 flex w-full flex-col gap-2">
              <TextInput
                string={firstName}
                placeholder="First Name"
                onUpdate={setFirstName}
                inputType="text"
                error={showError("firstname")}
              />

              <TextInput
                string={lastName}
                placeholder="Last Name"
                onUpdate={setLastName}
                inputType="text"
                error={showError("lastname")}
              />

              <TextInput
                string={gdcNumberEntry}
                placeholder="GDC Number"
                onUpdate={setGDCNumberEntry}
                inputType="text"
                error={showError("gdc")}
              />

              <TextInput
                string={email}
                placeholder="Email"
                onUpdate={setEmail}
                inputType="email"
                error={showError("email")}
              />
            </div>
            <div className="flex flex-col gap-4 text-sm italic">
              <p>
                *If you have any issues receiving your certificate please{" "}
                <u>
                  <em>
                    <a
                      href={
                        "mailto:info@dentistswhoinvest.com?subject=Problems%20with%20my%20course%20certificate%20for%20course%20%23" +
                        pageData.id +
                        "&body=Hi,%0A%0AI%20just%20submitted%20my%20details%20for%20my%20certificate,%20but%20I%20need%20some%20help,%0A%0AThe%20problem%20is%20"
                      }
                    >
                      Email Us
                    </a>
                  </em>
                </u>
              </p>
              <p>
                **By submitting my email I consent to join the Dentists Who
                Invest email list. This list can be left at any time.
              </p>
            </div>
            <div className="mt-4 flex place-self-start">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <BiLoaderCircle className="animate-spin-slow" size="25" />
                  <p>
                    We are generating your certificate, this may take a few
                    seconds...
                  </p>
                </div>
              ) : hasSuccessfullySubmitted ? (
                <div className="flex flex-col items-center gap-1">
                  <p className="-mt-1 mb-4">Your certificate is ready!</p>
                  {certificateLink && (
                    <button
                      onClick={OpenCertificate}
                      className="mb-4 rounded-md bg-orange-600 px-8 py-2.5 text-white transition duration-200 ease-in-out hover:scale-105"
                    >
                      View your certificate
                    </button>
                  )}
                  <p className="text-center text-sm italic">
                    It has also been sent to your email.
                  </p>
                  <p className="text-center text-sm italic">
                    (Please check your promotional or spam folder too.)
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!validate()) {
                      sendForm();
                    }
                  }}
                  className="rounded-md bg-orange-600 px-8 py-2.5 text-white transition duration-200 ease-in-out hover:scale-105"
                >
                  Submit
                </button>
              )}
            </div>
          </div>

          <div className="lg:mx-auto lg:max-w-[1000px]">
            {pageData.attributes.form_horizontal_banner.data && (
              <div className="mx-3 pb-20 lg:mx-0">
                <Link
                  href={
                    pageData.attributes.form_horizontal_banner.data.attributes
                      .navigation_url
                  }
                >
                  <Image
                    src={
                      pageData.attributes.form_horizontal_banner.data.attributes
                        .cover_image.data.attributes.url
                    }
                    alt={
                      pageData.attributes.form_horizontal_banner.data.attributes
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
          </div>
        </section>
      </section>
    </>
  );
}
