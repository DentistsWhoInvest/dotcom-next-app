import { fetchEndpointData } from "@/lib/fetchUtils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
type TextNode = {
  text: string;
  type: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type Paragraph = {
  type: "paragraph";
  children: TextNode[];
};

type ListItem = {
  type: "list-item";
  children: TextNode[];
};

type List = {
  type: "list";
  format: "unordered" | "ordered";
  children: ListItem[];
};

type SalesDescription = Paragraph | List;

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
    large: ImageFormat;
    small: ImageFormat;
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

type InformedInvestorsClubData = {
  hero_title: string;
  cta_text: string;
  cta_navigation_url: string;
  sales_title: string;
  sales_subtext: string;
  sales_description: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  hero_cover: ImageData;
  on_the_call_photo: ImageData;
};

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/page-informed-investors-club");

  return {
    props: {
      pageData: pageData.data.attributes,
    },
  };
};

export default function InformedInvestorsLandingPage({
  pageData,
}: {
  pageData: InformedInvestorsClubData;
}) {
  console.log("pageData", pageData);
  return (
    <main className={`flex flex-col`}>
      <section id="top banner">
        <div className="md:h-[449px] relative h-[490px] w-full overflow-hidden xl:h-[660.75px]">
          <div className="lg:hidden absolute inset-0">
            <Image
              src={pageData.hero_cover.data.attributes.url}
              alt={"mobile"}
              layout="fill"
              objectFit="cover"
              objectPosition="right 50%"
              priority
            />
            <div className="absolute inset-0 bg-blue-primary opacity-60"></div>
          </div>
          <div className="absolute inset-0 hidden xl:block">
            <Image
              src={pageData.hero_cover.data.attributes.url}
              alt={"desktop"}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              priority
            />
          </div>
          <div className="md:justify-center md:px-8 lg:px-16 relative z-10 mt-8 flex size-full flex-col items-center justify-center px-4 text-center text-white xl:mx-24 xl:max-w-[33%] xl:items-start xl:text-left">
            <h1 className="md:text-3xl lg:text-4xl mb-4 text-2xl font-bold">
              {pageData.hero_title}
            </h1>

            <Button className="mt-8 rounded-md bg-orange-400 text-white hover:text-blue-primary ">
              <Link href={pageData.cta_navigation_url}>
                {pageData.cta_text}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section id="content">
        <div id="laptop and title">
          <div className="flex flex-col items-center space-y-4">
            <div
              id="blue background"
              className="relative h-[135px] w-screen bg-blue-secondary"
            >
              <div className="absolute m-4 flex flex-col items-center">
                <Image
                  src={pageData.on_the_call_photo.data.attributes.url}
                  alt={"Laptop and title"}
                  width={320}
                  height={440}
                />
                <h2 className="p-4 text-center text-3xl font-bold text-blue-primary">
                  {pageData.sales_title}
                </h2>
                <p className="pb-4 text-center font-semibold text-orange-400">
                  {pageData.sales_subtext}
                </p>
                {
                  // the custom-bullet classname is what enables the custom tick bullet points
                }
                <div
                  id="maintext"
                  className="show-bullet custom-bullet space-y-4 text-lg text-grey-primary"
                >
                  <BlocksRenderer content={pageData.sales_description} />
                </div>
                <div className="flex flex-col items-center space-y-8 p-8">
                  <Button className="rounded-md bg-orange-400 text-white hover:bg-orange-500">
                    <Link href={pageData.cta_navigation_url}>
                      {pageData.cta_text}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
