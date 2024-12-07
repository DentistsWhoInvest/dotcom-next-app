/* eslint-disable tailwindcss/no-custom-classname */
import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import Link from "next/link";
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
      "https://assets.dentistswhoinvest.com/financial_freedom_exit_sign_part_2_429f18592c/financial_freedom_exit_sign_part_2_429f18592c.webp",
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
              <div className="mx-1 flex h-1/3 items-center justify-between space-x-1 lg:mx-4">
                <p className="self-center text-nowrap bg-blue-primary px-1 text-[10px] text-white lg:mt-4 lg:self-start lg:px-4 lg:text-base">
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
                      className="md:size-[50px]"
                    ></Image>
                  </Link>
                  <Link href={"https://www.linkedin.com/in/dr-james-martin/"}>
                    <Image
                      src="https://assets.dentistswhoinvest.com/linkedin_logo_681e6eb0d0/linkedin_logo_681e6eb0d0.webp"
                      alt="Linked in"
                      width={30}
                      height={30}
                      className="md:size-[50px]"
                    ></Image>
                  </Link>
                  <Link href={"https://www.instagram.com/dentistswhoinvest/"}>
                    <Image
                      src="https://assets.dentistswhoinvest.com/Instagram_Glyph_Gradient_0fde9ef993/Instagram_Glyph_Gradient_0fde9ef993.webp"
                      alt="Instagram"
                      width={30}
                      height={30}
                      className="md:size-[50px]"
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
                <button className="text-nowrap bg-orange-400 px-2 py-1 text-[10px] text-white lg:py-2 lg:text-lg">
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
              className="relative aspect-square size-full lg:aspect-[4/5]"
              
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
