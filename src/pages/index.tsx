/* eslint-disable tailwindcss/no-custom-classname */
import { fetchEndpointData } from "@/lib/fetchUtils";
// import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import lottieProject from "../../public/animations/project.json";
import lottieRocket from "../../public/animations/rocket.json";
import lottieTreasure from "../../public/animations/treasure.json";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CustomHomePageCarousel } from "@/components/CustomHomePageCarousel";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import { HeroBanner } from "@/components/HeroBanner";
import { FreeTaxReliefPopupForm } from "@/components/FreeTaxReliefPopupForm";
import Head from "next/head";
import HomepageFreeTaxReliefForm from "@/components/HomepageFreeTaxReliefForm";
import { FrontSectionTitle } from "@/components/FrontSectionTitle";
import { HomePageTestimonialCard } from "@/components/HomePageTestimonialCard";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { HomePageContentCard } from "@/components/HomePageContentCard";

type TextNode = {
  text: string;
  type: string;
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
  id: number;
  attributes: ImageAttributes;
};

type Cover = {
  data: ImageData;
};

type FounderDescription = Paragraph[];

type Thought = {
  id: number;
  title: string;
  cover: Cover;
};

type Reason = {
  id: number;
  reason: string;
};

type Metric = {
  id: number;
  value: number;
  title: string;
};

type Review = Paragraph[];

type TestimonialAttributes = {
  title: string;
  review: Review;
  author: string;
  author_job_location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author_thumbnail: {
    data: ImageData;
  };
};

type TestimonialData = {
  id: number;
  attributes: TestimonialAttributes;
};

type Testimonials = {
  data: TestimonialData[];
};

type CourseAttributes = {
  title: string;
  description: string;
  cta_text: string;
  navigation_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tagline: string;
  cover: Cover;
};

type CourseData = {
  id: number;
  attributes: CourseAttributes;
};

type Courses = {
  data: CourseData[];
};

type ReasonData = {
  id: number;
  lottie_name: string;
  title: string;
  description: any;
  cta_text: string;
  cta_navigation_url: string;
  cta_navigation_description: string;
  cta_navigation_is_internal: boolean;
};

// type ReasonData = {
//   id: number;
//   attributes: ReasonAttributes;
// };

type WhatWeDoReasons = ReasonData[];

type HomePageAttributes = {
  hero_text: string;
  hero_subtext: string;
  hero_button_text: string;
  founder_text: string;
  founder_subtext: string;
  founder_description: FounderDescription;
  what_we_do_title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  why_you_title: string;
  founder_cta_text: string;
  why_you_familiar_title: string;
  why_you_familiar_subtitle: string;
  courses_title: string;
  courses_subtitle: string;
  courses_description: string;
  testimonials_title: string;
  founder_cta_link_description: string;
  hero_button_navigation_url: string;
  hero_button_link_description: string;
  why_you_familiar_thoughts: Thought[];
  hero_cover: {
    data: ImageData;
  };
  founder_image: {
    data: ImageData;
  };
  what_we_do_reasons: WhatWeDoReasons;
  why_you_reasons: Reason[];
  metrics: Metric[];
  testimonials: Testimonials;
  courses: Courses;
};

type HomePage = {
  id: number;
  attributes: HomePageAttributes;
};

export const getStaticProps = async () => {
  const populateFields = [
    "why_you_familiar_thoughts.cover",
    "hero_cover",
    "founder_image",
    "what_we_do_reasons",
    "why_you_reasons",
    "metrics",
    "testimonials",
    "testimonials.author_thumbnail",
    "courses.cover",
  ];
  const pageData = await fetchEndpointData("/home", populateFields);
  return {
    props: {
      pageData: pageData.data.attributes,
    },
  };
};

const MetricCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after it becomes visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // think it's working as intended
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let isMounted = true;
      const duration = 1000; // Duration of the animation in milliseconds
      const incrementTime = 10; // Time between increments in milliseconds
      const totalSteps = duration / incrementTime; // Total number of increments
      const incrementValue = Math.ceil(value / totalSteps); // Calculate increment value

      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount + incrementValue >= value) {
            clearInterval(interval);
            return value; // Ensure we don't exceed the target value
          }
          return prevCount + incrementValue;
        });
      }, incrementTime);

      return () => {
        isMounted = false; // Cleanup
        clearInterval(interval);
      };
    }
  }, [isVisible, value]);

  return (
    <span id="community-members" ref={ref}>
      {/* does some math to display 1000 as 1K, which looks nicer */}
      {count > 1000 ? (
        <span>{(Math.ceil(count / 1000) * 1000) / 1000}K+</span>
      ) : (
        <span>{count}+</span>
      )}
    </span>
  );
};

const HomePageCourseCard = ({ course }: { course: any }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-solid bg-white px-[50px] py-[20px] shadow-custom md:px-[10px] md:pb-[25px] md:pt-[50px] lg:mx-4 lg:px-[50px]">
      <div className="">
        <Image
          src="/DWI-logo-circle.webp"
          alt="Course Logo"
          width={120}
          height={120}
          className="mt-[-80px] rounded-3xl"
        />
      </div>

      <div className="relative w-full bg-blue-primary pb-4 pt-2 text-center font-bold text-white transition-all duration-300">
        <h2 className="text-xl">{course.attributes.tagline}</h2>
        <svg
          className="absolute left-1/2 top-1/2 z-[2] w-[calc(60%)] -translate-x-1/2 -translate-y-1/2 overflow-visible lg:w-[calc(50%)] lg:py-3 xl:pb-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <path
            d="M5,125.4c30.5-3.8,137.9-7.6,177.3-7.6c117.2,0,252.2,4.7,312.7,7.6"
            strokeWidth="10px"
            fill="none"
            className="path-1 stroke-blue-secondary"
          ></path>
          <path
            d="M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4"
            strokeWidth="10px"
            fill="none"
            className="path-2 stroke-blue-secondary"
          ></path>
        </svg>
        <style jsx>{`
          @keyframes draw {
            0% {
              stroke-dasharray: 0, 2500; /* Start with no visible stroke */
              opacity: 0;
            }
            10% {
              stroke-dasharray: 0, 2500; /* Start with no visible stroke */
              opacity: 1;
            }
            20% {
              stroke-dasharray: 2500, 0; /* Complete visible stroke */
              opacity: 1;
            }
            80% {
              stroke-dasharray: 2500, 0; /* Keep the stroke */
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }

          .path-1 {
            animation: draw 8s forwards; /* Animate drawing and fading */
            animation-iteration-count: infinite;
          }

          .path-2 {
            animation: draw 8s forwards; /* Animate drawing and fading */
            animation-delay: 0.5s;
            animation-iteration-count: infinite;
          }
        `}</style>
      </div>

      <div className="flex flex-col items-center p-4 pt-8 md:grow">
        <Image
          src={course.attributes.cover.data.attributes.url}
          alt={course.attributes.title}
          width={180}
          height={440}
          className="md:w-[234px] lg:w-[362px]"
        />{" "}
        <p className="mb-4 text-sm font-semibold text-blue-primary md:mt-8 md:text-xl">
          {course.attributes.description}
        </p>
        <Button className="w-2/3 rounded-md bg-orange-600 px-3 py-4 text-white hover:bg-orange-500 ">
          <Link href={course.attributes.navigation_url}>Course Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default function Home({ pageData }: { pageData: HomePageAttributes }) {
  console.log("pageData", pageData);
  const title = "Popular content";
  const sampleContent = {
    size: "medium",
    title: "Why business planning...",
    type: "Article",
    description: "Some stuff here",
    url: "Test",
    imageUrl:
      "https://assets.dentistswhoinvest.com/sarah_grace_profile_be4c1f5882/sarah_grace_profile_be4c1f5882.jpg",
    imageAlt: "Test",
  };

  const latestContent = Array(4).fill(sampleContent);
  const popularContent = Array(6).fill(sampleContent);
  return (
    <>
      <Head>
        <title>Dentists Who Invest</title>
        <meta
          name="description"
          content="Dentists Who Invest homepage, detailing courses we offer, information on the founder, and content we've created for dentists"
        />
      </Head>
      <main className="space-y-12 bg-gray-100 lg:px-[150px] lg:pt-8">
        <section className="lg:bg-blue-primary lg:p-8 " id="latest content">
          <FrontSectionTitle title={"Latest Contents"} />
          <div className="mx-3 grid grid-cols-2 gap-8 lg:grid-cols-3">
            {latestContent.map((content, index) => (
              <div
                key={index}
                className={`${index === 0 ? "col-span-full" : "col-span-1"} 
                ${index === 3 ? "hidden lg:block" : ""}
              `}
              >
                <HomePageContentCard
                  size={index === 0 ? "splash" : "large"}
                  title={content.title}
                  type={content.type}
                  url={content.url}
                  imageUrl={content.imageUrl}
                  imageAlt={content.imageAlt}
                  description={content.description}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="" id="popular content">
          <FrontSectionTitle title={"Popular content"} />

          <div className="mx-3 grid gap-8 sm:grid-cols-1 lg:mx-0 lg:grid-cols-3">
            {popularContent.map((content, index) => (
              <HomePageContentCard
                key={index}
                size="medium"
                title={content.title}
                type={content.type}
                url={content.url}
                imageUrl={content.imageUrl}
                imageAlt={content.imageAlt}
                description={content.description}
              />
            ))}
          </div>
        </section>

        <section className="mx-3 lg:mx-0" id="banner">
          <Image
            src="https://assets.dentistswhoinvest.com/understand_how_to_invest_as_a_dentist_horizontal_07b3de41c2/understand_how_to_invest_as_a_dentist_horizontal_07b3de41c2.webp"
            alt={""}
            width={350}
            height={300}
          />
        </section>

        <section className="" id="follow us">
          <FrontSectionTitle title={"Follow us"} />
          <div className="mx-3 flex justify-center gap-2 lg:mx-0">
            <div
              id="socials"
              className="w-1/2 flex-col bg-white shadow-custom-br lg:w-full"
            >
              {" "}
              <div
                className="relative h-2/3 w-full"
                style={{ aspectRatio: "5 / 3" }}
              >
                <Image
                  src={pageData.hero_cover.data.attributes.url}
                  alt={pageData.hero_cover.data.attributes.name}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <div className="mx-1 flex h-1/3 items-center justify-between space-x-1 lg:mx-12">
                <p className="self-center text-nowrap bg-blue-primary px-1 text-[10px] text-white lg:px-4 lg:text-lg">
                  FOLLOW US:
                </p>
                <div className="flex flex-row space-x-1 lg:space-x-3">
                  <Link
                    href={"https://www.facebook.com/groups/dentistswhoinvest"}
                  >
                    <Image
                      src="https://assets.dentistswhoinvest.com/Facebook_Logo_Primary_357f62df13/Facebook_Logo_Primary_357f62df13.webp"
                      alt="Facebook"
                      width={30}
                      height={30}
                      className="md:size-[70px]"
                    ></Image>
                  </Link>
                  <Link href={"https://www.linkedin.com/in/dr-james-martin/"}>
                    <Image
                      src="https://assets.dentistswhoinvest.com/linkedin_logo_681e6eb0d0/linkedin_logo_681e6eb0d0.webp"
                      alt="Linked in"
                      width={30}
                      height={30}
                      className="md:size-[70px]"
                    ></Image>
                  </Link>
                  <Link href={"https://www.instagram.com/dentistswhoinvest/"}>
                    <Image
                      src="https://assets.dentistswhoinvest.com/Instagram_Glyph_Gradient_0fde9ef993/Instagram_Glyph_Gradient_0fde9ef993.webp"
                      alt="Instagram"
                      width={30}
                      height={30}
                      className="md:size-[70px]"
                    ></Image>
                  </Link>
                </div>
              </div>
            </div>
            <div
              id="cta"
              className="w-1/2 flex-col bg-white shadow-custom-br lg:w-full"
            >
              <div
                className="relative h-2/3 w-full"
                style={{ aspectRatio: "5 / 3" }}
              >
                <Image
                  src={pageData.hero_cover.data.attributes.url}
                  alt={pageData.hero_cover.data.attributes.name}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <div className="mx-1 flex h-1/3 items-center justify-center space-x-1 lg:mx-12">
                <button className="text-nowrap bg-orange-400 px-2 py-1 text-[10px] text-white lg:py-8 lg:text-lg">
                  <Link href={pageData.hero_button_navigation_url}>
                    {pageData.hero_button_text}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="" id="meet the founder">
          <FrontSectionTitle title={"Meet the founder"} />
          <section
            id="founder"
            className="mx-3 flex flex-col items-center bg-white shadow-custom-br lg:mx-0 lg:flex-row"
          >
            <div
              className="relative size-full"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image
                src={pageData.founder_image.data.attributes.url}
                alt={pageData.founder_image.data.attributes.name}
                layout="fill"
                className="object-cover"
              />
            </div>
            <div className="m-4 space-y-2 text-left lg:mx-[50px] lg:w-3/4 lg:space-y-8">
              <h3 className="pb-2 text-lg text-blue-primary md:text-xl lg:text-lg xl:mr-12 xl:text-wrap xl:text-left">
                {pageData.founder_subtext}
              </h3>
              {pageData.founder_description.map((block: any) => {
                return (
                  <div key={block.id}>
                    <p className="text-xs">{block.children[0].text}</p>
                  </div>
                );
              })}
              <Link href={"/about"} className="text-xs text-blue-primary">
                Read More...
              </Link>
            </div>
          </section>
        </section>

        <section className="" id="what we do">
          <FrontSectionTitle title={"What we do for dentists"} />
          {pageData.what_we_do_reasons.map((reason: ReasonData) => {
            console.log("reason", reason);
            return (
              <div
                key={reason.id}
                className="mx-3 my-2 flex bg-blue-primary text-white lg:mx-0"
              >
                <p className="p-4 text-[50px] font-semibold">{reason.id}</p>
                <div className="flex flex-col self-center pr-4">
                  <p className="pb-2 text-base lg:text-xl">{reason.title}</p>
                  <div className="text-[10px]">
                    <BlocksRenderer content={reason.description} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="" id="testimonials">
          <FrontSectionTitle title={"check out what our members say..."} />

          <div
            id="testimonial-cards"
            className="mx-3 grid grid-cols-1 gap-4 md:auto-rows-auto md:grid-cols-3 lg:mx-0 xl:mx-auto xl:max-w-[1200xp] xl:px-[150px]"
          >
            {pageData.testimonials.data.map(
              (testimonial: any, index: number) => {
                return (
                  <HomePageTestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                  />
                );
              }
            )}
          </div>
        </section>

        <section
          className="mx-3 flex justify-center bg-gray-100 py-[50px] lg:mx-0"
          id="tax relief form"
        >
          <HomepageFreeTaxReliefForm />
        </section>
      </main>
    </>
  );
}
