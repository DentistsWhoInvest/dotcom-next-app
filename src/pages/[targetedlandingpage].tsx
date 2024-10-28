/* eslint-disable tailwindcss/no-custom-classname */
import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { createSlug } from "./articles/[page]";
import Image from "next/image";
import Script from "next/script";

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
  slug: string;
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
    paths: results.data.map(
      (result: { attributes: { slug: string }; id: number }) => ({
        params: {
          targetedlandingpage: result.attributes.slug.replace(/^\//, ""),
        },
      })
    ),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { targetedlandingpage: string };
}) => {
  const populateFields = ["contributor", "contributor.profilePicture"];
  const allPages = await fetchEndpointData(
    `/targeted-data-collection-pages/`,
    populateFields
  );

  const matchingPage = allPages.data.find(
    (page: { attributes: { slug: string } }) =>
      page.attributes.slug.replace(/^\//, "") === params.targetedlandingpage
  );

  return {
    props: {
      landingPage: matchingPage,
    },
  };
};

export default function TargetedMarketingLandingPage({
  landingPage,
}: {
  landingPage: LandingPage;
}) {
  function decideEmbed(landingPageSlug: string) {
    switch (landingPageSlug) {
      case "/sarah-grace-mortgages":
        return (
          <>
            <div className="_form_50"></div>
            <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=50" />
          </>
        );
      case "/income-protection":
        return (
          <>
            <div className="_form_34"></div>
            <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=34" />
          </>
        );
      case "/investing-strategy":
        return (
          <>
            <div className="_form_48"></div>
            <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=48" />
          </>
        );
      case "/reducing-tax-bill":
        return (
          <>
            <div className="_form_44"></div>
            <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=44" />
          </>
        );
      case "/david-hossein":
        return (
          <>
            <div className="_form_40"></div>
            <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=40" />
          </>
        );
      default:
        undefined;
    }
  }
  const embedForm = decideEmbed(landingPage.attributes.slug);

  return (
    <main
      className={`size-full bg-gradient-to-b from-blue-secondary to-blue-primary xl:h-screen`}
    >
      <section className="m-auto pt-[100px]">
        <div className="flex flex-col items-center justify-center space-y-5 p-5 xl:m-auto xl:max-w-[1140px] xl:flex-row">
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
              className="rounded-3xl md:h-[550px] md:w-[413px]
"
            />
          )}
          <div className="px-[20px] py-2 md:px-[40px] md:py-8 xl:px-[80px]">
            <div className="flex flex-col content-center items-center pb-5 text-center text-[25px] font-bold leading-[1.2em] text-white xl:text-[35px]">
              <BlocksRenderer content={landingPage.attributes.description} />
            </div>
            {embedForm}
          </div>
        </div>
      </section>
    </main>
  );
}
