import React from "react";
import Head from "next/head";
import Image from "next/image";
import { fetchEndpointData } from "../lib/fetchUtils";
import Disclaimer from "@/components/Disclaimer";

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

export const getStaticPaths = async () => {
  const result = await fetchAllItems("/podcasts");
  return {
    paths: result.map((result: { attributes: { episode_number: number } }) => ({
      params: { podcastepisode: "e" + result.attributes.episode_number },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const episodeNumber = Number(params.podcastepisode.replace("e", ""));
  const allPodcasts = await fetchAllItems(`/podcasts`);
  const matchingPodcast = allPodcasts.find(
    (podcast: { attributes: { episode_number: number } }) =>
      podcast.attributes.episode_number === episodeNumber
  );
  // commenting out this api call, think it can be taken directly from the allPodcasts data if it matches with the episodeNumber
  // keeping it here for reference
  // const pageData = await fetchEndpointData(`/podcasts/${matchingPodcast.id}`);

  return {
    props: {
      // pageData: pageData.data,
      pageData: matchingPodcast,
    },
  };
};

export default function PodcastPage({ pageData }: any) {
  console.log("pagedata", pageData);

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
    console.log("transcriptParagraph", transcriptParagraph);
    const person = transcriptParagraph[0].text;
    const timestamp = transcriptParagraph[1].text;
    const transcriptText = transcriptParagraph[2].text;
    return (
      <>
        <p className="flex p-2">
          <span className="italic">{person}</span>
          <span>{timestamp}</span>
        </p>
        <p className="p-2">{transcriptText}</p>
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
      <div>
        <div>optional banner with title and image?</div>
        <iframe
          src="https://www.buzzsprout.com/1471306/15694076-is-marketing-a-naughty-word-with-john-williamson-and-dr-ferhan-ahmed-dwi-ep301?client_source=small_player&amp;iframe=true
          "
          loading="lazy"
          width="100%"
          height="200"
          scrolling="no"
          title="Dentists Who Invest Podcast, Is Marketing A Naughty Word? with John Williamson and Dr. Ferhan Ahmed DWI-EP301"
        ></iframe>
        <div className="flex flex-col justify-center my-5">
          <p className="text-blue-primary text-3xl font-bold m-4 mb-1 pt-4 pb-2 text-center">
            Description
          </p>
          <p className="border-blue-secondary border-solid border-t-[3px] flex self-center w-1/2"></p>
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
        </div>
      </div>
    </>
  );
}
