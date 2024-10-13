import Image from "next/image";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { HeroBanner } from "@/components/HeroBanner";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

//todo add rootnode as type

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
  alternativeText: string;
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

type ManifestoItem = {
  id: number;
  reason: string;
};

type AboutAttributes = {
  hero_title: string;
  hero_subtext: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  our_story_title: string;
  our_story_description: any;
  wrap_up_description: any;
  hero_cover: ImageData;
  manifesto: ManifestoItem[];
  our_story_cover: ImageData;
  wrap_up_image: ImageData;
};

type AboutData = {
  id: number;
  attributes: AboutAttributes;
};

type AboutResponse = {
  data: AboutData;
  meta: Record<string, unknown>;
};

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/about");

  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function About({ pageData }: { pageData: AboutData }) {
  return (
    <main className={`flex flex-col `}>
      <HeroBanner
        bannerText={pageData.attributes.hero_title}
        bannerImage={{
          url: pageData.attributes.hero_cover.data.attributes.url,
          alt: pageData.attributes.hero_cover.data.attributes.alternativeText,
        }}
        subText={pageData.attributes.hero_subtext}
      />

      <section id="manifesto">
        <div className="flex size-full flex-col items-center justify-center p-8 text-center md:p-[50px]">
          <div className="xl:max-w-[1140px]">
          <p className="text-[30px] font-bold text-blue-primary">Manifesto</p>
          <span className="m-4 h-0.5 w-full bg-blue-primary" />
          {pageData.attributes.manifesto.map((item, index) => {
            const formattedIndex = "0" + (index + 1).toString();
            return (
              <div
                key={item.id}
                className="pb-[50px] md:flex md:flex-row md:space-x-8 md:p-6 md:items-center w-full"
              >
                <p className="text-[48px] text-blue-secondary font-semibold">
                  {formattedIndex}
                </p>
                <p className="text-left text-[17px] leading-[21.6px] text-[#333f48] font-[500]">
                  {item.reason}
                </p>
              </div>
            );
          })}</div>
        </div>
      </section>

      <section id="our story">
        <div className="relative h-[488px] w-full overflow-hidden md:h-[368px] xl:h-[323.56px] ">
          <div className="absolute inset-0 ">
            <Image
              src={pageData.attributes.our_story_cover.data.attributes.url}
              alt={
                "pageData.attributes.our_story_cover.data.attributes.alternativeText"
              }
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-blue-primary opacity-80"></div>
          </div>
          <div className="relative z-10 flex size-full flex-col items-center justify-center  ">
            <div className="absolute px-[30px] text-white md:px-[60px] xl:max-w-[1140px] xl:px-[160px]">
              <div className="mb-4 text-center text-3xl  font-bold md:text-left md:text-[35px] xl:text-[45px]">
                {pageData.attributes.our_story_title}
              </div>
              <div className="space-y-8 text-left md:flex md:flex-row md:space-x-8 md:space-y-0 md:py-6">
                <BlocksRenderer
                  content={pageData.attributes.our_story_description}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <div className="flex size-full flex-col items-center justify-center space-y-2 p-8 text-left md:flex-row md:space-x-8 md:px-[50px] xl:px-[180px]">
          <Image
            className="m-4 rounded-3xl object-cover"
            width={311}
            height={436}
            src={pageData.attributes.wrap_up_image.data.attributes.url}
            alt={
              pageData.attributes.wrap_up_image.data.attributes.alternativeText
            }
          />

          <div className="space-y-8 xl:w-1/3">
            <BlocksRenderer content={pageData.attributes.wrap_up_description} />
          </div>
        </div>
      </div>
    </main>
  );
}
