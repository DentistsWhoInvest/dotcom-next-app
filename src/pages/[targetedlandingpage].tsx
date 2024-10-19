import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type TextNode = {
  text: string;
  type: string;
};

type Paragraph = {
  type: "paragraph";
  children: TextNode[];
};

type Description = Paragraph[];

type Contributor = {
  data: null | {
    id: number;
    attributes: {
      firstName: string;
      lastName: string;
      createdAt: string;
      updatedAt: string;
      title: string | null;
    };
  };
};

type LandingPageAttributes = {
  title: string;
  description: Description;
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
  console.log("results", results);
  return {
    paths: results.data.map((result: { id: number }) => ({
      params: { targetedlandingpage: result.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/targeted-data-collection-pages/5");

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
  console.log("landingPage", landingPage);

  return (
    <main
      className={`flex flex-col shadow-[rgba(0,0,15,0.5)_0px_0px_15px_0px] `}
    >
      <div
        id="banner"
        className="flex h-[200px] items-center justify-center bg-[#dbe2e9] text-center text-[45px] font-bold text-blue-primary "
      >
        marketing page
      </div>
      <div className="privacy-policy my-8 space-y-8 px-6 pt-8 lg:m-6 xl:mx-36">
        {/* <BlocksRenderer content={policyPage.policy} /> */}
        <span>test</span>
      </div>
    </main>
  );
}
