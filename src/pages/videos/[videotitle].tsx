import React from "react";
import Head from "next/head";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { createSlug } from "../blog";
import { Video } from "lucide-react";
import { VideoCard } from "../videos";
import Image from "next/image";

export const getStaticPaths = async () => {
  const results: any = await fetchEndpointData(`/videos`);
  return {
    paths: results.data.map((result: { attributes: { name: string } }) => ({
      params: { videotitle: createSlug(result.attributes.name) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const allVideos = await fetchEndpointData(`/videos`);
  const matchingVideo = allVideos.data.find(
    (video: { attributes: { name: string } }) =>
      createSlug(video.attributes.name) === params.videotitle
  );
  const associatedBanner = await fetchEndpointData(
    `/horizontal-banners/${matchingVideo.attributes.horizontal_banner.data.id}`
  );
  const otherVideos = allVideos.data
    .filter((video: { id: number }) => video.id !== matchingVideo.id)
    .slice(0, 3); // limit to 3 other videos

  return {
    props: {
      pageData: matchingVideo,
      associatedBanner: associatedBanner,
      otherVideos: otherVideos,
    },
  };
};

export default function VideoPage({
  pageData,
  associatedBanner,
  otherVideos,
}: {
  pageData: any;
  associatedBanner: any;
  otherVideos: any[];
}) {
  //the uri has the pattern of /videos/1, /videos/2, etc and we want to remove the /videos/ part
  const videoUri = pageData.attributes.uri.replace("/videos/", "");

  return (
    <>
      <Head>
        <title>{pageData.attributes.name}</title>
        <meta name="description" content={pageData.attributes.description} />
      </Head>
      <div className=" m-4 ">
        <div className="bg-gray-100 flex flex-col justify-center">
          <iframe
            className="m-4"
            src={`https://player.vimeo.com/video/${videoUri}`}
            allow="autoplay; fullscreen; picture-in-picture"
            title={pageData.attributes.name}
          ></iframe>
          <h1 className="text-blue-primary text-xl font-bold m-4">
            {pageData.attributes.name}
          </h1>
          <div
            className="m-4"
            dangerouslySetInnerHTML={{
              __html: pageData.attributes.description,
            }}
          />
        </div>

        <div>
          <Image
            src={associatedBanner.data.attributes.cover_image.data.attributes.url}
            alt="banner"
            width={"320"}
            height={"440"}
          />
        </div>
        <div className="italic text-sm">
          <span className="font-bold">Disclaimer: </span>All content on this
          channel is for education purposes only and does not constitute an
          investment recommendation or individual financial advice. For that,
          you should speak to a regulated, independent professional. The value
          of investments and the income from them can go down as well as up, so
          you may get back less than you invest. The views expressed on this
          channel may no longer be current. The information provided is not a
          personal recommendation for any particular investment. Tax treatment
          depends on individual circumstances and all tax rules may change in
          the future. If you are unsure about the suitability of an investment,
          you should speak to a regulated, independent professional.
        </div>

        <div className="bg-gray-100 flex flex-col justify-center">
          <p className="text-blue-primary text-3xl font-bold m-4 mb-1 pt-4 pb-2 text-center">
            Watch More
          </p>
          <p className="border-blue-secondary border-solid border-t-[3px] mx-28 "></p>

          {otherVideos.map((page: any) => {
            return <VideoCard key={page.id} page={page} />;
          })}
        </div>
      </div>
    </>
  );
}
