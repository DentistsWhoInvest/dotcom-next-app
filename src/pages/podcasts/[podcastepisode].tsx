import React from "react";
import fm from "front-matter";
import Head from "next/head";
import { marked } from "marked";
import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchEndpointData } from "../../lib/fetchUtils";


export const getStaticPaths = async () => {
  console.log("getting paths");
  const result = await fetchEndpointData("/podcasts");
  console.log("result", result);
  return {
    paths: result.data.map((result: { id: { toString: () => any } }) => ({
      params: { podcastepisode: result.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  console.log("params", params);
  const pageData = await fetchEndpointData(`/podcasts/${params.podcastepisode}`);

  return {
    props: {
    pageData: pageData.data,
    },
  };
};

//does this need to not be /blog/[id] but rather something like [slug] directly under pages?
export default function Post({ pageData }: any) {
  console.log("pageData", pageData);
  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="description" content={pageData.description} />
      </Head>
      <Header />
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
        <div dangerouslySetInnerHTML={{ __html: pageData.attributes.description }} />
      </div>
      <Footer />
    </>
  );
}
