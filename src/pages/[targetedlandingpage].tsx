import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const getStaticPaths = async () => {
  const results: any = await fetchEndpointData(`/targeted-data-collection-page`);
  return {
    paths: results.data.map((result: { id: number }) => ({
      params: { targetedlandingpage: result.id.toString() },
    })),
    fallback: false,
  };
}

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/targeted-data-collection-page/5");

  return {
    props: {
      landingPage: pageData.data.attributes,
    },
  };
};

export default function TargetedMarketingLandingPage({
  landingPage,
}: {
  landingPage: any;
}) {
  const formattedDate = new Date(landingPage.last_updated).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return (
    <main
      className={`flex flex-col shadow-[rgba(0,0,15,0.5)_0px_0px_15px_0px] `}
    >
      <div
        id="banner"
        className="flex h-[200px] items-center justify-center bg-[#dbe2e9] text-center text-[45px] font-bold text-blue-primary "
      >
        Privacy Policy
      </div>
      <div className="privacy-policy my-8 space-y-8 px-6 pt-8 lg:m-6 xl:mx-36">
        {/* <BlocksRenderer content={policyPage.policy} /> */}
        <span>
          This privacy policy was created on{" "}
          <span className="font-bold">{formattedDate}</span>.
        </span>
      </div>
    </main>
  );
}
