import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticPaths = async () => {
  let results: any = await fetchEndpointData(`/videos`);
  return {
    paths: results.data.map((result: { id: { toString: () => any } }) => ({
      params: { videotitle: result.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const pageData = await fetchEndpointData(`/videos/${params.videotitle}`);
  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function VideoPage({ pageData }: any) {

  //the uri has the pattern of /videos/1, /videos/2, etc and we want to remove the /videos/ part
  const videoUri = pageData.attributes.uri.replace("/videos/", "");

  return (
    <>
      <Head>
        <title>{pageData.attributes.name}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>
      <div>
        <h1>{pageData.attributes.name}</h1>
        <iframe
          src={`https://player.vimeo.com/video/${videoUri}`}
          allow="autoplay; fullscreen; picture-in-picture"
          title={pageData.attributes.name}
        ></iframe>
        <div
          dangerouslySetInnerHTML={{ __html: pageData.attributes.description }}
        />
      </div>
    </>
  );
}
