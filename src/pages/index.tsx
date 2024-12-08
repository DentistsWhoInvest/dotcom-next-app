/* eslint-disable tailwindcss/no-custom-classname */
import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import HomepageFreeTaxReliefForm from "@/components/HomepageFreeTaxReliefForm";
import { FrontSectionTitle } from "@/components/FrontSectionTitle";
import { HomePageTestimonialCard } from "@/components/HomePageTestimonialCard";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import {
  HomePageContentCard,
  HomePageContentCardProps,
} from "@/components/HomePageContentCard";
import { createSlug } from "./articles/[page]";
import DWIHomePageFollowUsLogo from "@/components/DWIHomePageFollowUsLogo";

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

type ArticleAttributes = {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  publish_date: string;
  cover: Cover;
};

type ArticleData = {
  id: number;
  attributes: ArticleAttributes;
};

type Article = {
  data: ArticleData | null;
};

type PodcastAttributes = {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  buzzsprout_id: number;
  duration: number;
  description: string;
  artwork_url: string;
  buzzsprout_hash: string;
  episode_number: number;
};

type PodcastData = {
  id: number;
  attributes: PodcastAttributes;
};

type Podcast = {
  data: PodcastData | null;
};

type VideoAttributes = {
  name: string;
  uri: string;
  duration: number;
  modified_time: string;
  status: string;
  is_playable: boolean;
  hash: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
};

type VideoData = {
  id: number;
  attributes: VideoAttributes;
};

type Video = {
  data: VideoData | null;
};

type Content = {
  id: number;
  video: Video;
  podcast: Podcast;
  article: Article;
};
type BannerAttributes = {
  createdAt: string;
  updatedAt: string;
  title: string;
  navigation_url: string;
  is_internal: boolean;
  cover_image: { data: ImageData };
};

type BannerData = {
  id: number;
  attributes: BannerAttributes;
};

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
  latest_contents: Content[];
  popular_contents: Content[];
  horizontal_banner: {
    data: BannerData;
  };
};

type HomePage = {
  id: number;
  attributes: HomePageAttributes;
};

export const getStaticProps = async () => {
  const populateFields = [
    "latest_contents",
    "latest_contents.article",
    "latest_contents.article.cover",
    "latest_contents.podcast",
    "latest_contents.video",
    "popular_contents",
    "popular_contents.article",
    "popular_contents.article.cover",
    "popular_contents.podcast",
    "popular_contents.video",
    "horizontal_banner",
    "horizontal_banner.cover_image",
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

  // when we get the latest content, it will be an array of content
  // the content can be an article, video or podcast, two of those objects will be null
  // we want to filter out the null objects and only keep the ones that are not null

  function determineContentType(content: Content) {
    if (
      content.article.data != null &&
      content.video.data === null &&
      content.podcast.data === null
    ) {
      return "article";
    } else if (
      content.video.data != null &&
      content.article.data === null &&
      content.podcast.data === null
    ) {
      return "video";
    } else if (
      content.podcast.data != null &&
      content.article.data === null &&
      content.video.data === null
    ) {
      return "podcast";
    } else {
      return "";
    }
  }

  function extractContent(
    content: Content,
    index: number,
    isLatestContent: boolean
  ): HomePageContentCardProps {
    const extractedContent: HomePageContentCardProps = {
      title: "",
      size: "medium",
      type: "",
      url: "",
      imageUrl: "",
      imageAlt: "",
    };
    const contentType = determineContentType(content);
    const cardSize = isLatestContent
      ? index === 0
        ? "splash"
        : "large"
      : "medium";
    if (contentType === "article" && content.article.data !== null) {
      const slug = createSlug(content.article.data.attributes.title);
      extractedContent.title = content.article.data.attributes.title;
      extractedContent.type = contentType;
      extractedContent.description = content.article.data.attributes.excerpt;
      extractedContent.url = `/article/${slug}`;
      extractedContent.imageUrl =
        content.article.data.attributes.cover.data.attributes.url;
      extractedContent.imageAlt =
        content.article.data.attributes.cover.data.attributes.name;
      extractedContent.size = cardSize;
    } else if (contentType === "podcast" && content.podcast.data !== null) {
      const podcastSlug = createSlug(
        content.podcast.data.attributes.title
      ).replace(/-dwi-ep\d+$/, "");
      const podcastLink = `/episodes/e${content.podcast.data.attributes.episode_number}-${podcastSlug}`;
      const podcastTitle =
        "EP" +
        content.podcast.data.attributes.episode_number +
        " " +
        content.podcast.data.attributes.title.split(" DWI-")[0];
      extractedContent.title = podcastTitle;
      extractedContent.type = contentType;
      extractedContent.url = podcastLink;
      extractedContent.imageUrl = content.podcast.data.attributes.artwork_url;
      extractedContent.imageAlt = content.podcast.data.attributes.title;
      extractedContent.size = cardSize;
    } else if (contentType === "video" && content.video.data !== null) {
      const slug = createSlug(content.video.data.attributes.name);
      const videoId = content.video.data.attributes.uri.replace("/videos/", "");
      extractedContent.title = content.video.data.attributes.name;
      extractedContent.type = contentType;
      extractedContent.url = `/videos/${slug}`;
      extractedContent.imageUrl = `https://vumbnail.com/${videoId}.jpg`;
      extractedContent.imageAlt = content.video.data.attributes.name;
      extractedContent.size = cardSize;
    }
    return extractedContent;
  }

  // map over latest content and popular content and extract the content
  const extractedLatestContent = pageData.latest_contents.map(
    (content: Content, index) => {
      return extractContent(content, index, true);
    }
  );
  const extractedPopularContent = pageData.popular_contents.map(
    (content: Content, index) => {
      return extractContent(content, index, false);
    }
  );

  return (
    <>
      <Head>
        <title>Dentists Who Invest</title>
        <meta
          name="description"
          content="Dentists Who Invest homepage, detailing courses we offer, information on the founder, and content we've created for dentists"
        />
      </Head>
      <main className=" bg-gray-100  lg:pt-8">
        <section className="lg:mx-auto lg:max-w-[1000px] space-y-12">
          <section className="lg:bg-blue-primary lg:p-8" id="latest content">
            <FrontSectionTitle title={"Latest Content"} />
            <div className="mx-3 grid grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-3">
              {extractedLatestContent.map((content, index) => (
                <div
                  key={index}
                  className={`${index === 0 ? "col-span-full" : "col-span-1"}
                ${index === 3 ? "hidden lg:block" : ""}
              `}
                >
                  <HomePageContentCard
                    size={content.size}
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
            <FrontSectionTitle title={"Popular Content"} />

            <div className="mx-3 grid gap-8 sm:grid-cols-1 lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
              {extractedPopularContent.map((content, index) => (
                <HomePageContentCard
                  key={index}
                  size={content.size}
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
            {pageData.horizontal_banner.data && (
              <Link
                href={pageData.horizontal_banner.data.attributes.navigation_url}
              >
                <Image
                  src={
                    pageData.horizontal_banner.data.attributes.cover_image.data
                      .attributes.url
                  }
                  alt={pageData.horizontal_banner.data.attributes.title}
                  width={1200}
                  height={200}
                  layout="responsive"
                  className=""
                />
              </Link>
            )}
          </section>

          <section className="" id="follow us">
            <FrontSectionTitle title={"Follow Us"} />
            <div className="mx-3 flex justify-center gap-4 lg:gap-8 lg:mx-0">
              <div
                id="socials"
                className="w-1/2 flex-col bg-white shadow-custom-br lg:w-full max-h-[300px]"
              >
                <div
                  className="relative h-2/3 w-full inline-block bg-blue-primary"
                  style={{ aspectRatio: "5 / 3" }}
                >
                  <div className="p-4 absolute inset-0 flex lg:hidden items-center justify-center">
                    <DWIHomePageFollowUsLogo />
                  </div>
                  <Image
                    src="https://assets.dentistswhoinvest.com/dwitextlogo_467490d260/dwitextlogo_467490d260.png"
                    alt={pageData.hero_cover.data.attributes.name}
                    layout="fill"
                    className="object-cover bg-blue-primary lg:block hidden"
                  />
                </div>
                <div className="mx-1 flex h-1/3 items-center justify-between space-x-1 md:mx-4 pb-2">
                  <p className="self-center text-nowrap bg-blue-primary px-1 text-[10px] text-white md:mt-4 md:self-start md:px-4 md:text-base">
                    FOLLOW US:
                  </p>
                  <div className="flex flex-row space-x-1 md:space-x-3">
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
                className="w-1/2 flex-col bg-white shadow-custom-br lg:w-full max-h-[300px]"
              >
                <div
                  className="relative h-2/3 w-full overflow-hidden"
                  style={{ aspectRatio: "5 / 3" }}
                >
                  <Image
                    src={pageData.hero_cover.data.attributes.url}
                    alt={pageData.hero_cover.data.attributes.name}
                    layout="fill"
                    className=""
                  />
                </div>
                <div className="mx-1 flex h-1/3 items-center justify-center space-x-1 md:mx-12">
                  <button className="text-nowrap bg-orange-400 px-2 py-1 text-[10px] text-white md:py-2 md:text-lg">
                    <Link href={pageData.hero_button_navigation_url}>
                      {pageData.hero_button_text}
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="" id="meet the founder">
            <FrontSectionTitle title={"Meet the Founder"} />
            <section
              id="founder"
              className="mx-3 flex flex-col items-center bg-white shadow-custom-br lg:mx-0 lg:flex-row"
            >
              <div className="relative aspect-square w-full h-1/2 lg:aspect-[4/5] lg:w-1/3 max-h-[351px] lg:max-h-full">
                <Image
                  src={pageData.founder_image.data.attributes.url}
                  alt={pageData.founder_image.data.attributes.name}
                  layout="fill"
                  className="object-cover object-[50%_15%] lg:object-center"
                />
              </div>
              <div className="m-4 space-y-2 text-left lg:mx-[50px] lg:w-3/4 lg:space-y-4">
                <h3 className="pb-2 text-lg text-blue-primary md:text-xl lg:text-2xl xl:mr-12 xl:text-wrap xl:text-left">
                  {pageData.founder_subtext}
                </h3>
                {pageData.founder_description.map((block: any) => {
                  return (
                    <div key={block.id}>
                      <p className="text-xs lg:text-sm pb-2">
                        {block.children[0].text}
                      </p>
                    </div>
                  );
                })}
                <Link
                  href={"/about"}
                  className="text-xs lg:text-sm font-semibold text-blue-primary"
                >
                  Read More...
                </Link>
              </div>
            </section>
          </section>

          <section className="" id="what we do">
            <FrontSectionTitle title={"What We Do For Dentists"} />
            {pageData.what_we_do_reasons.map((reason: ReasonData) => {
              return (
                <div
                  key={reason.id}
                  className="mx-3 my-2 flex bg-blue-primary text-white lg:mx-0"
                >
                  <p className="flex justify-center mx-4 py-2 text-[60px] font-semibold w-1/12">
                    {reason.id}
                  </p>
                  <div className="flex flex-col self-center w-2/3">
                    <p className="pb-2 text-base lg:text-2xl">{reason.title}</p>
                    <div className="text-[10px] lg:text-sm">
                      <BlocksRenderer content={reason.description} />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="" id="testimonials">
            <FrontSectionTitle title={"Check Out What Our Members Say..."} />

            <div
              id="testimonial-cards"
              className="mx-3 grid grid-cols-1 gap-4 lg:gap-8 md:auto-rows-auto md:grid-cols-3 lg:mx-0 xl:mx-auto xl:max-w-[1200px]"
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
        </section>
      </main>
    </>
  );
}
