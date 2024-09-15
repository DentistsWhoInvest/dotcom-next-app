import React from "react";
import Head from "next/head";
import Image from "next/image";
import { fetchEndpointData } from "../lib/fetchUtils";


const fetchAllItems = async (url:string) => {
  let allItems:any[] = [];
  let page = 1;
  const pageSize = 100
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetchEndpointData(url,
        undefined,
        true,
        { page: page, pageSize: pageSize }
      );
      const meta = response.meta;
      console.log("meta", meta);
      allItems = allItems.concat(response.data);
      hasMore = page < meta.pagination.pageCount;
      console.log("allItems length", allItems.length);
      console.log("total", meta.pagination.total);
      console.log("hasMore", hasMore);

      page++;
    } catch (error) {
      console.error('Error fetching items:', error);
      hasMore = false; 
    }
  }
  return allItems;
};



export const getStaticPaths = async () => {
  const result = await fetchAllItems("/podcasts")
  return {
    paths: result.map(
      (result: { attributes: { episode_number: number } }) => ({
        params: { podcastepisode: "e" + result.attributes.episode_number },
      })
    ),
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
        <p className="font-bold text-2xl text-blue-primary">Full Transcript</p>
        <div
          dangerouslySetInnerHTML={{ __html: pageData.attributes.description }}
        />
      </div>
    </>
  );
}
