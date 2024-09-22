import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
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
import { Icon } from "lucide-react";
import { CustomHomePageCarousel } from "@/components/CustomHomePageCarousel";

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

export default function Home({ pageData }: { pageData: any }) {
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
              <h2>{pageData.hero_text}</h2>
            </p>
            <p className="p-2 text-blue-light">
              <p>{pageData.hero_subtext}</p>
            </p>
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
        <BlocksRenderer content={pageData.founder_description} />

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
                  <p className="mx-auto my-4 size-20">
                    <Lottie
                      animationData={lottieVar}
                      loop={true}
                      width="200"
                      height="200"
                    />{" "}
                  </p>
                  <CardTitle className="p-2 text-lg font-bold text-blue-primary">
                    <h3>{reason.title}</h3>
                  </CardTitle>
                  <CardDescription className="p-2 text-grey-primary">
                    <BlocksRenderer content={reason.description} />{" "}
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
            <CustomHomePageCarousel
              thoughts={pageData.why_you_familiar_thoughts}
            />
          </div>
        </div>
      </section>

      <section id="enrolment">
        <h3>{pageData.courses_subtitle}</h3>
        <h1>{pageData.courses_title}</h1>
        <p>{pageData.courses_description}</p>
        <div id="courses">
          {pageData.courses.data.map((course: any) => {
            let ariaLabel = `Information about the ${course.attributes.title} course`;
            return (
              <div id="course" key={course.id}>
                <Image
                  src="/DWI-logo-circle.webp"
                  alt="Coruse Created By Dr. James Martin"
                  id="header"
                  width={100}
                  height={100}
                />
                <div id="course-title">
                  <h2>{course.attributes.tagline}</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                  >
                    <path d="M5,125.4c30.5-3.8,137.9-7.6,177.3-7.6c117.2,0,252.2,4.7,312.7,7.6"></path>
                    <path d="M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4"></path>
                  </svg>
                </div>
                <Image
                  src={replaceImageDomain(
                    course.attributes.cover.data.attributes.formats.small.url
                  )}
                  alt={course.attributes.cover.data.attributes.alternativeText}
                  width={course.attributes.cover.data.attributes.width}
                  height={course.attributes.cover.data.attributes.height}
                  id="course-logo"
                />
                <p id="tagline">{course.attributes.description}</p>
                <Link
                  href={course.attributes.navigation_url}
                  aria-label={ariaLabel}
                >
                  {course.attributes.cta_text}
                </Link>
              </div>
            );
          })}
        </div>

        <div id="extraCourse">
          <Link href="/100k" aria-label="Information about the 100k course">
            Psssssst – Principal dentists: want to add £100k to your turnover in
            the next 12 months..?
          </Link>
        </div>
      </section>

      <section id="stats">
        <div id="stats-container">
          {pageData.metrics.map((metric: any) => {
            return (
              <div id="stat" key={metric.id}>
                <h2>
                  <span id="community-members">{metric.value}</span>
                </h2>
                <p>{metric.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="testimonials">
        <h2>{pageData.testimonials_title}</h2>

        <div id="testimonial-cards">
          {pageData.testimonials.data.map((testimonial: any) => {
            return (
              <div id="card" key={testimonial.id}>
                <div id="testimonial">
                  <Image
                    id="quote"
                    src="/quote.webp"
                    alt="quote-mark"
                    width={100}
                    height={100}
                  />
                  <h4>{testimonial.attributes.title}</h4>
                  <BlocksRenderer content={testimonial.attributes.review} />
                  <div id="stars">
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="yellow"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L14.8536 8.71091L22 9.52786L17 14.4721L18.7071 21.4721L12 17.9442L5.29289 21.4721L7 14.4721L2 9.52786L9.14645 8.71091L12 2Z"
                        fill="yellow"
                      />
                    </svg>
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="yellow"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L14.8536 8.71091L22 9.52786L17 14.4721L18.7071 21.4721L12 17.9442L5.29289 21.4721L7 14.4721L2 9.52786L9.14645 8.71091L12 2Z"
                        fill="yellow"
                      />
                    </svg>
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="yellow"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L14.8536 8.71091L22 9.52786L17 14.4721L18.7071 21.4721L12 17.9442L5.29289 21.4721L7 14.4721L2 9.52786L9.14645 8.71091L12 2Z"
                        fill="yellow"
                      />
                    </svg>
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="yellow"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L14.8536 8.71091L22 9.52786L17 14.4721L18.7071 21.4721L12 17.9442L5.29289 21.4721L7 14.4721L2 9.52786L9.14645 8.71091L12 2Z"
                        fill="yellow"
                      />
                    </svg>
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="yellow"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L14.8536 8.71091L22 9.52786L17 14.4721L18.7071 21.4721L12 17.9442L5.29289 21.4721L7 14.4721L2 9.52786L9.14645 8.71091L12 2Z"
                        fill="yellow"
                      />
                    </svg>
                  </div>
                  <div id="gap"></div>
                  <div id="identity">
                    <Image
                      src={replaceImageDomain(
                        testimonial.attributes.author_thumbnail.data.attributes
                          .formats.small.url
                      )}
                      alt={
                        testimonial.attributes.author_thumbnail.data.attributes
                          .alternativeText
                      }
                      width={
                        testimonial.attributes.author_thumbnail.data.attributes
                          .width
                      }
                      height={
                        testimonial.attributes.author_thumbnail.data.attributes
                          .height
                      }
                      id="testimonial-profile"
                    />
                    <div id="description">
                      <h5>{testimonial.attributes.author}</h5>
                      <p>{testimonial.attributes.author_job_location}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* todo: add NHS pension checklist */}
    </main>
  );
}
