import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticPaths = async () => {
  let results: any = await fetchEndpointData(`/blog-posts`);
  console.log(`results: `)
  console.log(JSON.stringify(results, null, 2));
  return {
    paths: results.data.map((result: { id: { toString: () => any } }) => ({
      params: { articletitle: result.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const pageData = await fetchEndpointData(
    `/blog-posts/${params.articletitle}`
  );

  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function ArticlePage({ pageData }: any) {
  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>
      <div>
        <h1>{pageData.attributes.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: pageData.attributes.excerpt }}
        />
      </div>
    </>
  );
}
