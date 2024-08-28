import React from "react";
import fm from "front-matter";
import Head from "next/head";
import { marked } from "marked";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const getStaticPaths = async () => {
  let results: any = await fetch(`http://127.0.0.1:1337/api/blogs`);
  results = await results.json();
  console.log('result', results)
  return {
    paths: results.data.map((result: { id: { toString: () => any; }; }) => ({
      params: { id: result.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
    console.log('params', params)
  const res = await fetch(
    `http://127.0.0.1:1337/api/blogs/${params.id}`
  );
  const markdownWithMeta = await res.json();
  const parsedMarkdown = fm(markdownWithMeta.data.attributes.draft);
  const htmlString = marked(parsedMarkdown.body);
  const image = markdownWithMeta.data.attributes.imageUrl;
  return {
    props: {
      image,
      htmlString,
      data: parsedMarkdown.attributes,
    },
  };
};


//does this need to not be /blog/[id] but rather something like [slug] directly under pages? 
export default function Post({ image, htmlString, data }: any) {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>
      <Header/>
      <div >
        <Image
          src={`${image}`}
          alt="blog-post"
          priority={true}
          className="rounded-full"
          width={600}
          height={400}
        />
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
      <Footer />
    </>
  );
}