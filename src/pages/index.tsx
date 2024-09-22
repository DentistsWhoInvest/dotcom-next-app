import { fetchEndpointData } from "@/lib/fetchUtils";
import {
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import lottieProject from "../../public/animations/project.json";
import lottieRocket from "../../public/animations/rocket.json";
import lottieTreasure from "../../public/animations/treasure.json";

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
        <Image
          src={replaceImageDomain(
            pageData.hero_cover.data.attributes.formats.large.url
          )}
          alt={pageData.hero_cover.data.attributes.alternativeText}
          width={pageData.hero_cover.data.attributes.width}
          height={pageData.hero_cover.data.attributes.height}
        />
        <h2>{pageData.hero_text}</h2>
        <p>{pageData.hero_subtext}</p>
        <a
          href="https://us02web.zoom.us/meeting/register/tZIsde2orTwvHNW7CqRlCrXcrOgn2vO3xOlG"
          target="_blank"
          rel="noopener noreferrer"
        >
          {pageData.hero_button_text}
        </a>
      </section>

      <section>
        <Image
          src={replaceImageDomain(
            pageData.founder_image.data.attributes.formats.large.url
          )}
          alt={pageData.founder_image.data.attributes.alternativeText}
          width={pageData.founder_image.data.attributes.width}
          height={pageData.founder_image.data.attributes.height}
        />
        <h3>{pageData.founder_text}</h3>
        <h6>{pageData.founder_subtext}</h6>
        <BlocksRenderer content={pageData.founder_description} />
        {/* todo: add link description */}

        <Link
          href="/about"
          id="orange-link-on-white"
          aria-label={pageData.founder_cta_link_description}
        >
          {pageData.founder_cta_text}
        </Link>
      </section>

      <section>
        <h2>{pageData.what_we_do_title}</h2>
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
              <div key={reason.id}>
                {/* learn to choose correct import */}
                <Lottie
                  animationData={lottieVar}
                  loop={true}
                  width="200"
                  height="200"
                  style={{ width: 200, height: 200 }}
                />
                <h3>{reason.title}</h3>
                <BlocksRenderer content={reason.description} />
                {/* todo: handle external links? */}
                <Link
                  href={reason.cta_navigation_url}
                  aria-label={reason.cta_navigation_description}
                >
                  {reason.cta_text}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2>{pageData.why_you_title}</h2>
        <div>
          {pageData.why_you_reasons.map((reason: any) => {
            let tickUrl = `${assetDomain}/tick-in-circle-orange.svg`;
            return (
              <div key={reason.id}>
                <Image src={tickUrl} alt="Checkmark" width="40" height="40" />
                <p key={reason.id}>{reason.reason}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="familiar-section">
        <div id="container">
          <div id="text-content">
            <h2>{pageData.why_you_familiar_title}</h2>
            <p>{pageData.why_you_familiar_subtitle}</p>
          </div>

          <div id="carousel-container">
            <div id="carousel">
              {pageData.why_you_familiar_thoughts.map((thought: any) => {
                return (
                  <div id="thought" key={thought.id}>
                    <Image
                      src={replaceImageDomain(
                        thought.cover.data.attributes.formats.large.url
                      )}
                      alt={thought.cover.data.attributes.alternativeText}
                      width={thought.cover.data.attributes.width}
                      height={thought.cover.data.attributes.height}
                    />
                    <p>{thought.thought}</p>
                  </div>
                );
              })}
            </div>
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
                  <Image id="quote" src="/quote.webp" alt="quote-mark" width={100} height={100} />
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
