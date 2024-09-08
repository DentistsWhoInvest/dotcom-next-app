import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
        <Header />
        <div>
          <div>
            <h2>{pageData.attributes.hero_text}</h2>
            <div>
              <p>{pageData.attributes.hero_subtext}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
