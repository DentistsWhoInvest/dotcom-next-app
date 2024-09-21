import React from "react";
import Head from "next/head";
import Image from "next/image";
import { fetchEndpointData } from "../lib/fetchUtils";
import Disclaimer from "@/components/Disclaimer";
import PodcastMarketingForm from "@/components/PodcastMarketingForm";
import { createSlug } from "./articles";
import { ViewMoreCard } from "@/components/ViewMoreCard";
import fs from 'fs'
import path from 'path'

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
  const filePath = path.join(process.cwd(), 'public', 'podcastepisodes.json');
  
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(result), (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Data written to file");
        resolve();
      }
    });
  });
}

export const getStaticPaths = async () => {
  const fetchedPodcasts = await fetchAllItems("/podcasts");
  console.log("fetched all podcast episodes")

  await writeToLocal(fetchedPodcasts)

  const filePath = path.join(process.cwd(), 'public', 'podcastepisodes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');  
  const parsedData = JSON.parse(jsonData);



  return {
    paths: parsedData.map((result: { attributes: { episode_number: number } }) => ({
      params: { podcastepisode: "e" + result.attributes.episode_number },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const episodeNumber = Number(params.podcastepisode.replace("e", ""));
  // const allPodcasts = await fetchAllPodcasts()
  const filePath = path.join(process.cwd(), 'public', 'podcastepisodes.json');
  const page = parseInt(params.page, 10) || 1;
  const jsonData = fs.readFileSync(filePath, 'utf-8');
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
    pageSize: 3,
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

  // const Transcript = ({ transcriptText }: any) => {
  //   // console.log("transcripttext", transcriptText);
  //   let classNames = "";
  //   if (transcriptText.bold) classNames += " font-bold";
  //   if (transcriptText.italic) classNames += " italic";

  //   return (
  //     <span key={transcriptText.id} className={classNames}>
  //       {transcriptText.text}
  //     </span>
  //   );
  // };

  const TranscriptParagraph = ({ transcriptParagraph }: any) => {
    console.log("transcript paragraph", transcriptParagraph)
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
      </Head>
      <div className="relative ">
        <Image
          className="object-cover w-full"
          src={
            "https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
          }
          alt={"Hero banner"}
          width={"320"}
          height={"440"}
        />

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 flex-col p-16">
          <div className="flex flex-row">
            <p className="basis-1/3">
            <span className="text-blue-secondary text-3xl font-bold p-4">
              Episodes {pageData.attributes.episode_number}
            </span>
            <span className="text-white text-3xl font-bold p-4">
              {pageData.attributes.title}
            </span>
            <span className="text-blue-light text-xl p-2">
              Hosted by: Dr. James Martin
            </span>
            </p>
            <div className="">contributor images </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md sm:max-w-xl md:max-w-4xl mt-5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <iframe
            src="https://www.buzzsprout.com/1471306/15694076-is-marketing-a-naughty-word-with-john-williamson-and-dr-ferhan-ahmed-dwi-ep301?client_source=small_player&amp;iframe=true
          "
            loading="lazy"
            width="100%"
            height="200"
            title="Dentists Who Invest Podcast, Is Marketing A Naughty Word? with John Williamson and Dr. Ferhan Ahmed DWI-EP301"
          ></iframe>
          <div className="w-full my-5">
            <Image
              src={
                associatedHorizontalBanner.attributes.cover_image.data
                  .attributes.url
              }
              alt="Want to increase your income?"
              width={1200}
              height={400}
              layout="responsive"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex flex-col justify-center my-5">
            <p className="text-blue-primary text-3xl font-bold m-4 mb-1 pt-4 pb-2 text-center">
              Description
            </p>
            <p className="border-blue-secondary border-solid border-t-[3px] flex self-center w-1/2 pb-8"></p>
            <div
              dangerouslySetInnerHTML={{
                __html: pageData.attributes.description,
              }}
            />
          </div>
          <div className="flex flex-col justify-center my-5">
            <p className="text-blue-primary text-3xl font-bold m-4 mb-1 pt-4 pb-2 text-center">
              Transcription
            </p>
            <p className="border-blue-secondary border-solid border-t-[3px] flex self-center w-1/2"></p>
          </div>
          <div className="p-2">
            {" "}
            <FullTranscript transcript={pageData.attributes.transcript} />
          </div>
          <div className="p-4">
            <Disclaimer contentType="podcast" />
            <div className="w-full my-5">
              <Image
                src={
                  associatedHorizontalBanner.attributes.cover_image.data
                    .attributes.url
                }
                alt="Want to increase your income?"
                width={1200}
                height={400}
                layout="responsive"
                className="w-full h-auto object-cover"
              />
            </div>

            {otherPodcasts.map((page: any) => {
              //todo: might need to tweak the title
              const viewMoreSlug = createSlug(page.attributes.title);
              return (
                <ul
                  key={page.id}
                  className="sm:basis-full md:basis-1/2 lg:basis-1/3 p-4 md:hidden"
                >
                  <ViewMoreCard
                    page={page}
                    contentType={"podcast"}
                    slug={viewMoreSlug}
                  />
                </ul>
              );
            })}

            <PodcastMarketingForm />
          </div>
        </div>
        <div className="md:col-start-2">
          <div className="w-full my-5 hidden md:block">
            {otherPodcasts.map((page: any) => {
              //todo: might need to tweak the title
              const viewMoreSlug = createSlug(page.attributes.title);
              return (
                <ul
                  key={page.id}
                  className="sm:basis-full md:basis-1/2 lg:basis-1/3 p-4"
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
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="w-full my-5 hidden md:block flex:row">
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
      </div>
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
