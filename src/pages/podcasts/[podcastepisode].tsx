import React from "react";
import Head from "next/head";
import Image from "next/image";
import { fetchEndpointData } from "../../lib/fetchUtils";

export const getStaticPaths = async () => {
  const result = await fetchEndpointData("/podcasts");
  return {
    paths: result.data.map((result: { id: { toString: () => any } }) => ({
      params: { podcastepisode: "e" + result.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const podcastId = params.podcastepisode.replace("e", "");
  const pageData = await fetchEndpointData(`/podcasts/${podcastId}`);

  return {
    props: {
      pageData: pageData.data,
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
