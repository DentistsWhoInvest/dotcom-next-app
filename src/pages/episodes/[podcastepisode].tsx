import React from "react";
import Head from "next/head";
import Image from "next/image";
import { fetchEndpointData } from "../../lib/fetchUtils";
import Disclaimer from "@/components/Disclaimer";
import PodcastMarketingForm from "@/components/PodcastMarketingForm";
import { createSlug } from "../articles/[page]";
import { ViewMoreCard } from "@/components/ViewMoreCard";
import fs from "fs";
import path from "path";
import Link from "next/link";

type TextNode = {
  bold?: boolean;
  text: string;
  type: string;
  italic?: boolean;
};

type Paragraph = {
  type: "paragraph";
  children: TextNode[];
};

type TranscriptContent = {
  id: number;
  content: Paragraph[];
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
  alternativeText: string;
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
  data: {
    id: number;
    attributes: ImageAttributes;
  };
};

type ContributorAttributes = {
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  title: string | null;
  profilePicture: ImageData;
};

type ContributorData = {
  id: number;
  attributes: ContributorAttributes;
};

type BannerAttributes = {
  createdAt: string;
  updatedAt: string;
  title: string;
  navigation_url: string;
  is_internal: boolean;
  cover_image: ImageData;
};

type BannerData = {
  id: number;
  attributes: BannerAttributes;
};

type PodcastEpisodeAttributes = {
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
  transcript: TranscriptContent[];
  contributors: {
    data: ContributorData[];
  };
  vertical_banner: {
    data: BannerData;
  };
  horizontal_banner: {
    data: BannerData;
  };
};

type PodcastEpisode = {
  id: number;
  attributes: PodcastEpisodeAttributes;
};

const fetchAllItems = async (url: string) => {
  let allItems: any[] = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const populateFields = [
        "horizontal_banner",
        "vertical_banner",
        "horizontal_banner.cover_image",
        "vertical_banner.cover_image",
        "contributors.profilePicture",
        "transcript",
      ];
      const response = await fetchEndpointData(url, populateFields, true, {
        page: page,
        pageSize: pageSize,
      });
      const meta = response.meta;
      allItems = allItems.concat(response.data);
      hasMore = page < meta.pagination.pageCount;

      page++;
    } catch (error) {
      console.error("Error fetching items:", error);
      hasMore = false;
    }
  }
  return allItems;
};

function writeToLocal(result: any[]) {
  const filePath = path.join(process.cwd(), "public", "podcastepisodes.json");

  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(result), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export const getStaticPaths = async () => {
  const fetchedPodcasts = await fetchAllItems("/podcasts");

  await writeToLocal(fetchedPodcasts);

  const filePath = path.join(process.cwd(), "public", "podcastepisodes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  return {
    paths: parsedData.map(
      (result: { attributes: { episode_number: number; title: string } }) => ({
        // params: { podcastepisode: "e" + result.attributes.episode_number },
        params: {
          podcastepisode:
            "e" +
            result.attributes.episode_number +
            "-" +
            createSlug(result.attributes.title).replace(/-dwi-ep\d+$/, ""),
        },
      })
    ),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const episodeNumber = Number(
    params.podcastepisode.replace(/^e/, "").split("-")[0]
  );
  const filePath = path.join(process.cwd(), "public", "podcastepisodes.json");
  const page = parseInt(params.page, 10) || 1;
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const allPodcasts = JSON.parse(jsonData);

  const matchingPodcast: PodcastEpisode = allPodcasts.find(
    (podcast: { attributes: { episode_number: number } }) =>
      podcast.attributes.episode_number === episodeNumber
  );

  const otherPodcasts = allPodcasts
    .filter((podcast: { id: number }) => podcast.id !== matchingPodcast.id)
    .slice(0, 3);
  // commenting out this api call, think it can be taken directly from the allPodcasts data if it matches with the episodeNumber
  // keeping it here for reference
  // const pageData = await fetchEndpointData(`/podcasts/${matchingPodcast.id}`);

  const someArticles = await fetchEndpointData("/blog-posts", undefined, true, {
    page: 1,
    pageSize: 4,
  });

  return {
    props: {
      pageData: matchingPodcast,
      otherPodcasts: otherPodcasts,
      someArticles: someArticles.data,
    },
  };
};

export default function PodcastPage({
  pageData,
  otherPodcasts,
  someArticles,
}: {
  pageData: PodcastEpisode;
  otherPodcasts: any;
  someArticles: any;
}) {
  const TranscriptParagraph = ({ transcriptParagraph }: any) => {
    const person = transcriptParagraph[0]?.text;
    const timestamp = transcriptParagraph[1]?.text;
    const transcriptText = transcriptParagraph[2]?.text;
    return (
      <>
        <div className="space-y-2">
          <p className="flex">
            {person && <span className="italic">{person}</span>}
            {timestamp && <span>{timestamp}</span>}
          </p>
          {transcriptText && <p className="">{transcriptText}</p>}
        </div>
      </>
    );
  };

  const FullTranscript = ({ transcript }: any) => {
    return transcript.map((transcriptSection: any, index: number) => {
      return (
        <div key={transcriptSection.id} className="space-y-2">
          {transcriptSection.content.map((transcriptParagraph: any) => {
            return (
              <div key={transcriptParagraph.children[0].text}>
                <TranscriptParagraph
                  transcriptParagraph={transcriptParagraph.children}
                />
              </div>
            );
          })}
          {index === 2 && (
            <Link
              href={
                pageData.attributes.horizontal_banner.data.attributes
                  .navigation_url
              }
            >
              <Image
                src={
                  pageData.attributes.horizontal_banner.data.attributes
                    .cover_image.data.attributes.url
                }
                alt={
                  pageData.attributes.horizontal_banner.data.attributes.title
                }
                width={1200}
                height={400}
                layout="responsive"
                className="h-auto w-full object-cover"
              />
            </Link>
          )}
        </div>
      );
    });
  };

  const ContributorIcon = ({
    contributor,
  }: {
    contributor: ContributorAttributes;
  }) => {
    return (
      <div className="relative flex items-center">
        <div className=" flex h-[110px] w-[100px] items-center overflow-hidden rounded-[30px] lg:h-[180px] lg:w-[150px] xl:h-[200px] xl:w-[180px]">
          <Image
            src={contributor.profilePicture.data.attributes.url}
            alt={contributor.firstName + " " + contributor.lastName}
            layout="fill"
            className=" rounded-[40px] border border-white object-cover object-top"
          />
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 overflow-visible text-nowrap text-center">
            <p className="whitespace-nowrap bg-blue-primary/80 text-[12px] font-light text-white lg:text-[18px]">
              {contributor.title}
              {contributor.firstName} {contributor.lastName}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const buzzsproutLink = `https://www.buzzsprout.com/1471306/${pageData.attributes.buzzsprout_id}?client_source=small_player&amp;iframe=true`;
  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="description" content={pageData.attributes.title} />
      </Head>{" "}
      <section id="image and title">
        <div className="relative h-[370px] w-full overflow-hidden md:h-[409px]">
          <div className="absolute inset-0 ">
            <Image
              src="https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
              alt={"mobile"}
              layout="fill"
              objectFit="cover"
              objectPosition="right 50%"
              priority
            />
            <div className="absolute inset-0 bg-blue-primary opacity-70"></div>
          </div>
          <div className="relative z-10 flex size-full flex-col items-center justify-center text-left md:items-start md:justify-center md:text-left xl:mx-[130px] xl:max-w-[1140px] ">
            <div
              className="absolute right-[5%] top-[10%] flex flex-row space-x-4 lg:right-[2%] lg:top-[33%] xl:right-[-2%] xl:top-[20%]" //might adjust md breakpoint
            >
              {pageData.attributes.contributors.data
                .sort((a: ContributorData, b: ContributorData) => b.id - a.id) // Sort in descending order which should ensure James is on the right
                .map((contributor: ContributorData) => {
                  return (
                    <ContributorIcon
                      key={contributor.id}
                      contributor={contributor.attributes}
                    />
                  );
                })}
            </div>
            <div className="absolute top-[45%] px-4 text-white md:top-[30%] md:px-[30px] lg:max-w-[66%] xl:top-[20%]">
              <p className="text-[30px] font-bold leading-[30px] text-[#A4D8F1] md:text-[35px] md:leading-[42px]">
                Episode {pageData.attributes.episode_number}
              </p>
              <p className="text-3xl font-bold md:text-[50px] md:leading-[60px] ">
                {pageData.attributes.title.split(" DWI-")[0]}
              </p>
              <p className="text-lg md:text-[25px] md:leading-[37.5px]">
                Hosted by: Dr. James Martin
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="content" className="p-[20px]">
        <div className="mx-auto grid w-full max-w-md grid-cols-1 sm:max-w-xl md:max-w-4xl md:grid-cols-3 md:gap-8 lg:max-w-[1140px] lg:grid-cols-6 xl:grid-cols-12 xl:gap-16">
          <div className="md:col-span-2 lg:col-span-4 xl:col-span-8">
            <div className="mb-5">
              <iframe
                src={buzzsproutLink}
                loading="lazy"
                width="100%"
                height="200"
                title={pageData.attributes.title}
              ></iframe>
            </div>
            <div className="">
              <Link
                href={
                  pageData.attributes.horizontal_banner.data.attributes
                    .navigation_url
                }
              >
                <Image
                  src={
                    pageData.attributes.horizontal_banner.data.attributes
                      .cover_image.data.attributes.url
                  }
                  alt={
                    pageData.attributes.horizontal_banner.data.attributes.title
                  }
                  width={1200}
                  height={400}
                  layout="responsive"
                  className="h-auto w-full object-cover"
                />
              </Link>
            </div>
            <div className="my-5 flex flex-col justify-center">
              <p className="py-5 text-center text-4xl font-bold text-blue-primary">
                Description
              </p>
              <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary pb-12"></p>
              <div
                dangerouslySetInnerHTML={{
                  __html: pageData.attributes.description,
                }}
              />
            </div>
            <div className="my-5 flex flex-col justify-center py-5">
              <p className="pb-5 text-center text-4xl font-bold text-blue-primary">
                Transcription
              </p>
              <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary"></p>
            </div>
            <div className="mb-5 space-y-2">
              <FullTranscript transcript={pageData.attributes.transcript} />
            </div>

            <Disclaimer contentType="podcast" />
            <div className="my-5 w-full">
              <Link
                href={
                  pageData.attributes.horizontal_banner.data.attributes
                    .navigation_url
                }
              >
                <Image
                  src={
                    pageData.attributes.horizontal_banner.data.attributes
                      .cover_image.data.attributes.url
                  }
                  alt={
                    pageData.attributes.horizontal_banner.data.attributes.title
                  }
                  width={1200}
                  height={400}
                  layout="responsive"
                  className="h-auto w-full object-cover"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-start md:col-span-1 md:w-[233px] lg:col-span-2 lg:w-[318px] xl:col-span-4 xl:w-[330px]">
            <p className="mb-5 text-center text-4xl font-bold text-blue-primary">
              More Episodes
            </p>
            <p className="flex w-2/3 self-center border-t-[3px] border-solid border-blue-secondary"></p>
            {otherPodcasts.map((page: any) => {
              const viewMoreSlug =
                "e" +
                page.attributes.episode_number +
                "-" +
                createSlug(page.attributes.title).replace(/-dwi-ep\d+$/, "");
              return (
                <ul
                  key={page.id}
                  className="grid grid-cols-1 gap-4 self-center"
                >
                  <div className="my-4 flex w-[315px] flex-col justify-evenly rounded-2xl border-2 border-blue-secondary bg-white text-center shadow-custom md:w-[233px] lg:w-[318px] xl:w-[330px]">
                    <Link href={`/episodes/${viewMoreSlug}`}>
                      <Image
                        src={page.attributes.artwork_url}
                        alt={page.attributes.name}
                        width={387}
                        height={218}
                        className="h-[218px] rounded-t-xl border border-blue-secondary bg-blue-secondary object-cover lg:h-[300px] lg:w-[430px]"
                      />
                    </Link>
                    <div className="mx-8 mb-2 mt-4 flex grow flex-col space-y-4 text-center md:text-left">
                      <p className="text-[21px] font-bold text-blue-primary">
                        <Link href={`/episodes/${viewMoreSlug}`}>
                          EP{page.attributes.episode_number}{" "}
                          {page.attributes.title.split(" DWI-")[0]}
                        </Link>
                      </p>
                      <div className="grow"></div>
                      <Link
                        className={"text-sm font-semibold text-blue-secondary"}
                        href={`/episodes/${viewMoreSlug}`}
                      >
                        LISTEN HERE
                      </Link>
                    </div>
                  </div>
                </ul>
              );
            })}
            <div className="hidden md:block">
              <Link
                href={
                  pageData.attributes.vertical_banner.data.attributes
                    .navigation_url
                }
              >
                <Image
                  src={
                    pageData.attributes.vertical_banner.data.attributes
                      .cover_image.data.attributes.url
                  }
                  alt={
                    pageData.attributes.vertical_banner.data.attributes.title
                  }
                  width={1200}
                  height={400}
                  layout="responsive"
                  className="h-auto w-full object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
        <section id="podcasts and maybe articles">
          <div className="m-2 xl:px-[50px]">
            <PodcastMarketingForm />
          </div>
          <div className="my-5 hidden flex-col justify-center md:flex">
            <p className="m-4 mb-1 pb-2 pt-4 text-center text-3xl font-bold text-blue-primary">
              Read More Articles
            </p>
            <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary lg:w-1/3 xl:w-1/4"></p>

            <div className="my-5 grid w-full grid-cols-2 xl:hidden">
              {someArticles.map((page: any) => {
                //todo: might need to tweak the title
                const viewMoreSlug = createSlug(page.attributes.title);
                return (
                  <li key={page.id} className="flex justify-center p-4">
                    <ViewMoreCard
                      page={page}
                      contentType={"article"}
                      slug={viewMoreSlug}
                    />
                  </li>
                );
              })}
            </div>
            <div className="my-5 hidden max-w-[1260px] grid-cols-3 place-self-center xl:grid">
              {someArticles.slice(0, 3).map((page: any) => {
                //todo: might need to tweak the title
                const viewMoreSlug = createSlug(page.attributes.title);
                return (
                  <li key={page.id} className="flex items-center justify-center p-4">
                    <ViewMoreCard
                      page={page}
                      contentType={"article"}
                      slug={viewMoreSlug}
                    />
                  </li>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
