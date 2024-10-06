import React from "react";
import Head from "next/head";
import Image from "next/image";
import { fetchEndpointData } from "../lib/fetchUtils";
import Disclaimer from "@/components/Disclaimer";
import PodcastMarketingForm from "@/components/PodcastMarketingForm";
import { createSlug } from "./articles";
import { ViewMoreCard } from "@/components/ViewMoreCard";
import fs from "fs";
import path from "path";

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

  const matchingPodcast = allPodcasts.find(
    (podcast: { attributes: { episode_number: number } }) =>
      podcast.attributes.episode_number === episodeNumber
  );

  const associatedHorizontalBannerId =
    matchingPodcast.attributes.horizontal_banners &&
    matchingPodcast.attributes.horizontal_banners.data.length > 0
      ? matchingPodcast.attributes.horizontal_banners.data[0].id
      : 1;
  const associatedVerticalBannerId =
    matchingPodcast.attributes.vertical_banners &&
    matchingPodcast.attributes.vertical_banners.data.length > 0
      ? matchingPodcast.attributes.vertical_banners.data[0].id
      : 1;
  const associatedHorizontalBanner = await fetchEndpointData(
    `/horizontal-banners/${associatedHorizontalBannerId}`
  );
  const associatedVerticalBanner = await fetchEndpointData(
    `/vertical-banners/${associatedVerticalBannerId}`
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
  pageData: any;
  associatedHorizontalBanner: any;
  associatedVerticalBanner: any;
  otherPodcasts: any;
  someArticles: any;
}) {
  const TranscriptParagraph = ({ transcriptParagraph }: any) => {
    const person = transcriptParagraph[0]?.text;
    const timestamp = transcriptParagraph[1]?.text;
    const transcriptText = transcriptParagraph[2]?.text;
    return (
      <>
        <p className="flex p-2">
          {person && <span className="italic">{person}</span>}
          {timestamp && <span>{timestamp}</span>}
        </p>
        {transcriptText && <p className="p-2">{transcriptText}</p>}
      </>
    );
  };

  const FullTranscript = ({ transcript }: any) => {
    return transcript.map((transcriptSection: any) => {
      return (
        <div key={transcriptSection.id}>
          {transcriptSection.content.map((transcriptParagraph: any) => {
            return (
              <div key={transcriptParagraph.children[0].text}>
                <TranscriptParagraph
                  transcriptParagraph={transcriptParagraph.children}
                />
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="description" content={pageData.description} />
      </Head>{" "}
      <section id="image and title">
        <div className="relative ">
          <Image
            className="w-full object-cover"
            src={
              "https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
            }
            alt={"Hero banner"}
            width={"320"}
            height={"440"}
          />

          <div className="absolute left-0 top-0 z-10 flex size-full flex-col items-center justify-center p-16">
            <div className="flex flex-row">
              <p className="basis-1/3">
                <span className="p-4 text-3xl font-bold text-blue-secondary">
                  Episodes {pageData.attributes.episode_number}
                </span>
                <span className="p-4 text-3xl font-bold text-white">
                  {pageData.attributes.title}
                </span>
                <span className="p-2 text-xl text-blue-light">
                  Hosted by: Dr. James Martin
                </span>
              </p>
              <div className="">contributor images </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto mt-5 grid w-full max-w-md grid-cols-1 gap-4 sm:max-w-xl md:max-w-4xl md:grid-cols-2">
        <div className="col-span-1">
          <iframe
            src="https://www.buzzsprout.com/1471306/15694076-is-marketing-a-naughty-word-with-john-williamson-and-dr-ferhan-ahmed-dwi-ep301?client_source=small_player&amp;iframe=true
          "
            loading="lazy"
            width="100%"
            height="200"
            title="Dentists Who Invest Podcast, Is Marketing A Naughty Word? with John Williamson and Dr. Ferhan Ahmed DWI-EP301"
          ></iframe>
          <div className="my-5 w-full">
            <Image
              src={
                associatedHorizontalBanner.attributes.cover_image.data
                  .attributes.url
              }
              alt="Want to increase your income?"
              width={1200}
              height={400}
              layout="responsive"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="my-5 flex flex-col justify-center">
            <p className="m-4 mb-1 pb-2 pt-4 text-center text-3xl font-bold text-blue-primary">
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
            <p className="m-4 mb-1 pb-2 pt-4 text-center text-3xl font-bold text-blue-primary">
              Transcription
            </p>
            <p className="flex w-1/2 self-center border-t-[3px] border-solid border-blue-secondary"></p>
          </div>
          <div className="p-2">
            {" "}
            <FullTranscript transcript={pageData.attributes.transcript} />
          </div>
          <div className="p-4">
            <Disclaimer contentType="podcast" />
            <div className="my-5 w-full">
              <Image
                src={
                  associatedHorizontalBanner.attributes.cover_image.data
                    .attributes.url
                }
                alt="Want to increase your income?"
                width={1200}
                height={400}
                layout="responsive"
                className="h-auto w-full object-cover"
              />
            </div>

            {otherPodcasts.map((page: any) => {
              //todo: might need to tweak the title
              const viewMoreSlug = createSlug(page.attributes.title);
              return (
                <ul
                  key={page.id}
                  className="p-4 sm:basis-full md:hidden md:basis-1/2 lg:basis-1/3"
                >
                  <ViewMoreCard
                    page={page}
                    contentType={"podcast"}
                    slug={viewMoreSlug}
                  />
                </ul>
              );
            })}
          </div>
        </div>
        {/* <div className="md:col-start-2">
          <div className="my-5 hidden w-full md:block">
            {otherPodcasts.map((page: any) => {
              //todo: might need to tweak the title
              const viewMoreSlug = createSlug(page.attributes.title);
              return (
                <ul
                  key={page.id}
                  className="p-4 sm:basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <ViewMoreCard
                    page={page}
                    contentType={"podcast"}
                    slug={viewMoreSlug}
                  />
                </ul>
              );
            })}
            <Image
              src={
                associatedVerticalBanner.attributes.cover_image.data.attributes
                  .url
              }
              alt="Want to increase your income?"
              width={1200}
              height={400}
              layout="responsive"
              className="h-auto w-full object-cover"
            />
          </div>
        </div> */}
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
