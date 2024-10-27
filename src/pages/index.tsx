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
  CardFooter,
} from "@/components/ui/card";
import { Icon } from "lucide-react";
import { CustomHomePageCarousel } from "@/components/CustomHomePageCarousel";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import HomePageNHSPensionForm from "@/components/HomePageNHSPensionForm";
import { HundredKButton } from "@/components/HundredKButton";
import { TestimonialCard } from "@/components/TestimonialCard";
import { HeroBanner } from "@/components/HeroBanner";
import { NHSPopupForm } from "@/components/NHSPopupForm";

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

let assetDomain = "https://assets.drjamesmartin.co.uk";
function replaceImageDomain(url: string): string {
  return url.replace(
    "https://storage.googleapis.com/dwi-dotcom-assets",
    assetDomain
  );
}

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
    <li className="flex flex-col items-center justify-center rounded-3xl border-solid bg-white px-[50px] py-[20px] shadow-custom md:px-[10px] md:pb-[25px] md:pt-[50px] lg:mx-4 lg:px-[50px]">
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
            stroke-width="10px"
            fill="none"
            className="path-1 stroke-blue-secondary"
          ></path>
          <path
            d="M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4"
            stroke-width="10px"
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
        <Button className="w-2/3 rounded-md bg-orange-400 px-3 py-4 text-white hover:bg-orange-500 ">
          <Link href={course.attributes.navigation_url}>Learn More</Link>
        </Button>
      </div>
    </li>
  );
};

export default function Home({ pageData }: { pageData: any }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Show the popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 10000); // 10 seconds

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  //replace the image url depending on breakpoint
  return (
    <main>
      <section id="popupform">
        <NHSPopupForm isVisible={isPopupVisible} onClose={closePopup} />
      </section>

      <section>
        <div className="sm:block md:hidden">
          <HeroBanner
            bannerText={pageData.hero_text}
            bannerImage={{
              url: pageData.hero_cover.data.attributes.url,
              name: pageData.hero_cover.data.attributes.alternativeText,
            }}
            subText={pageData.hero_subtext}
            ctaButton={{
              url: "https://us02web.zoom.us/meeting/register/tZIsde2orTwvHNW7CqRlCrXcrOgn2vO3xOlG",
              text: pageData.hero_button_text,
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
              url: "https://us02web.zoom.us/meeting/register/tZIsde2orTwvHNW7CqRlCrXcrOgn2vO3xOlG",
              text: pageData.hero_button_text,
            }}
          />
        </div>
      </section>

      <section
        id="founder"
        className="m-4 flex flex-col items-center space-y-4 p-4 pt-[20px] md:space-y-8 md:p-[50px] xl:flex-row-reverse"
      >
        <div className="xl:ml-[100px] xl:w-1/2 xl:space-y-8 xl:pl-[80px] xl:pr-[150px] ">
          <h3 className="text-center text-[30px] font-bold text-blue-primary md:text-[35px] md:leading-[42px]">
            {pageData.founder_text}
          </h3>
          <h6 className="my-[18px] text-center text-lg text-blue-secondary md:text-xl xl:mr-12 xl:text-wrap xl:text-left">
            {pageData.founder_subtext}
          </h6>
          {/* <BlocksRenderer content={pageData.founder_description} /> */}
          {pageData.founder_description.map((block: any) => {
            return (
              <div key={block.id}>
                <p className="my-4">{block.children[0].text}</p>
              </div>
            );
          })}
          <div className="hidden xl:block">
            <Button className="rounded-md bg-orange-400 px-[55px] py-8 text-lg text-white hover:bg-orange-500">
              <Link href={"/about"}>Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center pb-[20px]">
          <Image
            src={replaceImageDomain(
              pageData.founder_image.data.attributes.formats.large.url
            )}
            alt={pageData.founder_image.data.attributes.alternativeText}
            width={pageData.founder_image.data.attributes.width}
            height={pageData.founder_image.data.attributes.height}
            className="h-[441px] w-[315px] rounded-2xl md:max-h-[499px] md:max-w-[356px] xl:max-h-[654px] xl:max-w-[468px]"
          />
        </div>
      </section>

      <section className="bg-gray-100 py-4 text-center">
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
                className="m-6 flex h-96 flex-col justify-center rounded-[2rem] border-2 bg-white p-8 shadow-custom-br md:h-[493px] md:w-[223px] md:p-0 lg:h-[436px] lg:w-[308px] xl:h-[493px]"
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
                    className="mx-2 mb-2 mt-auto rounded-md bg-orange-400 px-4 py-3 text-white hover:text-blue-primary "
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
        <Card className="m-6 flex flex-col rounded-[2rem] border-2 bg-gradient-to-b from-blue-primary to-blue-secondary text-white shadow-2xl md:p-12 xl:mx-[120px]">
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
          className="flex flex-col items-center xl:mx-[120px] xl:flex-row"
        >
          <div
            id="text-content"
            className="text-center xl:mr-[50px] xl:flex xl:w-1/2 xl:flex-col xl:space-y-12 xl:text-left"
          >
            <h2 className="pb-[20px] text-[30px] font-bold text-blue-primary xl:text-[45px] xl:leading-[54px]">
              {pageData.why_you_familiar_title}
            </h2>
            <h6 className="font-semibold text-blue-secondary xl:text-xl">
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
        className="flex flex-col items-center bg-gray-100 p-4 text-center"
      >
        <h3 className="my-4 text-lg font-semibold text-blue-secondary md:text-xl">
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

        <HundredKButton />
      </section>

      <section id="stats">
        <div
          id="stats-container"
          className="grid grid-cols-1 space-y-2 bg-blue-secondary py-8 text-center text-white md:grid-cols-3 md:space-y-0 "
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

      <section id="testimonials" className="py-8 text-center">
        <h2 className="text-wrap text-[30px] font-bold leading-9 text-blue-primary md:mx-[120px] md:my-12 md:text-[35px]">
          {pageData.testimonials_title}
        </h2>

        <div
          id="testimonial-cards"
          className="grid grid-cols-1 md:m-8 md:auto-rows-auto md:grid-cols-2 xl:grid-cols-3"
        >
          {pageData.testimonials.data.map((testimonial: any, index: number) => {
            return (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            );
          })}
        </div>
      </section>

      <section className="flex justify-center bg-gray-200 px-[30px] py-[50px] lg:px-[50px]">
        <HomePageNHSPensionForm />
      </section>
    </main>
  );
}
