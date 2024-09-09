import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { createSlug } from "../blog";

export const getStaticPaths = async () => {
  const results: any = await fetchEndpointData(`/blog-posts`);
  return {
    paths: results.data.map((result: { attributes: { title: string } }) => ({
      params: { articletitle: createSlug(result.attributes.title) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const allArticles = await fetchEndpointData(`/blog-posts`);
  const matchingArticle = allArticles.data.find(
    (article: { attributes: { title: string } }) =>
      createSlug(article.attributes.title) === params.articletitle
  );
  return {
    props: {
      pageData: matchingArticle,
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
