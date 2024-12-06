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
  return (
    <>
      <Head>
        <title>Dentists Who Invest</title>
        <meta
          name="description"
          content="Dentists Who Invest homepage, detailing courses we offer, information on the founder, and content we've created for dentists"
        />
      </Head>
      <main className="space-y-12 bg-gray-100 lg:px-[50px]">
        <section className="lg:bg-blue-primary lg:px-12" id="latest content">
          <FrontSectionTitle title={"Latest Contents"} />
          <div className="mx-3 flex-col space-y-4 pt-6">
            <HomePageContentCard
              size="large"
              title={sampleContent.title}
              type={sampleContent.type}
              url={sampleContent.url}
              imageUrl={sampleContent.imageUrl}
              imageAlt={""}
              description={sampleContent.description}
            />{" "}
            <div className="flex space-x-8">
              <HomePageContentCard
                size={sampleContent.size}
                title={sampleContent.title}
                type={sampleContent.type}
                url={sampleContent.url}
                imageUrl={sampleContent.imageUrl}
                imageAlt={""}
                description={sampleContent.description}
              />
              <HomePageContentCard
                size={sampleContent.size}
                title={sampleContent.title}
                type={sampleContent.type}
                url={sampleContent.url}
                imageUrl={sampleContent.imageUrl}
                imageAlt={""}
                description={sampleContent.description}
              />
              <HomePageContentCard
                size={sampleContent.size}
                title={sampleContent.title}
                type={sampleContent.type}
                url={sampleContent.url}
                imageUrl={sampleContent.imageUrl}
                imageAlt={""}
                description={sampleContent.description}
              />
            </div>
          </div>
        </section>
        <section className="" id="popular content">
          <FrontSectionTitle title={"popular content"} />
          <div className="flex-col space-y-4 mx-3">
            <div className="flex space-x-8">
              <HomePageContentCard
                size={sampleContent.size}
                title={sampleContent.title}
                type={sampleContent.type}
                url={sampleContent.url}
                imageUrl={sampleContent.imageUrl}
                imageAlt={""}
                description={sampleContent.description}
              />
              <HomePageContentCard
                size={sampleContent.size}
                title={sampleContent.title}
                type={sampleContent.type}
                url={sampleContent.url}
                imageUrl={sampleContent.imageUrl}
                imageAlt={""}
                description={sampleContent.description}
              />
              <HomePageContentCard
                size={sampleContent.size}
                title={sampleContent.title}
                type={sampleContent.type}
                url={sampleContent.url}
                imageUrl={sampleContent.imageUrl}
                imageAlt={""}
                description={sampleContent.description}
              />
            </div>
            <div className="flex space-x-8">
              <HomePageContentCard
                size={sampleContent.size}
                title={sampleContent.title}
                type={sampleContent.type}
                url={sampleContent.url}
                imageUrl={sampleContent.imageUrl}
                imageAlt={""}
                description={sampleContent.description}
              />
              <HomePageContentCard
                size={sampleContent.size}
                title={sampleContent.title}
                type={sampleContent.type}
                url={sampleContent.url}
                imageUrl={sampleContent.imageUrl}
                imageAlt={""}
                description={sampleContent.description}
              />
              <HomePageContentCard
                size={sampleContent.size}
                title={sampleContent.title}
                type={sampleContent.type}
                url={sampleContent.url}
                imageUrl={sampleContent.imageUrl}
                imageAlt={""}
                description={sampleContent.description}
              />
            </div>
          </div>
        </section>

        <section className="mx-3" id="banner">
          <Image
            src="https://assets.dentistswhoinvest.com/understand_how_to_invest_as_a_dentist_horizontal_07b3de41c2/understand_how_to_invest_as_a_dentist_horizontal_07b3de41c2.webp"
            alt={""}
            width={350}
            height={300}
          />
        </section>

        <section className="" id="follow us">
          <FrontSectionTitle title={"follow us"} />
          <div className="mx-3 flex justify-center gap-2">
            <div id="socials" className="w-1/2 flex-col bg-white shadow-custom-br lg:w-full">
              <Image
                src={pageData.hero_cover.data.attributes.url}
                alt={pageData.hero_cover.data.attributes.name}
                width={pageData.hero_cover.data.attributes.width}
                height={pageData.hero_cover.data.attributes.height}
                className="h-2/3 w-full "
              />
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
            <div id="cta" className="w-1/2 flex-col bg-white shadow-custom-br lg:w-full">
              <Image
                src={pageData.hero_cover.data.attributes.url}
                alt={pageData.hero_cover.data.attributes.name}
                width={pageData.hero_cover.data.attributes.width}
                height={pageData.hero_cover.data.attributes.height}
                className="h-2/3 w-full"
              />
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
          <FrontSectionTitle title={"meet the founder"} />
          <section
            id="founder"
            className="mx-3 flex flex-col items-center bg-white shadow-custom-br lg:flex-row"
          >
            <Image
              src={pageData.founder_image.data.attributes.url}
              alt={pageData.founder_image.data.attributes.name}
              width={pageData.founder_image.data.attributes.width}
              height={pageData.founder_image.data.attributes.height}
              className="lg:max-w-1/3 object-cover lg:size-1/4 "
            />
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
          <FrontSectionTitle title={"what we do for dentists"} />
          {pageData.what_we_do_reasons.map((reason: ReasonData) => {
            console.log("reason", reason);
            return (
              <div
                key={reason.id}
                className="mx-3 my-2 flex bg-blue-primary text-white"
              >
                <p className="p-4 text-[50px] font-semibold">{reason.id}</p>
                <div className="flex flex-col self-center pr-4">
                  <p className="pb-2 text-base lg:text-xl">{reason.title}</p>
                  <div className="text-[10px]"><BlocksRenderer content={reason.description}/></div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="" id="testimonials">
          <FrontSectionTitle title={"check out what our members say..."} />

          <div
            id="testimonial-cards"
            className="mx-3 grid grid-cols-1 gap-4 md:auto-rows-auto md:grid-cols-3 xl:mx-auto xl:max-w-[1200xp] xl:px-[150px]"
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

        {/* <section>
          <div className="sm:block md:hidden">
            <HeroBanner
              bannerText={pageData.hero_text}
              bannerImage={{
                url: pageData.hero_cover.data.attributes.url,
                name: pageData.hero_cover.data.attributes.alternativeText,
              }}
              subText={pageData.hero_subtext}
              ctaButton={{
                url: pageData.hero_button_navigation_url,
                text: pageData.hero_button_text,
                description: pageData.hero_button_link_description,
              }}
            />
          </div>
          <div className="sm:hidden md:block">
            <HeroBanner
              bannerText={pageData.hero_text}
              bannerImage={{
                url: pageData.hero_cover.data.attributes.url,
                name: pageData.hero_cover.data.attributes.alternativeText,
              }}
              subText={pageData.hero_subtext}
              ctaButton={{
                url: pageData.hero_button_navigation_url,
                text: pageData.hero_button_text,
                description: pageData.hero_button_link_description,
              }}
            />
          </div>
        </section>

        <section
          id="founder"
          className="m-4 flex flex-col items-center space-y-4 p-4 pt-[20px] md:space-y-8 md:p-[50px] lg:px-2 lg:flex-row-reverse lg:justify-center lg:max-w-[1140px] lg:mx-auto "
        >
          <div className="lg:w-1/2 lg:mx-8">
            <h3 className="text-center text-[30px] font-bold text-blue-primary md:text-[35px] md:leading-[42px] ">
              {pageData.founder_text}
            </h3>
            <h6 className="my-[18px] text-center text-lg text-blue-secondary md:text-xl xl:mr-12 xl:text-wrap xl:text-left lg:my-[25px]">
              {pageData.founder_subtext}
            </h6>
            {pageData.founder_description.map((block: any) => {
              return (
                <div key={block.id}>
                  <p className="my-2 md:my-4 lg:my-12">
                    {block.children[0].text}
                  </p>
                </div>
              );
            })}
            <div className="hidden lg:block">
              <Button className="rounded-md bg-orange-600 px-[55px] py-8 text-lg text-white hover:bg-orange-500">
                <Link href={"/about"}>Learn More</Link>
              </Button>
            </div>
          </div>
          <Image
            src={pageData.founder_image.data.attributes.formats.large.url}
            alt={pageData.founder_image.data.attributes.alternativeText}
            width={pageData.founder_image.data.attributes.width}
            height={pageData.founder_image.data.attributes.height}
            // className="h-[441px] w-[315px] rounded-2xl object-cover md:max-h-[499px] md:max-w-[356px] xl:max-h-[654px] xl:max-w-[468px]"
            className="size-full rounded-xl object-cover md:max-h-[700px] md:max-w-[500px] lg:max-h-[654px] lg:max-w-1/2 lg:w-1/2 lg:mr-[50px]"
          />
        </section>

        <section className="bg-gray-100 py-2 text-center">
          <h2 className="px-[30px] pt-[30px] text-[30px] font-bold text-blue-primary xl:p-8 xl:text-[50px]">
            {pageData.what_we_do_title}
          </h2>
          <div className="grid grid-cols-1 place-items-center md:grid-cols-3 xl:mx-[150px]">
            {pageData.what_we_do_reasons.map((reason: any) => {
              let lottieVar;
              if (reason.lottie_name === "treasure") {
                lottieVar = lottieTreasure;
              } else if (reason.lottie_name === "project") {
                lottieVar = lottieProject;
              } else {
                lottieVar = lottieRocket;
              }
              return (
                <div
                  key={reason.id}
                  className="m-6 flex h-96 flex-col justify-center rounded-[2rem] border-2 bg-white p-8 shadow-custom-br md:h-[415px] md:w-[245px] md:p-0 lg:h-[436px] lg:w-[308px] xl:h-[493px]"
                >
                  <div className="flex grow flex-col p-6 pt-0 text-center">
                    <div className="mx-auto my-4 size-20 xl:size-40">
                      <Lottie
                        animationData={lottieVar}
                        loop={true}
                        width="200"
                        height="200"
                      />
                    </div>
                    <CardTitle className="p-2 text-lg font-bold text-blue-primary md:text-xl lg:mx-8 xl:mx-0">
                      <p>{reason.title}</p>
                    </CardTitle>
                    <CardDescription className="mt-auto p-2 text-grey-primary md:p-0">
                      {reason.description.map((block: any) => {
                        return (
                          <div key={block.id}>
                            <p>{block.children[0].text}</p>
                          </div>
                        );
                      })}
                    </CardDescription>
                    <Link
                      href={reason.cta_navigation_url}
                      aria-label={reason.cta_navigation_description}
                      className="mx-2 mb-2 mt-auto max-w-[195px] place-self-center rounded-md bg-orange-600 px-4 py-3 text-white hover:text-blue-primary"
                    >
                      <button>{reason.cta_text}</button>
                    </Link>{" "}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <Card className="m-6 flex flex-col rounded-[2rem] border-0 bg-gradient-to-b from-blue-primary to-blue-secondary text-white shadow-2xl md:mx-12 md:p-12 lg:mx-auto lg:max-w-[1140px]">
            <CardTitle className="p-8 text-center text-2xl font-bold md:text-[35px] xl:mx-[200px] xl:text-[50px] xl:leading-[56px]">
              {pageData.why_you_title}
            </CardTitle>
            <div className="md:mx-14 xl:mx-[240px]">
              {pageData.why_you_reasons.map((reason: any, index: number) => {
                return (
                  <div key={reason.id}>
                    <CardContent className="flex flex-row space-x-2 text-left">
                      <Image
                        src={"/tick-in-circle-orange.svg"}
                        alt="Checkmark"
                        width="40"
                        height="40"
                      />
                      <div>
                        <p
                          className="text-xl font-semibold md:max-w-[90%] xl:font-normal"
                          key={reason.id}
                        >
                          {reason.reason}
                        </p>
                        <div className="md:hidden">
                          {index < pageData.why_you_reasons.length - 1 && (
                            <div className="mx-6 my-2 border border-orange-400" />
                          )}
                        </div>
                        <div className="my-2 hidden border border-orange-400 md:block" />
                      </div>
                    </CardContent>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        <section id="familiar-section" className="p-4">
          <div
            id="container"
            className="flex flex-col items-center lg:mx-auto lg:max-w-[1140px] lg:flex-row"
          >
            <div
              id="text-content"
              className="text-center lg:mr-[50px] lg:flex lg:w-1/2 lg:flex-col lg:space-y-12 lg:text-left"
            >
              <h2 className="pb-[20px] text-[30px] font-bold text-blue-primary lg:text-[45px] lg:leading-[54px]">
                {pageData.why_you_familiar_title}
              </h2>
              <h6 className="font-semibold text-blue-secondary lg:text-xl">
                {pageData.why_you_familiar_subtitle}
              </h6>
            </div>

            <div id="carousel-container">
              <CustomHomePageCarousel
                thoughts={pageData.why_you_familiar_thoughts}
              />
            </div>
          </div>
        </section>

        <section
          id="enrolment"
          className="flex flex-col items-center bg-gray-200 p-4 text-center"
        >
          <h3 className="my-4 text-lg font-semibold text-blue-primary md:text-xl">
            {pageData.courses_subtitle}
          </h3>
          <h2 className="text-[30px] font-bold text-blue-primary md:text-[35px]">
            {pageData.courses_title}
          </h2>
          <p className="my-4">{pageData.courses_description}</p>
          <div
            id="courses"
            className="mt-16 grid grid-cols-1 space-y-20 md:grid-cols-2 md:gap-8 md:space-y-0"
          >
            {pageData.courses.data.map((course: any) => {
              return <HomePageCourseCard key={course.id} course={course} />;
            })}
          </div>
        </section>

        <section id="stats">
          <div
            id="stats-container"
            className="grid grid-cols-1 space-y-2 bg-blue-tertiary py-8 text-center text-white md:grid-cols-3 md:space-y-0 "
          >
            {pageData.metrics.map((metric: any) => {
              return (
                <div id="stat" key={metric.id}>
                  <h2 className="text-[45px] font-bold leading-[1.2em]">
                    <MetricCounter value={metric.value} />
                  </h2>
                  <p className="text-xl">{metric.title}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="testimonials" className="bg-white py-8 text-center">
          <h2 className="text-wrap text-[30px] font-bold leading-9 text-blue-primary md:mx-[120px] md:my-12 md:text-[35px]">
            {pageData.testimonials_title}
          </h2>

          <div
            id="testimonial-cards"
            // className="grid grid-cols-1 md:m-8 md:auto-rows-auto md:grid-cols-2 xl:grid-cols-3"
            className="grid grid-cols-1 px-2 md:auto-rows-auto md:grid-cols-2 md:px-[50px] lg:grid-cols-3 xl:mx-auto xl:max-w-[1200xp] xl:px-[150px]"
          >
            {pageData.testimonials.data.map(
              (testimonial: any, index: number) => {
                return (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                  />
                );
              }
            )}
          </div>
        </section> */}

        <section
          className="mx-3 flex justify-center bg-gray-100 py-[50px] lg:px-[50px]"
          id="tax relief form"
        >
          <HomepageFreeTaxReliefForm />
        </section>
      </main>
    </>
  );
}
