import React from "react";
import fm from "front-matter";
import Head from "next/head";
import { marked } from "marked";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticPaths = async () => {
  let results: any = await fetchEndpointData(`/videos`);
  console.log("result", results);
  return {
    paths: results.data.map((result: { id: { toString: () => any } }) => ({
      params: { videotitle: result.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  console.log("params", params);
  const pageData = await fetchEndpointData(`/videos/${params.videotitle}`);
  console.log("res", pageData);
  return {
    props: {
      pageData: pageData.data,
    },
  };
};

//does this need to not be /blog/[id] but rather something like [slug] directly under pages?
export default function VideoPage({ pageData }: any) {
  console.log("pageData", pageData);

  //the uri has the pattern of /videos/1, /videos/2, etc and we want to remove the /videos/ part
  const videoUri = pageData.attributes.uri.replace("/videos/", "");

  return (
    <>
      <Head>
        <title>{pageData.attributes.name}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>
      <Header />
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
      <Footer />
    </>
  );
}
