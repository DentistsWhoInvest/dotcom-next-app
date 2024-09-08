import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/privacy-policy");

  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function PrivacyPolicy({ pageData }: { pageData: any }) {
  return (
    <main className={`flex flex-col`}>
      <div>
        {pageData.attributes.policy.map(
          (policy: { children: { text: any }[] }) => {
            return policy.children[0].text;
          }
        )}
      </div>
    </main>
  );
}
