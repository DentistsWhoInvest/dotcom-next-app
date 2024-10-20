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
    <li className="shadow-custom flex flex-col justify-center rounded-3xl border-solid bg-white py-[20px] px-[50px] items-center md:px-[10px] md:pt-[50px] md:pb-[25px] lg:px-[50px] lg:mx-4">
      <div className="">
        <Image
          src="/DWI-logo-circle.webp"
          alt="Course Logo"
          width={120}
          height={120}
          className="rounded-3xl mt-[-80px]"
        />
      </div>

      <div className="relative transition-all duration-300 bg-blue-primary pt-2 pb-4 w-full text-center font-bold text-white">
        <h2 className="text-xl">{course.attributes.tagline}</h2>
        <svg
          className="xl:pb-5 lg:py-3 absolute left-1/2 top-1/2 z-[2] lg:w-[calc(50%)] w-[calc(60%)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
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

      <div className="flex flex-col items-center p-4 md:grow pt-8">
        <Image
          src={course.attributes.cover.data.attributes.url}
          alt={course.attributes.title}
          width={180}
          height={440}
          className="md:w-[234px] lg:w-[362px]"
        />{" "}
        <p className="mb-4 text-sm text-blue-primary md:text-xl md:mt-8 font-semibold">
          {course.attributes.description}
        </p>
        <Button className="w-2/3 rounded-md bg-orange-400 py-4 px-3 text-white hover:bg-orange-500 ">
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
              alt: pageData.hero_cover.data.attributes.alternativeText,
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
              alt: pageData.hero_cover.data.attributes.alternativeText,
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
        className="m-4 space-y-4 p-4 md:space-y-8 md:p-[50px] flex flex-col xl:flex-row-reverse items-center"
      >
        <div className="xl:space-y-8 xl:w-1/2 xl:ml-[100px] xl:pr-[150px] xl:pl-[80px] ">
          <h3 className="text-center text-2xl font-bold text-blue-primary md:text-[35px] md:leading-[42px]">
            {pageData.founder_text}
          </h3>
          <h6 className="text-center md:text-xl text-blue-secondary xl:text-wrap xl:mr-12 xl:text-left">
            {pageData.founder_subtext}
          </h6>
          {/* <BlocksRenderer content={pageData.founder_description} /> */}
          {pageData.founder_description.map((block: any) => {
            return (
              <div key={block.id}>
                <p>{block.children[0].text}</p>
              </div>
            );
          })}
          <div className="hidden xl:block">
            <Button className="rounded-md bg-orange-400 py-8 px-[55px] text-white hover:bg-orange-500 text-lg">
              <Link href={"/about"}>Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={replaceImageDomain(
              pageData.founder_image.data.attributes.formats.large.url
            )}
            alt={pageData.founder_image.data.attributes.alternativeText}
            width={pageData.founder_image.data.attributes.width}
            height={pageData.founder_image.data.attributes.height}
            className="rounded-r-[30px] rounded-l-[30px] md:max-w-[356px] md:max-h-[499px] xl:max-w-[468px] xl:max-h-[654px]"
          />
        </div>
      </section>

      <section className="bg-gray-100 py-4 text-center">
        <h2 className="text-2xl font-bold text-blue-primary xl:text-[50px] xl:p-8">
          {pageData.what_we_do_title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:mx-[150px] place-items-center">
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
                className="m-6 flex h-96 flex-col justify-center rounded-[2rem] border-2 p-8 shadow-custom-br md:w-[223px] md:h-[493px] md:p-0 bg-white lg:w-[308px] lg:h-[436px] xl:h-[493px]"
              >
                <div className="text-center flex flex-col p-6 pt-0 grow">
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
                  <CardDescription className="p-2 md:p-0 text-grey-primary mt-auto">
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
                    className="mx-2 rounded-md bg-orange-400 px-4 py-3 text-white hover:text-blue-primary mt-auto mb-2 "
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
          <CardTitle className="p-8 text-center text-2xl font-bold md:text-[35px] xl:text-[50px] xl:leading-[56px] xl:mx-[200px]">
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
                      <div className="my-2 border border-orange-400 hidden md:block" />
                    </div>
                  </CardContent>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <section id="familiar-section" className="p-4">
        <div id="container" className="flex flex-col xl:flex-row items-center xl:mx-[120px]">
          <div id="text-content" className="text-center xl:flex xl:flex-col xl:w-1/2 xl:mr-[50px] xl:space-y-12 xl:text-left">
            <h2 className="text-2xl font-bold text-blue-primary xl:text-[45px] xl:leading-[54px]">
              {pageData.why_you_familiar_title}
            </h2>
            <h6 className="text-blue-secondary xl:text-xl ">
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
        className="bg-gray-100 p-4 text-center flex flex-col items-center"
      >
        <h3 className="text-blue-secondary my-4 md:text-xl">
          {pageData.courses_subtitle}
        </h3>
        <h2 className="text-2xl font-bold text-blue-primary my-4 md:text-[35px]">
          {pageData.courses_title}
        </h2>
        <p className="my-4">{pageData.courses_description}</p>
        <div
          id="courses"
          className="space-y-20 grid grid-cols-1 md:grid-cols-2 md:space-y-0 md:gap-8 mt-16"
        >
          {pageData.courses.data.map((course: any) => {
            return <HomePageCourseCard key={course.id} course={course} />;
          })}
        </div>

        <div id="extraCourse">
          <HundredKButton />
        </div>
      </section>

      <section id="stats">
        <div
          id="stats-container"
          className="space-y-2 bg-blue-secondary py-8 text-center text-white grid grid-cols-1 md:grid-cols-3 md:space-y-0 "
        >
          {pageData.metrics.map((metric: any) => {
            return (
              <div id="stat" key={metric.id}>
                <h2 className="text-[45px] leading-[1.2em] font-bold">
                  <MetricCounter value={metric.value} />
                </h2>
                <p className="text-xl">{metric.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="testimonials" className="py-8 text-center">
        <h2 className="text-[30px] leading-9 font-bold text-blue-primary md:text-[35px] md:mx-[120px] text-wrap md:my-12">
          {pageData.testimonials_title}
        </h2>

        <div
          id="testimonial-cards"
          className="md:grid-cols-2 md:auto-rows-auto grid grid-cols-1 md:m-8 xl:grid-cols-3"
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
