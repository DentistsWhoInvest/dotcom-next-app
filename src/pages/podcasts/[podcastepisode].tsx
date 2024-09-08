import React from "react";
import Head from "next/head";
import Image from "next/image";
import { fetchEndpointData } from "../../lib/fetchUtils";

export const getStaticPaths = async () => {
  const result = await fetchEndpointData("/podcasts");
  return {
    paths: result.data.map(
      (result: { attributes: { episode_number: number } }) => ({
        params: { podcastepisode: "e" + result.attributes.episode_number },
      })
    ),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const episodeNumber = Number(params.podcastepisode.replace("e", ""));
  const allPodcasts = await fetchEndpointData(`/podcasts`);
  const matchingPodcast = allPodcasts.data.find(
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
  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="description" content={pageData.description} />
      </Head>
      <div>
        <div>{pageData.attributes.title}</div>
        <Image
          src={`${pageData.attributes.artwork_url}`}
          alt="blog-post"
          priority={true}
          className="rounded-full"
          width={600}
          height={400}
        />
        <div
          dangerouslySetInnerHTML={{ __html: pageData.attributes.description }}
        />
      </div>
    </>
  );
}
