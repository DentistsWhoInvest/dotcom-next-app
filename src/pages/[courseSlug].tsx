import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticPaths = async () => {
  const results: any = await fetchEndpointData(`/courses`);

  return {
    paths: results.data.map(
      (result: { attributes: { navigation_url: string } }) => ({
        params: {
          courseSlug: result.attributes.navigation_url.replace(/^\//, ""),
        },
      })
    ),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { courseSlug: string };
}) => {
  const allCourses = await fetchEndpointData(`/courses`);
  const matchingCourse = allCourses.data.find(
    (course: { attributes: { navigation_url: string } }) =>
      course.attributes.navigation_url.replace(/^\//, "") === params.courseSlug
  );
  const pageData = await fetchEndpointData(`/courses/${matchingCourse.id}`);

  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function CoursePage({ pageData }: any) {
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
