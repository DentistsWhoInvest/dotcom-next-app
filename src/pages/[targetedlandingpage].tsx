import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { createSlug } from "./articles/[page]";
import Image from "next/image";

type TextNode = {
  text: string;
  type: string;
};

type Paragraph = {
  type: "paragraph";
  children: TextNode[];
};

type Description = Paragraph[];

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
};

type ImageData = {
  data: {
    id: number;
    attributes: ImageAttributes;
  };
};

type Contributor = {
  data: null | {
    id: number;
    attributes: {
      firstName: string;
      lastName: string;
      createdAt: string;
      updatedAt: string;
      title: string | null;
      profilePicture: ImageData;
    };
  };
};

type LandingPageAttributes = {
  title: string;
  description: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  contributor: Contributor;
};

type LandingPage = {
  id: number;
  attributes: LandingPageAttributes;
};

export const getStaticPaths = async () => {
  const results: any = await fetchEndpointData(
    `/targeted-data-collection-pages`
  );

  return {
    paths: results.data.map((result: { attributes: { title: string } }) => ({
      params: { targetedlandingpage: createSlug(result.attributes.title) },
    })),
    fallback: false,
  };
};

//todo: update this
export const getStaticProps = async () => {
  const populateFields = ["contributor", "contributor.profilePicture"];

  const pageData = await fetchEndpointData(
    "/targeted-data-collection-pages/5",
    populateFields
  );

  return {
    props: {
      landingPage: pageData.data,
    },
  };
};

export default function TargetedMarketingLandingPage({
  landingPage,
}: {
  landingPage: LandingPage;
}) {

  return (
    <main
      className={`w-screen h-screen bg-gradient-to-b from-blue-secondary to-blue-primary `}
    >
      <section className="pt-[100px] m-auto">
        <div className="space-y-5 p-5 flex flex-col items-center justify-center xl:flex-row xl:max-w-[1140px] xl:m-auto">
          {landingPage.attributes.contributor.data?.attributes
            .profilePicture && (
            <Image
              src={
                landingPage.attributes.contributor.data.attributes
                  .profilePicture.data.attributes.url
              }
              alt={
                landingPage.attributes.contributor.data.attributes
                  .profilePicture.data.attributes.name
              }
              height={335}
              width={251}
              className="rounded-3xl md:w-[413px] md:h-[550px]
"
            />
          )}
          <div className="py-2 px-[20px] md:px-[40px] md:py-8 xl:px-[80px]">
            <div className="text-[25px] xl:text-[35px] leading-[1.2em] flex flex-col text-white font-bold items-center content-center text-center pb-5">
              <BlocksRenderer content={landingPage.attributes.description} />
            </div>
            <div id="form" className=" bg-white text-black">
              todo: embed form
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
