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
      {count}+
    </span>
  );
};

const HomePageCourseCard = ({ course }: { course: any }) => {
  return (
    <li className="flex max-w-[300px] flex-col justify-center rounded-sm border-2 border-solid bg-white p-4 shadow-md">
      <div className="bg-blue-primary p-4 text-center font-bold text-white">
        <h2 className="text-xl">{course.attributes.tagline}</h2>
      </div>
      <div className="relative">
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
          <Image
            src="/DWI-logo-circle.webp"
            alt="Course Logo"
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
        </div>
      </div>
      <div className="flex flex-col items-center p-4 pt-8">
        <Image
          src={course.attributes.cover.data.attributes.url}
          alt={course.attributes.title}
          width={180}
          height={440}
        />{" "}
        <p className="mb-4 text-sm text-blue-primary">
          {course.attributes.description}
        </p>
        <Button
          asChild
          className="w-full rounded-md bg-orange-400 py-2 font-bold text-white hover:bg-orange-500"
        >
          <Link href={course.attributes.navigation_url}>Learn More</Link>
        </Button>
      </div>
    </li>
  );
};





export default function Home({ pageData }: { pageData: any }) {
  console.log("pageData", pageData);
  return (
    <main>
      <section>
        <div className="relative h-[440px] w-full">
          <Image
            src={replaceImageDomain(
              pageData.hero_cover.data.attributes.formats.large.url
            )}
            alt={pageData.hero_cover.data.attributes.alternativeText}
            layout="fill"
            objectPosition="center"
            objectFit="cover"
            priority
          />

          <div className="absolute inset-0 z-10 flex h-full flex-col justify-center p-4 text-center">
            <p className="p-4 text-3xl font-bold text-white">
              {pageData.hero_text}
            </p>
            <p className="p-2 text-blue-light">{pageData.hero_subtext}</p>
            <Link
              href="https://us02web.zoom.us/meeting/register/tZIsde2orTwvHNW7CqRlCrXcrOgn2vO3xOlG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="m-2 rounded-md bg-orange-400 px-4 py-3 text-white hover:text-blue-primary">
                {pageData.hero_button_text}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="m-4 space-y-4 p-4">
        <h3 className="text-center text-2xl font-bold text-blue-primary">
          {pageData.founder_text}
        </h3>
        <h6 className="text-center text-blue-secondary">
          {pageData.founder_subtext}
        </h6>
        {/* <BlocksRenderer content={pageData.founder_description} /> */}
        {pageData.founder_description.map((block: any) => {
          console.log("block", block);
          return (
            <div key={block.id}>
              <p>{block.children[0].text}</p>
            </div>
          );
        })}

        <Image
          src={replaceImageDomain(
            pageData.founder_image.data.attributes.formats.large.url
          )}
          alt={pageData.founder_image.data.attributes.alternativeText}
          width={pageData.founder_image.data.attributes.width}
          height={pageData.founder_image.data.attributes.height}
          className="rounded-lg"
        />
      </section>

      <section className="bg-gray-100 py-4 text-center">
        <h2 className="text-2xl font-bold text-blue-primary">
          {pageData.what_we_do_title}
        </h2>
        <div>
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
              <Card
                key={reason.id}
                className="m-6 flex h-96 flex-col justify-center rounded-[2rem] border-2 p-8 shadow-2xl"
              >
                <CardContent className=" text-center">
                  <div className="mx-auto my-4 size-20">
                    <Lottie
                      animationData={lottieVar}
                      loop={true}
                      width="200"
                      height="200"
                    />{" "}
                  </div>
                  <CardTitle className="p-2 text-lg font-bold text-blue-primary">
                    <p>{reason.title}</p>
                  </CardTitle>
                  <CardDescription className="p-2 text-grey-primary">
                    {/* <BlocksRenderer content={reason.description} />{" "} */}
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
                  >
                    <button className="m-2 rounded-md bg-orange-400 px-4 py-3 text-white hover:text-blue-primary">
                      {reason.cta_text}
                    </button>
                  </Link>{" "}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <Card className="m-6 flex flex-col rounded-[2rem] border-2 bg-gradient-to-b from-blue-primary to-blue-secondary text-white shadow-2xl ">
          <CardTitle className="p-8 text-center text-2xl font-bold ">
            {pageData.why_you_title}
          </CardTitle>
          {pageData.why_you_reasons.map((reason: any, index: number) => {
            return (
              <div key={reason.id}>
                <CardContent className=" flex flex-row space-x-2 text-left">
                  <Image
                    src={"/tick-in-circle-orange.svg"}
                    alt="Checkmark"
                    width="40"
                    height="40"
                  />
                  <p key={reason.id}>{reason.reason}</p>
                </CardContent>
                {index < pageData.why_you_reasons.length - 1 && (
                  <div className="mx-6 my-2 border border-orange-400" />
                )}
              </div>
            );
          })}{" "}
        </Card>
      </section>

      <section id="familiar-section" className="p-4">
        <div id="container">
          <div id="text-content" className="text-center">
            <h2 className="text-2xl font-bold text-blue-primary">
              {pageData.why_you_familiar_title}
            </h2>
            <h6 className="text-center text-blue-secondary">
              {pageData.why_you_familiar_subtitle}
            </h6>
          </div>

          <div id="carousel-container">
            {/* <CustomHomePageCarousel
              thoughts={pageData.why_you_familiar_thoughts}
            /> */}
          </div>
        </div>
      </section>

      <section id="enrolment" className="space-y-4 bg-gray-100 p-4 text-center">
        <h3 className="text-blue-secondary">{pageData.courses_subtitle}</h3>
        <h2 className="text-2xl font-bold text-blue-primary">
          {pageData.courses_title}
        </h2>
        <p>{pageData.courses_description}</p>
        <div id="courses" className="space-y-4">
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
          className="space-y-2 bg-blue-secondary/50 p-4 text-center text-xl font-bold text-white"
        >
          {pageData.metrics.map((metric: any) => {
            return (
              <div id="stat" key={metric.id}>
                <h2>
                  <span id="community-members">
                    <MetricCounter value={metric.value} />
                  </span>
                </h2>
                <p>{metric.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="testimonials" className="p-4 text-center">
        <h2 className="text-2xl font-bold text-blue-primary">
          {pageData.testimonials_title}
        </h2>

        <div id="testimonial-cards">
          {pageData.testimonials.data.map((testimonial: any) => {
            return (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            );
          })}
        </div>
      </section>

      <HomePageNHSPensionForm />
    </main>
  );
}
