import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/contact-page");
  console.log('here', pageData);
  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function Contact({ pageData }: { pageData: any }) {
  console.log('pageData', pageData);
  return (
    <main className={`flex flex-col`}>
      <Header />
      <div>contact info</div>
      <div>FAQ</div>
      <div>{pageData.attributes.hero_title}</div>
      <div>{pageData.attributes.hero_subtext}</div>
      <Footer />
    </main>
  );
}
