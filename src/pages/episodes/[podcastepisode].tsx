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

type ContributorAttributes = {
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  title: string | null;
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
      const response = await fetchEndpointData(url, undefined, true, {
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
      (result: { attributes: { episode_number: number } }) => ({
        params: { podcastepisode: "e" + result.attributes.episode_number },
      })
    ),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const episodeNumber = Number(params.podcastepisode.replace("e", ""));
  // const allPodcasts = await fetchAllPodcasts()
  const filePath = path.join(process.cwd(), "public", "podcastepisodes.json");
  const page = parseInt(params.page, 10) || 1;
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const allPodcasts = JSON.parse(jsonData);

  const matchingPodcast: PodcastEpisode = allPodcasts.find(
    (podcast: { attributes: { episode_number: number } }) =>
      podcast.attributes.episode_number === episodeNumber
  );

  //maybe wrap these in a try in case there's no associated banner
  const associatedHorizontalBanner = await fetchEndpointData(
    `/horizontal-banners/${matchingPodcast.attributes.horizontal_banner.data.id}`
  );
  const associatedVerticalBanner = await fetchEndpointData(
    `/vertical-banners/${matchingPodcast.attributes.vertical_banner.data.id}`
  );
  const otherPodcasts = allPodcasts
    .filter((article: { id: number }) => article.id !== matchingPodcast.id)
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
      // pageData: pageData.data,
      pageData: matchingPodcast,
      associatedHorizontalBanner: associatedHorizontalBanner.data,
      associatedVerticalBanner: associatedVerticalBanner.data,
      otherPodcasts: otherPodcasts,
      someArticles: someArticles.data,
    },
  };
};

export default function PodcastPage({
  pageData,
  associatedHorizontalBanner,
  associatedVerticalBanner,
  otherPodcasts,
  someArticles,
}: {
  pageData: PodcastEpisode;
  associatedHorizontalBanner: any;
  associatedVerticalBanner: any;
  otherPodcasts: any;
  someArticles: any;
}) {
  console.log("pageData", pageData);
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
            <div className="">
              <Image
                src={
                  associatedHorizontalBanner.attributes.cover_image.data
                    .attributes.url
                }
                alt={associatedHorizontalBanner.attributes.title}
                width={1200}
                height={400}
                layout="responsive"
                className="h-auto w-full object-cover"
              />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="description" content={pageData.attributes.title} />
      </Head>{" "}
      <section id="image and title">
        <div className="relative h-[370px] w-full overflow-hidden md:h-[409px] xl:h-[570.75px]">
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
          <div className="relative z-10 flex size-full flex-col items-center justify-center text-left md:max-w-[62%] md:items-start md:justify-center md:text-left lg:max-w-[50%] xl:mx-[130px] xl:max-w-[1140px] ">
            <div className="absolute px-4 top-[35%] md:top-[30%] md:px-[30px] xl:top-[40%] text-white">
              <p className="text-[30px] leading-[30px] font-bold text-[#A4D8F1]">
                Episode {pageData.attributes.episode_number}
              </p>
              <p className="text-3xl font-bold ">
                {pageData.attributes.title.split(" DWI-")[0]}
              </p>
              <p className="text-lg ">Hosted by: Dr. James Martin</p>
            </div>
          </div>
        </div>
      </section>
      <section id="content" className="p-[10px]">
        <div className="grid w-full max-w-md grid-cols-1 gap-4 sm:max-w-xl md:max-w-4xl lg:max-w-[1140px] mx-auto md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-12">
          <div className="md:col-span-2 lg:col-span-4 xl:col-span-8">
            <div className="mb-5">
              <iframe
                src="https://www.buzzsprout.com/1471306/15694076-is-marketing-a-naughty-word-with-john-williamson-and-dr-ferhan-ahmed-dwi-ep301?client_source=small_player&amp;iframe=true
          "
                loading="lazy"
                width="100%"
                height="200"
                title="Dentists Who Invest Podcast, Is Marketing A Naughty Word? with John Williamson and Dr. Ferhan Ahmed DWI-EP301"
              ></iframe>
            </div>
            <div className="">
              <Image
                src={
                  associatedHorizontalBanner.attributes.cover_image.data
                    .attributes.url
                }
                alt={associatedHorizontalBanner.attributes.title}
                width={1200}
                height={400}
                layout="responsive"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="my-5 flex flex-col justify-center">
              <p className="text-center text-4xl font-bold text-blue-primary">
                Description
              </p>
              <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary pb-8"></p>
              <div
                dangerouslySetInnerHTML={{
                  __html: pageData.attributes.description,
                }}
              />
            </div>
            <div className="my-5 flex flex-col justify-center">
              <p className="text-center text-4xl font-bold text-blue-primary">
                Transcription
              </p>
              <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary"></p>
            </div>
            <div className="space-y-2 mb-5">
              <FullTranscript transcript={pageData.attributes.transcript} />
            </div>

            <Disclaimer contentType="podcast" />
            <div className="my-5 w-full">
              <Image
                src={
                  associatedHorizontalBanner.attributes.cover_image.data
                    .attributes.url
                }
                alt={associatedHorizontalBanner.attributes.title}
                width={1200}
                height={400}
                layout="responsive"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-start md:col-span-1 lg:col-span-2 xl:col-span-4 md:w-[233px] lg:w-[318px] xl:w-[330px]">
            <p className="mb-5 text-center text-4xl font-bold text-blue-primary">
              More Episodes
            </p>
            <p className="flex w-2/3 self-center border-t-[3px] border-solid border-blue-secondary"></p>
            {otherPodcasts.map((page: any) => {
              //todo: might need to tweak the title
              const viewMoreSlug = createSlug(page.attributes.title);
              return (
                <ul
                  key={page.id}
                  className="grid grid-cols-1 gap-4 self-center"
                >
                  <div className="my-4 justify-evenly border-2 border-blue-secondary shadow-custom bg-white rounded-2xl w-[315px] text-center flex flex-col md:w-[233px] lg:w-[318px] xl:w-[330px]">
                    <Link href={`/episodes/${viewMoreSlug}`}>
                      <Image
                        src={page.attributes.artwork_url}
                        alt={page.attributes.name}
                        width={387}
                        height={218}
                        className="rounded-t-xl h-[218px] object-cover bg-blue-secondary border-blue-secondary border lg:w-[430px] lg:h-[300px]"
                      />
                    </Link>
                    <div className="text-center flex flex-col mx-8 mt-4 mb-2 grow space-y-4 md:text-left">
                      <p className="text-blue-primary text-[21px] font-bold">
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
              <Image
                src={
                  associatedVerticalBanner.attributes.cover_image.data
                    .attributes.url
                }
                alt={associatedVerticalBanner.attributes.title}
                width={1200}
                height={400}
                layout="responsive"
                className="h-auto w-full object-cover"
              />
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
                  <ul key={page.id} className="p-4">
                    <ViewMoreCard
                      page={page}
                      contentType={"article"}
                      slug={viewMoreSlug}
                    />
                  </ul>
                );
              })}
            </div>
            <div className="my-5 hidden w-full grid-cols-3 xl:grid">
              {someArticles.slice(0, 3).map((page: any) => {
                //todo: might need to tweak the title
                const viewMoreSlug = createSlug(page.attributes.title);
                return (
                  <ul key={page.id} className="p-4">
                    <ViewMoreCard
                      page={page}
                      contentType={"article"}
                      slug={viewMoreSlug}
                    />
                  </ul>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
/** mob:
 * transcript
 * banner
 * more episodes - 3
 * form
 *  */

/** desk left col
 * transcript - banner partway through, to do
 * banner
 * form
 * more blogs - 3
 */

/** desk right col
 * more episodes - same as mob
 * vertical banner */
