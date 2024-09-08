import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/page-informed-investors-club");

  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function InformedInvestorsLandingPage({
  pageData,
}: {
  pageData: any;
}) {
  return (
    <main className={`flex flex-col`}>
      <div>
        {pageData.attributes.hero_title}
        {pageData.attributes.sales_title}
        {pageData.attributes.sales_subtext}
      </div>
    </main>
  );
}
