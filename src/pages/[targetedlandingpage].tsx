/* eslint-disable tailwindcss/no-custom-classname */
import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { createSlug } from "./articles/[page]";
import Image from "next/image";
import Script from "next/script";
import Head from "next/head";

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
  form_id: number;
  page_metadata: {
    title: string;
    description: string;
    image: ImageData;
    url: string;
  };
};

type LandingPage = {
  id: number;
  attributes: LandingPageAttributes;
};

type LeadMagnetAttributes = {
  name: string;
  main_text: string;
  subtext: string;
  form_id: number;
  show_recaptcha: boolean;
  post_form_disclaimer: string;
  image: ImageData;
  background_colour: string;
  page_metadata: {
    title: string;
    description: string;
    image: ImageData;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
}

type LeadMagnetPage = {
  id: number;
  attributes: LeadMagnetAttributes;
}

//todo: add type for Lead Magnet

const fetchAllItems = async (endpoint: string) => {
  let allItems: any[] = [];
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchEndpointData(endpoint, undefined, true, {
      page,
      pageSize,
    });
    if (response.data) {
      allItems = allItems.concat(response.data);
      if (response.meta && response.meta.pagination) {
        hasMore = page < response.meta.pagination.pageCount;
        page++;
      } else {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }
  }
  return { data: allItems };
};

export const getStaticPaths = async () => {
  const targetedDataCollectionResults: any = await fetchAllItems(
    `/targeted-data-collection-pages`
  );
  const leadMagnetsResults: any = await fetchAllItems(
    `/lead-magnets`
  );

  return {
    paths: [
      ...(targetedDataCollectionResults.data.map(
        (result: { attributes: { slug: string }; id: number }) => ({
          params: {
            targetedlandingpage: createSlug(result.attributes.slug).replace(/^\//, ""),
            isLeadMagnet: false
          },
        })
      )),
      ...(leadMagnetsResults.data.map(
        (result: { attributes: { slug: string }; id: number }) => ({
          params: {
            targetedlandingpage: createSlug(result.attributes.slug).replace(/^\//, ""),
            isLeadMagnet: true
          },
        })
      ))
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({
  params
}: {
  params: { targetedlandingpage: string };
}) => {
  const slug = params.targetedlandingpage;

  // Helper to fetch by slug
  const fetchBySlug = async (endpoint: string, fields: string[]) => {
    const filterQuery = `filters[slug][$in][0]=${slug}&filters[slug][$in][1]=/${slug}`;
    const res = await fetchEndpointData(`${endpoint}?${filterQuery}`, fields);
    return res.data && res.data.length > 0 ? res.data[0] : null;
  };

  const landingPageFields = ["contributor", "contributor.profilePicture"];
  const matchingLandingPage = await fetchBySlug('/targeted-data-collection-pages', landingPageFields);

  if (matchingLandingPage) {
    return {
      props: {
        targettedLandingPage: matchingLandingPage,
        leadMagnet: null
      }
    };
  }

  const leadMagnetFields = ["image.data.thumbnail", "page_metadata.image.data.thumbnail"];
  const matchingLeadMagnet = await fetchBySlug('/lead-magnets', leadMagnetFields);

  if (matchingLeadMagnet) {
    return {
      props: {
        targettedLandingPage: null,
        leadMagnet: matchingLeadMagnet
      }
    };
  }

  return {
    notFound: true
  };
};

function embed(form_id: number) {
  return (
    <>
      <div className={"_form_" + form_id}></div>
      <Script src={"https://dentistswhoinvest.activehosted.com/f/embed.php?id=" + form_id} />
    </>
  );
}

export default function TargetedMarketingLandingPage({
  targettedLandingPage: targettedLandingPage,
  leadMagnet: leadMagnet
}: {
  targettedLandingPage: LandingPage;
  leadMagnet: LeadMagnetPage;
}) {
  if (targettedLandingPage) {
    const embedForm = embed(targettedLandingPage.attributes.form_id);

    return (
      <>
        <Head>
          <title>{targettedLandingPage.attributes.page_metadata?.title || targettedLandingPage.attributes.title}</title>
          <meta name="title" content={targettedLandingPage.attributes.page_metadata?.title || targettedLandingPage.attributes.title} />
          <meta name="description" content={targettedLandingPage.attributes.page_metadata?.description || targettedLandingPage.attributes.description} />
          <meta name="author" content="Dr. James Martin" />
          {/* todo: add proper author, not always James, default to James if empty. */}

          <meta property="og:type" content="website" />
          <meta property="og:title" content={targettedLandingPage.attributes.page_metadata?.title || targettedLandingPage.attributes.title} />
          <meta property="og:description" content={targettedLandingPage.attributes.page_metadata?.description || targettedLandingPage.attributes.title} />
          <meta property="og:url" content={targettedLandingPage.attributes.page_metadata?.url || `https://www.dentistswhoinvest.com/${createSlug(targettedLandingPage.attributes.slug)}`} />
          {/* todo: distinguish between beta and prod somehow? */}
          {/* <meta property="og:image" content={leadMagnet.attributes.page_metadata.image?.data.data.attributes .attributes.formats.large?.url || pageData.attributes.thumbnail?.data?.attributes.url || pageData.attributes.cover?.data?.attributes.formats.large?.url || pageData.attributes.cover?.data?.attributes.url} /> */}
          <meta property="og:site_name" content="Dentists Who Invest" />
        </Head>
        <main
          className={`size-full bg-gradient-to-b from-blue-secondary to-blue-primary xl:h-screen`}
        >
          <section className="m-auto pt-[100px]">
            <div className="flex flex-col items-center justify-center space-y-5 p-5 xl:m-auto xl:max-w-[1140px] xl:flex-row">
              {targettedLandingPage.attributes.contributor.data?.attributes
                .profilePicture && (
                  <Image
                    src={
                      targettedLandingPage.attributes.contributor.data.attributes
                        .profilePicture.data.attributes.url
                    }
                    alt={
                      targettedLandingPage.attributes.contributor.data.attributes
                        .profilePicture.data.attributes.name
                    }
                    height={335}
                    width={251}
                    layout="instrisic"
                    className="rounded-3xl md:h-[550px] md:w-[413px]"
                  />
                )}
              <div className="px-[20px] py-2 md:px-[40px] md:py-8 xl:px-[80px]">
                <div className="flex flex-col content-center items-center pb-5 text-center text-[25px] font-bold leading-[1.2em] text-white xl:text-[35px]">
                  <BlocksRenderer content={targettedLandingPage.attributes.description} />
                </div>
                {embedForm}
              </div>
            </div>
          </section>
        </main>
      </>
    );
  } else if (leadMagnet) {
    return (
      <>
        <Head>
          <title>{leadMagnet.attributes.page_metadata?.title || leadMagnet.attributes.name}</title>
          <meta name="title" content={leadMagnet.attributes.page_metadata?.title || leadMagnet.attributes.name} />
          <meta name="description" content={leadMagnet.attributes.page_metadata?.description || leadMagnet.attributes.main_text} />
          <meta name="author" content="Dr. James Martin" />
          {/* todo: add proper author, not always James, default to James if empty. */}

          <meta property="og:type" content="website" />
          <meta property="og:title" content={leadMagnet.attributes.page_metadata?.title || leadMagnet.attributes.name} />
          <meta property="og:description" content={leadMagnet.attributes.page_metadata?.description || leadMagnet.attributes.main_text} />
          <meta property="og:url" content={leadMagnet.attributes.page_metadata?.url || `https://www.dentistswhoinvest.com/${createSlug(leadMagnet.attributes.slug)}`} />
          {/* todo: distinguish between beta and prod somehow? */}
          {/* <meta property="og:image" content={leadMagnet.attributes.page_metadata.image?.data.data.attributes .attributes.formats.large?.url || pageData.attributes.thumbnail?.data?.attributes.url || pageData.attributes.cover?.data?.attributes.formats.large?.url || pageData.attributes.cover?.data?.attributes.url} /> */}
          <meta property="og:site_name" content="Dentists Who Invest" />
        </Head>
        <main
          className={`size-full bg-gradient-to-b from-blue-secondary to-blue-primary md:h-screen `}
        >
          <section className="flex size-full flex-col place-content-center content-center items-center justify-items-center p-[40px] text-center text-white md:p-[20px] xl:mx-auto xl:max-w-[1140px]">
            <div className="flex flex-col justify-center rounded-2xl bg-orange-400 text-white  md:h-[550px] md:flex-row xl:h-[700px] ">
              <Image
                src={leadMagnet.attributes.image?.data?.attributes.url}
                alt={leadMagnet.attributes.image?.data?.attributes.name}
                width={1024}
                height={1340}
                className="mt-4 h-[380px] w-[280px] self-center md:h-[338px] md:w-[258px] lg:h-[492px] lg:w-[376px] xl:h-[544px] xl:w-[416px]"
              />
              <section className="mt-[-20px] space-y-1 py-[40px] md:ml-8  md:w-1/2 md:px-[30px]">
                <div className="mb-[-30px] text-center text-xl font-bold lg:text-2xl xl:text-4xl">
                  {leadMagnet.attributes.main_text}
                </div>
                <div
                  // eslint-disable-next-line tailwindcss/no-custom-classname
                  className={"_form_" + leadMagnet.attributes.form_id}
                ></div>
                <Script src={"https://dentistswhoinvest.activehosted.com/f/embed.php?id=" + leadMagnet.attributes.form_id} />
                <p className="ml-5 text-center text-xs md:text-left lg:text-base">
                  {embed(leadMagnet.attributes.form_id)}
                </p>
              </section>
            </div>
          </section>
        </main>
      </>
    );
  }
}
