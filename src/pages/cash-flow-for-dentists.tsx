import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData(`/courses/1`);

  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function CashflowCoursePage({ pageData }: any) {
  return (
    <>
      <Head>
        <title>{pageData.attributes.title}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>
      <div>
        <h1>{pageData.attributes.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: pageData.attributes.description }}
        />
      </div>
    </>
  );
}
