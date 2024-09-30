import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type TAndCAttributes = {
  terms: any;
  last_updated: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export const getStaticProps = async () => {
  const testResult = [
    {
      id: 1,
      attributes: {
        title: "Terms and conditions",
        description: "Lorem ipsum...",
      },
    },
  ];

  return {
    props: {
      result: testResult,
    },
  };
};

export default function TermsAndConditions({ result }: { result: any[] }) {
  return (
    <main
      className={`flex flex-col shadow-[rgba(0,0,15,0.5)_0px_0px_15px_0px] `}
    >
      <div
        id="banner"
        className="flex h-[200px] items-center justify-center bg-[#dbe2e9] text-center text-[45px] font-bold text-blue-primary "
      >
        Terms and Conditions
      </div>
      {/* <div className="t-and-c my-8 space-y-8 px-6 pt-8 lg:m-6 xl:mx-36">
        <BlocksRenderer content={policyPage.policy} />
        <h4>Attribution</h4>
        <BlocksRenderer content={policyPage.attribution} />
        <span>
          This privacy policy was created on{" "}
          <span className="font-bold">{formattedDate}</span>.
        </span>
      </div> */}
    </main>
  );
}
