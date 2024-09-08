import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/home");
  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function Home({ pageData }: { pageData: any }) {
  return (
    <main>
      <div>
        <h2>{pageData.attributes.hero_text}</h2>

        <p>{pageData.attributes.hero_subtext}</p>
      </div>
    </main>
  );
}
