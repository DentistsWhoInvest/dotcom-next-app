import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type PrivacyPolicyAttributes = {
  policy: any;
  attribution: any;
  last_updated: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/privacy-policy");

  return {
    props: {
      policyPage: pageData.data.attributes,
    },
  };
};

export default function PrivacyPolicy({
  policyPage,
}: {
  policyPage: PrivacyPolicyAttributes;
}) {
  const formattedDate = new Date(policyPage.last_updated).toLocaleDateString(
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
      <div className="privacy-policy my-8 space-y-8 px-6 pt-8 lg:m-6 lg:mx-auto max-w-[1140px]">
        <BlocksRenderer content={policyPage.policy} />
        <h4>Attribution</h4>
        <BlocksRenderer content={policyPage.attribution} />
        <span>
          This privacy policy was created on{" "}
          <span className="font-bold">{formattedDate}</span>.
        </span>
      </div>
    </main>
  );
}
